// app/search/page.tsx

"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Copy, Loader2, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { apiClient, ChatMessage } from "@/lib/api";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [targetLanguage, setTargetLanguage] = useState("en"); // ADDED: State for language
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate a session ID when the component mounts
    setSessionId(uuidv4());
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const streamUrl = apiClient.getChatStreamUrl(
        sessionId,
        input,
        targetLanguage
      ); // ADDED: Pass language
      const eventSource = new EventSource(streamUrl);

      let assistantMessage: ChatMessage = {
        role: "assistant",
        content: "",
        sources: [],
      };
      setMessages((prev) => [...prev, assistantMessage]);

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "content") {
          setMessages((prev) =>
            prev.map((msg, index) =>
              index === prev.length - 1
                ? { ...msg, content: msg.content + data.content }
                : msg
            )
          );
        } else if (data.type === "final") {
          setMessages((prev) =>
            prev.map((msg, index) =>
              index === prev.length - 1
                ? { ...msg, sources: data.sources }
                : msg
            )
          );
          setIsLoading(false);
          eventSource.close();
        }
      };

      eventSource.onerror = (err) => {
        console.error("EventSource failed:", err);
        toast.error("An error occurred while fetching the response.");
        setIsLoading(false);
        eventSource.close();
      };
    } catch (error) {
      toast.error("Failed to send message.");
      setIsLoading(false);
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 ${
              message.role === "user" ? "justify-end" : ""
            }`}
          >
            {message.role === "assistant" && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
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
              <ReactMarkdown className="prose dark:prose-invert">
                {message.content}
              </ReactMarkdown>

              {message.sources && message.sources.length > 0 && (
                <div className="mt-4 border-t pt-2">
                  <h4 className="font-semibold text-sm mb-2">Sources:</h4>
                  <div className="space-y-1">
                    {message.sources.map((source, i) => (
                      <div
                        key={i}
                        className="text-xs p-2 bg-background/50 rounded-md"
                      >
                        <p className="font-bold">{source.file_name}</p>
                        <p className="italic text-muted-foreground truncate">
                          {source.context}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {message.role === "user" && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <User className="h-6 w-6" />
              </div>
            )}
            {message.role === "assistant" && message.content && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopy(message.content)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === "assistant" && (
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
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
            placeholder="Ask anything about your documents..."
            className="pr-24"
            disabled={isLoading}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {/* --- ADDED: Language Selector --- */}
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
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
            <Button onClick={handleSendMessage} disabled={isLoading}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
