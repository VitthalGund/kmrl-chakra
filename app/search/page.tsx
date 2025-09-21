"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  FileText,
  Filter,
  Download,
  Eye,
  Calendar,
  Tag,
  User,
  Building,
  Zap,
  Bot,
  Clock,
  Star,
  Train,
  Mic,
  Paperclip,
  Send,
} from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { toast } from "sonner";

export default function SearchPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // State for main search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  // State for AI chat
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>([
    {
      id: 1,
      type: "assistant",
      content:
        "Hello! I am your KMRL Chakra AI assistant. How can I help you find information today?",
      timestamp: new Date(),
    },
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleSearchSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchLoading(true);
    try {
      const { data } = await api.post("/query/search", { query: searchQuery });
      setSearchResults(data);
      toast.success(`Found ${data.length} relevant documents.`);
    } catch (error) {
      toast.error("An error occurred while searching.");
    } finally {
      setIsSearchLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;
    setIsChatLoading(true);

    const newUserMessage = {
      id: chatMessages.length + 1,
      type: "user",
      content: chatMessage,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, newUserMessage]);
    const currentQuery = chatMessage;
    setChatMessage("");

    try {
      const { data } = await api.post("/query/chat", {
        query: currentQuery,
      });

      const aiResponse = {
        id: chatMessages.length + 2,
        type: "assistant",
        content: data.answer,
        sources: data.sources,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      toast.error("Failed to get response from AI assistant.");
      const errorResponse = {
        id: chatMessages.length + 2,
        type: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsChatLoading(false);
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2">
                <Train className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg text-gray-200">
                  KMRL Chakra
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/documents"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                Documents
              </Link>
              <Link href="/search" className="text-primary font-medium">
                Search
              </Link>
              <Link
                href="/settings"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                Settings
              </Link>
            </nav>
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-200">
            Intelligent Document Search
          </h1>
          <p className="text-gray-400">
            Use natural language queries to find exactly what you need.
          </p>
        </div>

        <Tabs defaultValue="ai-chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="results">Search Results</TabsTrigger>
            <TabsTrigger value="ai-chat">AI Assistant</TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Search Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search for documents by keyword or topic..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-3 text-base rounded-lg"
                  />
                  <Button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    disabled={isSearchLoading}
                  >
                    {isSearchLoading ? "Searching..." : "Search"}
                  </Button>
                </form>
              </CardContent>
            </Card>
            <div className="space-y-4">
              {isSearchLoading ? (
                <p>Loading search results...</p>
              ) : (
                searchResults.map((result) => (
                  <Card key={result.id}>
                    <CardHeader>
                      <CardTitle>{result.file_name}</CardTitle>
                      <CardDescription>
                        {result.department} - {result.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        {result.tags.map((tag: string) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="ai-chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-primary" />
                  AI Assistant Chat
                </CardTitle>
                <CardDescription>
                  Ask questions about documents and get intelligent responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4 h-96 overflow-y-auto border rounded-lg p-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        {message.sources && message.sources.length > 0 && (
                          <div className="mt-2 border-t border-muted-foreground/50 pt-2">
                            <h4 className="text-xs font-bold mb-1">Sources:</h4>
                            {message.sources.map((source: any) => (
                              <div
                                key={source.id}
                                className="text-xs opacity-80 flex items-center"
                              >
                                <FileText className="inline h-3 w-3 mr-1 flex-shrink-0" />
                                <span>{source.file_name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="text-sm text-muted-foreground">
                      Assistant is thinking...
                    </div>
                  )}
                </div>
                <div className="relative">
                  <div className="flex items-center space-x-2 p-2 border rounded-lg">
                    <Input
                      placeholder="Ask a follow-up question..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!chatMessage.trim() || isChatLoading}
                      size="sm"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
