"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Mic, Share2, Plus, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  role: "user" | "assistant"
  content: string
  sources?: Array<{ title: string; url: string }>
}

interface ChatSession {
  id: string
  title: string
  lastMessage: string
}

export default function ChatPage() {
  const { toast } = useToast()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [targetLanguage, setTargetLanguage] = useState("en")
  const [sessionId, setSessionId] = useState(() => `session-${Date.now()}`)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    const assistantMessage: Message = { role: "assistant", content: "", sources: [] }
    setMessages((prev) => [...prev, assistantMessage])

    try {
      abortControllerRef.current = new AbortController()
      const token = localStorage.getItem("access_token")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/query/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: input,
          session_id: sessionId,
          target_language: targetLanguage,
        }),
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error("No reader available")
      }

      let accumulatedContent = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6)
            if (data === "[DONE]") continue

            try {
              const parsed = JSON.parse(data)
              if (parsed.content) {
                accumulatedContent += parsed.content
                setMessages((prev) => {
                  const newMessages = [...prev]
                  const lastMessage = newMessages[newMessages.length - 1]
                  if (lastMessage.role === "assistant") {
                    lastMessage.content = accumulatedContent
                    if (parsed.sources) {
                      lastMessage.sources = parsed.sources
                    }
                  }
                  return newMessages
                })
              }
            } catch (e) {
              console.error("[v0] Failed to parse SSE data:", e)
            }
          }
        }
      }

      // Update chat history
      const newSession: ChatSession = {
        id: sessionId,
        title: input.slice(0, 50) + (input.length > 50 ? "..." : ""),
        lastMessage: accumulatedContent.slice(0, 100),
      }
      setChatSessions((prev) => {
        const filtered = prev.filter((s) => s.id !== sessionId)
        return [newSession, ...filtered]
      })
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("[v0] Request aborted")
      } else {
        toast({
          title: "Error",
          description: "Failed to get response from AI",
          variant: "destructive",
        })
        setMessages((prev) => prev.slice(0, -1))
      }
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }

  const handleNewChat = () => {
    setMessages([])
    setSessionId(`session-${Date.now()}`)
  }

  const handleShareChat = async () => {
    try {
      const token = localStorage.getItem("access_token")
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/chat/${sessionId}/share`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!response.ok) throw new Error("Failed to share chat")

      const data = await response.json()
      navigator.clipboard.writeText(data.shareable_link)

      toast({
        title: "Chat shared",
        description: "Link copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share chat",
        variant: "destructive",
      })
    }
  }

  const loadChatSession = (session: ChatSession) => {
    setSessionId(session.id)
    setShowHistory(false)
  }

  return (
    <div className="flex h-full">
      {/* Chat History Sidebar */}
      <div
        className={`${
          showHistory ? "w-64" : "w-0"
        } overflow-hidden border-r border-border bg-card transition-all duration-300`}
      >
        <div className="p-4">
          <h2 className="mb-4 text-lg font-semibold">Chat History</h2>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-2">
              {chatSessions.map((session) => (
                <Button
                  key={session.id}
                  variant="ghost"
                  className="w-full justify-start text-left"
                  onClick={() => loadChatSession(session)}
                >
                  <div className="truncate">
                    <p className="truncate text-sm font-medium">{session.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{session.lastMessage}</p>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={() => setShowHistory(!showHistory)}>
              <MessageSquare className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">AI Chat Assistant</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ml">Malayalam</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={handleNewChat}>
              <Plus className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleShareChat} disabled={messages.length === 0}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="mx-auto max-w-3xl space-y-6">
            {messages.length === 0 && (
              <div className="flex h-[60vh] flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-metro">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <h2 className="mb-2 text-2xl font-bold">Welcome to KMRL Chakra</h2>
                <p className="text-muted-foreground">Ask me anything about KMRL operations, policies, or procedures</p>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <Card className={`max-w-[80%] ${message.role === "user" ? "bg-gradient-metro text-white" : "bg-card"}`}>
                  <CardContent className="p-4">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-4 border-t border-border pt-3">
                        <p className="mb-2 text-xs font-semibold text-muted-foreground">Sources:</p>
                        <div className="space-y-1">
                          {message.sources.map((source, idx) => (
                            <a
                              key={idx}
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-xs text-primary hover:underline"
                            >
                              {source.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <Card className="max-w-[80%]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t border-border bg-card p-4">
          <form onSubmit={handleSendMessage} className="mx-auto max-w-3xl">
            <div className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="button" variant="outline" size="icon" disabled>
                <Mic className="h-5 w-5" />
              </Button>
              <Button type="submit" size="icon" className="bg-gradient-metro hover:opacity-90" disabled={isLoading}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
