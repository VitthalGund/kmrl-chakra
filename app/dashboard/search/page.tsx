"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import {
  Send,
  Bot,
  User,
  Copy,
  Loader2,
  Languages,
  Plus,
  Share2,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { apiClient, ChatMessage, Source } from "@/lib/api";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/auth-context";
import { DocPreview } from "@/components/doc-preview";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
}

// Renamed component
export default function KnowledgeDiscoveryPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("en");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [previewSource, setPreviewSource] = useState<Source | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  useEffect(() => {
    handleNewChat();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [activeConversation?.messages]);

  const handleNewChat = () => {
    const newSessionId = uuidv4();
    const newConversation: Conversation = {
      id: newSessionId,
      title: "New Chat",
      messages: [],
    };
    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newSessionId);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading || !activeConversationId) return;

    const userMessage: ChatMessage = { role: "user", content: input };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? { ...conv, messages: [...conv.messages, userMessage] }
          : conv
      )
    );

    setInput("");
    setIsLoading(true);

    try {
      // The backend now expects a stream, so we use EventSource
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/query/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            query: input,
            session_id: activeConversationId,
            target_language: targetLanguage,
          }),
        }
      );

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage: ChatMessage = {
        role: "assistant",
        content: "",
        sources: [],
      };
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? { ...conv, messages: [...conv.messages, assistantMessage] }
            : conv
        )
      );

      let fullResponse = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = JSON.parse(line.substring(6));
            if (data.type === "content") {
              fullResponse += data.content;
              setConversations((prev) =>
                prev.map((conv) => {
                  if (conv.id === activeConversationId) {
                    const updatedMessages = [...conv.messages];
                    updatedMessages[updatedMessages.length - 1].content =
                      fullResponse;
                    return { ...conv, messages: updatedMessages };
                  }
                  return conv;
                })
              );
            } else if (data.type === "final") {
              const newTitle = data.title || "Chat";
              setConversations((prev) =>
                prev.map((conv) => {
                  if (conv.id === activeConversationId) {
                    const updatedMessages = [...conv.messages];
                    updatedMessages[updatedMessages.length - 1].sources =
                      data.sources;
                    return {
                      ...conv,
                      title: newTitle,
                      messages: updatedMessages,
                    };
                  }
                  return conv;
                })
              );
            }
          }
        }
      }
    } catch (error) {
      toast.error("Failed to send message.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (!activeConversationId) return;
    const toastId = toast.loading("Generating shareable link...");
    try {
      const response = await apiClient.shareChat(activeConversationId);
      const shareUrl = `${window.location.origin}/dashboard/chat/view/${response.share_id}`;
      navigator.clipboard.writeText(shareUrl);
      toast.success("Shareable link copied to clipboard!", { id: toastId });
    } catch (error) {
      toast.error("Failed to create shareable link.", { id: toastId });
    }
  };

  const openPreview = (source: Source) => {
    setPreviewSource(source);
    setIsPreviewOpen(true);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <aside className="w-72 border-r bg-background flex flex-col p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">History</h2>
          <Button variant="ghost" size="icon" onClick={handleNewChat}>
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-grow overflow-y-auto space-y-2">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConversationId(conv.id)}
              className={`w-full text-left p-2 rounded-md truncate text-sm ${
                conv.id === activeConversationId
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {conv.title}
            </button>
          ))}
        </div>
      </aside>

      <main className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeConversation?.messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <Bot className="h-16 w-16 mb-4" />
              <h1 className="text-2xl font-bold">KMRL Knowledge Discovery</h1>
              <p>Ask anything about your internal documents to get started.</p>
            </div>
          )}
          {activeConversation?.messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 ${
                message.role === "user" ? "justify-end" : ""
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                  <Bot className="h-6 w-6" />
                </div>
              )}
              <div
                className={`max-w-[75%] space-y-2 rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  //   className="prose dark:prose-invert max-w-none"
                >
                  {message.content}
                </ReactMarkdown>
                {message.sources && message.sources.length > 0 && (
                  <div className="mt-4 border-t pt-2">
                    <h4 className="font-semibold text-sm mb-2">Sources:</h4>
                    <div className="space-y-2">
                      {message.sources.map((source: Source, i: number) => (
                        <div
                          key={i}
                          className="text-xs p-2 bg-background/50 rounded-md flex items-center justify-between gap-2"
                        >
                          <div className="flex-grow overflow-hidden">
                            <p className="font-bold truncate">
                              {source.file_name}
                            </p>
                            <p className="italic text-muted-foreground truncate">
                              {source.context}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openPreview(source)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {message.role === "user" && (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground flex-shrink-0">
                  <User className="h-6 w-6" />
                </div>
              )}
              {message.role === "assistant" &&
                message.content &&
                !isLoading && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          navigator.clipboard.writeText(message.content);
                          toast.success("Copied to clipboard!");
                        }}
                      >
                        Copy Text
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleShare}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Conversation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                <Bot className="h-6 w-6" />
              </div>
              <div className="max-w-[75%] space-y-2 rounded-lg p-4 bg-muted">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t bg-background p-4">
          <div className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask anything..."
              className="pr-40"
              disabled={isLoading}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Select
                value={targetLanguage}
                onValueChange={setTargetLanguage}
                disabled={isLoading}
              >
                <SelectTrigger className="w-[120px]">
                  <Languages className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ml">Malayalam</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <DocPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        source={previewSource}
      />
    </div>
  );
}
