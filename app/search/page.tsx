"use client";

import type React from "react";

import { useState, useRef } from "react";
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
import { toast } from "@/hooks/use-toast";
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

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [chatMessages, setChatMessages] = useState([
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

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newMessage = {
      id: chatMessages.length + 1,
      type: "user",
      content: chatMessage,
      timestamp: new Date(),
    };

    setChatMessages([...chatMessages, newMessage]);
    setChatMessage("");
    setIsTyping(true);

    // Simulate AI response with typing indicator
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = {
        id: chatMessages.length + 2,
        type: "assistant",
        content:
          "I understand you're looking for information. Let me search through our document database to find the most relevant results for your query. Based on your request, I found several documents that might be helpful.",
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiResponse]);
    }, 2000);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Voice Recording",
        description: "Recording started. Speak your query...",
      });
    } else {
      toast({
        title: "Voice Recording",
        description: "Recording stopped and processed.",
      });
    }
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File Attached",
        description: `${file.name} has been attached to your message.`,
      });
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied",
      description: "Message copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
              {/* Main Search */}
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

              {/* Filters */}
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
          {/* Search Results */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="results" className="w-full">
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
                    className="hover:shadow-lg transition-all duration-300 bg-card border-border hover:border-primary/50"
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
                                className="text-xs bg-gray-700 text-gray-300"
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
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
                            >
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
                {/* ChatGPT-style AI Chat Interface */}
                <div className="flex flex-col h-[600px] bg-card border border-border rounded-lg">
                  {/* Chat Header */}
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
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-gray-200"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Chat Messages */}
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
                          {message.type === "assistant" && (
                            <div className="flex items-center mb-2">
                              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-2">
                                <Bot className="h-3 w-3 text-primary-foreground" />
                              </div>
                              <span className="text-xs text-gray-400">
                                KMRL Chakra AI
                              </span>
                            </div>
                          )}
                          <div
                            className={`${
                              message.type === "user"
                                ? "bg-primary text-primary-foreground ml-auto"
                                : "bg-gray-800 text-gray-200"
                            } p-3 rounded-2xl ${
                              message.type === "user"
                                ? "rounded-br-md"
                                : "rounded-bl-md"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">
                              {message.content}
                            </p>
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
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-gray-400 hover:text-gray-200"
                                >
                                  <Volume2 className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-gray-400 hover:text-green-400"
                                >
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-gray-400 hover:text-red-400"
                                >
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
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

                  {/* ChatGPT-style Input */}
                  <div className="p-4 border-t border-border">
                    <div className="relative">
                      <div className="flex items-end space-x-2 p-3 border border-border rounded-2xl bg-gray-800 focus-within:border-primary transition-colors">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                          accept="image/*,.pdf,.doc,.docx,.txt"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-gray-200 p-2"
                          onClick={handleFileAttach}
                        >
                          <Paperclip className="h-4 w-4" />
                        </Button>
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
                          variant="ghost"
                          size="sm"
                          className={`text-gray-400 hover:text-gray-200 p-2 ${
                            isRecording ? "text-red-400" : ""
                          }`}
                          onClick={handleVoiceRecord}
                        >
                          {isRecording ? (
                            <StopCircle className="h-4 w-4" />
                          ) : (
                            <Mic className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!chatMessage.trim()}
                          size="sm"
                          className="bg-primary hover:bg-primary/90 disabled:opacity-50 p-2"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      AI can make mistakes. Check important info.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Searches */}
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

            {/* Popular Tags */}
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

            {/* Search Tips */}
            <Card className="bg-card border-border">
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
                      Chat with our AI for personalized help and file
                      attachments
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-200">Voice Search</p>
                    <p className="text-gray-400">
                      Use voice commands for hands-free searching
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
