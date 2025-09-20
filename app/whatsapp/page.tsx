"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, Phone, Send, Bot, User, ArrowLeft, CheckCircle2, Clock, Zap, Languages } from "lucide-react"
import NextLink from "next/link"

export default function WhatsAppPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm KMRL Chakra Bot. How can I help you today?",
      contentMalayalam: "ഹലോ! ഞാൻ KMRL ചക്ര ബോട്ട് ആണ്. ഇന്ന് ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കാം?",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      type: "user",
      content: "Show me the latest safety protocols",
      timestamp: "10:31 AM",
    },
    {
      id: 3,
      type: "bot",
      content: "I found 3 recent safety protocol documents. Here are the summaries:",
      contentMalayalam: "ഞാൻ 3 സമീപകാല സുരക്ഷാ പ്രോട്ടോക്കോൾ ഡോക്യുമെന്റുകൾ കണ്ടെത്തി. ഇവിടെ സംഗ്രഹങ്ങൾ ഉണ്ട്:",
      timestamp: "10:31 AM",
    },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "user" as const,
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          type: "bot" as const,
          content: "I'm processing your request. Please wait...",
          contentMalayalam: "ഞാൻ നിങ്ങളുടെ അഭ്യർത്ഥന പ്രോസസ്സ് ചെയ്യുന്നു. ദയവായി കാത്തിരിക്കുക...",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, botResponse])
      }, 1000)
    }
  }

  const quickActions = [
    { text: "Latest Documents", malayalam: "ഏറ്റവും പുതിയ ഡോക്യുമെന്റുകൾ" },
    { text: "Safety Protocols", malayalam: "സുരക്ഷാ പ്രോട്ടോക്കോളുകൾ" },
    { text: "Maintenance Schedule", malayalam: "അറ്റകുറ്റപ്പണി ഷെഡ്യൂൾ" },
    { text: "Training Materials", malayalam: "പരിശീലന സാമഗ്രികൾ" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <NextLink href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </NextLink>
              </Button>
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-6 w-6 text-primary kerala-wave" />
                <div>
                  <h1 className="text-xl font-bold">WhatsApp Integration</h1>
                  <p className="text-sm text-muted-foreground">വാട്സ്ആപ്പ് സംയോജനം</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="notification-bounce">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Connected
              </Badge>
              <Badge variant="outline">
                <Phone className="mr-1 h-3 w-3" />
                +91 9876543210
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="gradient-kerala text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bot className="h-8 w-8 ai-thinking" />
                    <div>
                      <CardTitle className="text-white">KMRL Chakra Bot</CardTitle>
                      <CardDescription className="text-green-100">AI Assistant for Document Management</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    <Languages className="mr-1 h-3 w-3" />
                    ML/EN
                  </Badge>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {msg.type === "bot" && <Bot className="h-4 w-4 mt-1 text-primary" />}
                        {msg.type === "user" && <User className="h-4 w-4 mt-1" />}
                        <div className="flex-1">
                          <p className="text-sm">{msg.content}</p>
                          {msg.contentMalayalam && (
                            <p className="text-xs mt-1 opacity-80 italic">{msg.contentMalayalam}</p>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs opacity-60">{msg.timestamp}</span>
                            {msg.type === "user" && <CheckCircle2 className="h-3 w-3 opacity-60" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message... / നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} className="gradient-kerala text-white">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setMessage(action.text)}
                      className="text-xs"
                    >
                      {action.text}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Bot Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Document search
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Quick summaries
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Malayalam support
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Voice messages
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  File sharing
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
                <CardDescription>Today's Activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Messages Sent</span>
                  <Badge variant="secondary">127</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Documents Retrieved</span>
                  <Badge variant="secondary">45</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Users</span>
                  <Badge variant="secondary">23</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Response Time</span>
                  <Badge variant="outline">
                    <Clock className="mr-1 h-3 w-3" />
                    1.2s
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Commands</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-xs">/search [query]</code>
                  <p className="text-muted-foreground mt-1">Search documents</p>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-xs">/summary [doc]</code>
                  <p className="text-muted-foreground mt-1">Get document summary</p>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-xs">/help</code>
                  <p className="text-muted-foreground mt-1">Show all commands</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
