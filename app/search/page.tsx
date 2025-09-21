"use client";

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

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content:
        "Hello! I'm your KMRL Chakra AI assistant. How can I help you find documents today?",
      timestamp: new Date(),
      sources: [],
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

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
    // Scroll to the bottom of the chat on new messages
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = async () => {
    const trimmedMessage = chatMessage.trim();
    if (!trimmedMessage || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: trimmedMessage,
      timestamp: new Date(),
    };

    // Add a temporary "Thinking..." message
    const loadingMessage = {
      id: Date.now() + 1,
      type: "assistant",
      content: "Thinking...",
      timestamp: new Date(),
      sources: [],
    };

    setChatMessages((prev) => [...prev, userMessage, loadingMessage]);
    setChatMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/v1/query/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Authentication is disabled as per the request.
        },
        body: JSON.stringify({
          query: trimmedMessage,
          session_id: "user-session-123", // Static session_id as placeholder
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      const aiResponse = {
        id: Date.now() + 2,
        type: "assistant",
        content: data.answer,
        sources: [],
        timestamp: new Date(),
      };

      // Replace the loading message with the actual response from the API
      setChatMessages((prev) => [...prev.slice(0, -1), aiResponse]);
    } catch (error) {
      console.error("Failed to fetch chat response:", error);
      const errorMessage = {
        id: Date.now() + 2,
        type: "assistant",
        content:
          "Sorry, I encountered an error. Please check the console or try again.",
        sources: [],
        timestamp: new Date(),
      };
      // Replace the loading message with an error message
      setChatMessages((prev) => [...prev.slice(0, -1), errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2">
                <Train className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">KMRL Chakra</span>
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
              <Link href="/documents">Documents</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-200">
            Intelligent Document Search
          </h1>
          <p className="text-gray-400">
            Use natural language queries to find exactly what you need from our
            document database.
          </p>
        </div>

        {/* Advanced Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-200">
              <Zap className="h-5 w-5 mr-2 text-primary" />
              AI-Powered Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Main Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Ask anything... What safety protocols should I follow?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-base rounded-lg bg-gray-800 border-gray-700 text-gray-200"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Bot className="h-4 w-4 mr-2" />
                  AI Search
                </Button>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                    <SelectValue placeholder="Department" />
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
                  className="w-full bg-transparent border-gray-700 text-gray-300"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Search Results */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="ai-chat" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="results">Search Results</TabsTrigger>
                <TabsTrigger value="ai-chat">AI Assistant</TabsTrigger>
              </TabsList>

              <TabsContent value="results" className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-gray-400">
                    Found {searchResults.length} results in 0.23 seconds
                  </p>
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">
                        Sort by Relevance
                      </SelectItem>
                      <SelectItem value="date">Sort by Date</SelectItem>
                      <SelectItem value="department">
                        Sort by Department
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {searchResults.map((result) => (
                  <Card
                    key={result.id}
                    className="hover:shadow-lg transition-all duration-300 bg-gray-800 border-gray-700"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1 hover:text-primary cursor-pointer text-gray-200">
                            {result.title}
                          </h3>
                          <p className="text-gray-400 mb-4">{result.content}</p>

                          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                            <div className="flex items-center">
                              <Building className="h-4 w-4 mr-1" />
                              {result.department}
                            </div>
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-1" />
                              {result.type}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {result.date}
                            </div>
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {result.author}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 mb-3">
                            {result.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col items-end space-y-2 ml-4">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium text-gray-300">
                              {result.relevance}%
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="ai-chat" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-200">
                      <Bot className="h-5 w-5 mr-2 text-primary" />
                      AI Assistant Chat
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Ask questions about documents and get intelligent
                      responses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Chat Messages */}
                    <div
                      ref={chatContainerRef}
                      className="space-y-4 mb-4 h-96 overflow-y-auto border rounded-lg p-4 bg-gray-900 border-gray-600"
                    >
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
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.type === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-gray-700 text-gray-200"
                            }`}
                          >
                            {message.type === "assistant" && (
                              <div className="flex items-center mb-2">
                                <Bot className="h-4 w-4 mr-2 text-primary" />
                                <span className="text-xs text-gray-400">
                                  AI Assistant
                                </span>
                              </div>
                            )}
                            <p className="text-sm whitespace-pre-wrap">
                              {message.content}
                            </p>

                            {/* Display sources if they exist and the message is not a loading message */}
                            {message.sources && message.sources.length > 0 && (
                              <div className="mt-3 pt-2 border-t border-gray-600/50">
                                <h4 className="text-xs font-bold mb-1 opacity-90">
                                  Sources:
                                </h4>
                                <div className="space-y-1">
                                  {message.sources.map((source) => (
                                    <div
                                      key={source.id}
                                      className="flex items-center text-xs opacity-80 hover:opacity-100 transition-opacity"
                                    >
                                      <FileText className="h-3 w-3 mr-1.5 flex-shrink-0" />
                                      <span className="truncate">
                                        {source.file_name ||
                                          "Reference document"}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <p className="text-right text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* ChatGPT-style Input */}
                    <div className="relative">
                      <div className="flex items-center space-x-2 rounded-lg border border-gray-600 bg-gray-900 p-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-gray-200"
                        >
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Input
                          placeholder="Ask anything..."
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleSendMessage()
                          }
                          disabled={isLoading}
                          className="flex-1 border-0 bg-transparent text-gray-200 placeholder-gray-500 focus:ring-0 focus:outline-none"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-gray-200"
                        >
                          <Mic className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!chatMessage.trim() || isLoading}
                          size="sm"
                          className="bg-primary hover:bg-primary/90"
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

          {/* Sidebar */}
          <div className="space-y-6 h-[39rem] overflow-y-auto">
            {/* Recent Searches */}
            <Card className="bg-gray-800 border-gray-700 mr-1">
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
                      className="w-full justify-start h-auto p-2 text-left text-gray-300 hover:text-gray-100"
                      onClick={() => setSearchQuery(search)}
                    >
                      <Search className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{search}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card className="bg-gray-800 border-gray-700 mr-1">
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
                      className="cursor-pointer border-gray-600 text-gray-300 transition-colors hover:bg-primary hover:text-primary-foreground"
                      onClick={() => setSearchQuery(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Search Tips */}
            <Card className="bg-gray-800 border-gray-700 mr-1">
              <CardHeader>
                <CardTitle className="text-gray-200">Search Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-200">
                      Natural Language
                    </p>
                    <p className="text-gray-400">
                      Ask questions like "What are the safety procedures?"
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-200">Use Filters</p>
                    <p className="text-gray-400">
                      Narrow down results by department and document type
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-200">AI Assistant</p>
                    <p className="text-gray-400">
                      Chat with our AI for personalized help
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
