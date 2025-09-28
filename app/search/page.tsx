"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
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
  StopCircle,
  Volume2,
  Copy,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

export default function SearchPage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([
    {
      id: 1,
      type: "assistant",
      content:
        "Hello! I'm your KMRL Chakra AI assistant. How can I help you find documents today?",
      timestamp: new Date(),
    },
  ]);

  const searchResults = [
    {
      id: 1,
      title: "Metro Safety Protocol 2025",
      content:
        "Comprehensive safety guidelines for metro operations including emergency procedures...",
      department: "Operations",
      type: "Policy",
      date: "2025-01-15",
      author: "Safety Team",
      relevance: 95,
      tags: ["safety", "protocol", "emergency"],
    },
    {
      id: 2,
      title: "Train Maintenance Checklist",
      content:
        "Daily, weekly, and monthly maintenance procedures for metro trains...",
      department: "Maintenance",
      type: "Manual",
      date: "2025-01-14",
      author: "Maintenance Team",
      relevance: 88,
      tags: ["maintenance", "checklist", "trains"],
    },
    {
      id: 3,
      title: "Employee Training Program",
      content:
        "Comprehensive training modules for new and existing employees...",
      department: "HR",
      type: "Training",
      date: "2025-01-13",
      author: "HR Team",
      relevance: 82,
      tags: ["training", "employees", "development"],
    },
  ];

  const recentSearches = [
    "safety protocols",
    "maintenance schedule",
    "emergency procedures",
    "train timetable",
    "staff guidelines",
  ];

  const popularTags = [
    "safety",
    "maintenance",
    "operations",
    "training",
    "emergency",
    "protocols",
    "procedures",
    "guidelines",
  ];

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;

    const newUserMessage = {
      id: chatMessages.length + 1,
      type: "user",
      content: chatMessage,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, newUserMessage]);
    const currentQuery = chatMessage;
    setChatMessage("");
    setIsChatLoading(true);

    try {
      const { data } = await api.post("/query/chat", { query: currentQuery });
      const aiResponse = {
        id: chatMessages.length + 2,
        type: "assistant",
        content: data.answer,
        sources: [],
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      toast.error("AI Assistant Error", {
        description: "Failed to get a response. Please try again.",
      });
      const errorResponse = {
        id: chatMessages.length + 2,
        type: "assistant",
        content:
          "I'm sorry, but I encountered an error and couldn't process your request.",
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // Placeholder for voice recording logic
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast.info(`File "${file.name}" attached.`);
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Message copied to clipboard.");
  };

  if (isAuthLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="flex items-center space-x-2">
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
            Use natural language queries to find exactly what you need from our
            document database.
          </p>
        </div>

        <Card className="mb-8 bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-200">
              <Zap className="h-5 w-5 mr-2 text-primary" />
              AI-Powered Search
            </CardTitle>
            <CardDescription className="text-gray-400">
              Advanced AI search with natural language processing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Ask anything... What safety protocols should I follow?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-32 py-4 text-base rounded-lg bg-gray-800 border-gray-700 text-gray-200 focus:border-primary"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90">
                  <Bot className="h-4 w-4 mr-2" />
                  AI Search
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                    <SelectValue placeholder="Document Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="policy">Policy</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="report">Report</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="procedure">Procedure</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Tabs defaultValue="ai-chat" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-card border border-border">
                <TabsTrigger
                  value="results"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Search Results
                </TabsTrigger>
                <TabsTrigger
                  value="ai-chat"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  AI Assistant
                </TabsTrigger>
              </TabsList>
              <TabsContent value="results" className="space-y-6 mt-6">
                <p className="text-gray-400">
                  Search functionality for this tab is under construction.
                </p>
              </TabsContent>
              <TabsContent value="ai-chat" className="space-y-6 mt-6">
                <div className="flex flex-col h-[600px] bg-card border border-border rounded-lg">
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-200">
                          KMRL Chakra AI
                        </h3>
                        <p className="text-xs text-gray-400">Always online</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                          className={`max-w-[80%] ${
                            message.type === "user" ? "order-2" : "order-1"
                          }`}
                        >
                          <div
                            className={`p-3 rounded-2xl ${
                              message.type === "user"
                                ? "bg-primary text-primary-foreground ml-auto rounded-br-md"
                                : "bg-gray-800 text-gray-200 rounded-bl-md"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">
                              {message.content}
                            </p>
                            {message.sources && message.sources.length > 0 && (
                              <div className="mt-2 border-t border-gray-600 pt-2">
                                <h4 className="text-xs font-bold mb-1">
                                  Sources:
                                </h4>
                                {message.sources.map((source: any) => (
                                  <a
                                    href={source.storage_url || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={source.id}
                                    className="text-xs opacity-80 flex items-center hover:underline"
                                  >
                                    <FileText className="inline h-3 w-3 mr-1 flex-shrink-0" />
                                    <span>{source.file_name}</span>
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-gray-500">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                            {message.type === "assistant" && (
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-gray-400 hover:text-gray-200"
                                  onClick={() => copyMessage(message.content)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isChatLoading && (
                      <div className="flex justify-start">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-2">
                            <Bot className="h-3 w-3 text-primary-foreground" />
                          </div>
                          <div className="bg-gray-800 p-3 rounded-2xl rounded-bl-md">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-4 border-t border-border">
                    <div className="relative">
                      <div className="flex items-end space-x-2 p-3 border border-border rounded-2xl bg-gray-800 focus-within:border-primary transition-colors">
                        <textarea
                          placeholder="Message KMRL Chakra AI..."
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          className="flex-1 bg-transparent text-gray-200 placeholder-gray-400 border-0 resize-none focus:ring-0 focus:outline-none min-h-[20px] max-h-32"
                          rows={1}
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={!chatMessage.trim() || isChatLoading}
                          size="sm"
                          className="bg-primary hover:bg-primary/90 disabled:opacity-50 p-2"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-200">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Searches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto p-2 text-gray-300 hover:text-gray-100 hover:bg-gray-800"
                      onClick={() => setSearchQuery(search)}
                    >
                      <Search className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{search}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-200">
                  <Tag className="h-5 w-5 mr-2" />
                  Popular Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors border-gray-600 text-gray-300"
                      onClick={() => setSearchQuery(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
