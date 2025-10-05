"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Copy,
  Loader2,
  Plus,
  Share2,
  Eye,
  MessageSquare,
  Trash2,
  Edit,
  Check,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { apiClient, ChatMessage, Source } from "@/lib/api";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/lib/auth-context";
import { DocPreview } from "@/components/doc-preview";
import { Card, CardContent } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useGoogleTranslate } from "@/hooks/use-google-translate"; // Import the translation hook
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Conversation {
  id: string;
  title: string;
}

export default function KnowledgeDiscoveryPage() {
  useGoogleTranslate(); // Initialize the translation hook

  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [activeMessages, setActiveMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(false);

  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");

  const [previewSource, setPreviewSource] = useState<Source | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const sessions = await apiClient.getChatSessions();
        setConversations(sessions);
        if (sessions.length > 0) {
          handleSelectConversation(sessions[0].id);
        } else {
          handleNewChat();
        }
      } catch {
        toast.error("Failed to load chat history.");
        handleNewChat();
      }
    };
    if (user) loadConversations();
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [activeMessages]);

  const handleNewChat = () => {
    const newId = uuidv4();
    const newConv: Conversation = { id: newId, title: "New Chat" };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newId);
    setActiveMessages([]);
  };

  const handleSelectConversation = async (sessionId: string) => {
    setActiveConversationId(sessionId);
    setIsLoading(true);
    try {
      const sessionDetails = await apiClient.getChatSessionDetails(sessionId);
      setActiveMessages(sessionDetails.history || []);
    } catch {
      toast.error("Failed to load conversation.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRename = async (sessionId: string) => {
    if (!newTitle.trim()) return;
    try {
      await apiClient.renameChat(sessionId, newTitle);
      setConversations((prev) =>
        prev.map((c) => (c.id === sessionId ? { ...c, title: newTitle } : c))
      );
      toast.success("Chat renamed.");
    } catch {
      toast.error("Failed to rename chat.");
    } finally {
      setEditingTitleId(null);
    }
  };

  const handleDelete = async (sessionId: string) => {
    try {
      await apiClient.deleteChat(sessionId);
      const remainingConversations = conversations.filter(
        (c) => c.id !== sessionId
      );
      setConversations(remainingConversations);
      if (activeConversationId === sessionId) {
        if (remainingConversations.length > 0) {
          handleSelectConversation(remainingConversations[0].id);
        } else {
          handleNewChat();
        }
      }
      toast.success("Chat deleted.");
    } catch {
      toast.error("Failed to delete chat.");
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading || !activeConversationId) return;
    const userMessage: ChatMessage = { role: "user", content: input };
    setActiveMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/query/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            query: currentInput,
            session_id: activeConversationId,
          }),
        }
      );
      if (!response.ok) throw new Error("API request failed");
      const data = await response.json();
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.answer,
        sources: data.sources,
      };
      setActiveMessages((prev) => [...prev, assistantMessage]);
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversationId ? { ...c, title: data.title } : c
        )
      );
    } catch {
      toast.error("Failed to get AI response.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (!activeConversationId) return;
    const toastId = toast.loading("Generating shareable link...");
    try {
      const response = await apiClient.shareChat(activeConversationId);
      const shareUrl = `${window.location.origin}/dashboard/share/${response.share_id}`;
      navigator.clipboard.writeText(shareUrl);
      toast.success("Shareable link copied to clipboard!", { id: toastId });
    } catch {
      toast.error("Failed to create share link.", { id: toastId });
    }
  };

  const openPreview = (source: Source) => {
    setPreviewSource(source);
    setIsPreviewOpen(true);
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full max-h-[calc(100vh-4rem)] w-full"
    >
      <ResizablePanel
        collapsible
        collapsedSize={4}
        onCollapse={() => setIsHistoryCollapsed(true)}
        onExpand={() => setIsHistoryCollapsed(false)}
        defaultSize={20}
        minSize={15}
        maxSize={25}
      >
        <div
          className={cn(
            "flex h-full flex-col",
            isHistoryCollapsed ? "p-2 items-center" : "p-4"
          )}
        >
          <Button
            onClick={handleNewChat}
            className={cn(
              "mb-4 w-full",
              isHistoryCollapsed ? "w-auto p-2" : ""
            )}
          >
            <Plus className={cn("h-4 w-4", isHistoryCollapsed ? "" : "mr-2")} />
            {!isHistoryCollapsed && "New Chat"}
          </Button>
          <ScrollArea className="flex-grow">
            <div className="space-y-1 pr-2">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={cn(
                    "group flex items-center justify-between p-2 rounded-md cursor-pointer",
                    activeConversationId === conv.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                  onClick={() => handleSelectConversation(conv.id)}
                >
                  <div className="flex items-center gap-2 truncate">
                    <MessageSquare className="h-4 w-4 flex-shrink-0" />
                    {!isHistoryCollapsed && (
                      <span className="truncate text-sm">{conv.title}</span>
                    )}
                  </div>
                  {!isHistoryCollapsed &&
                    (editingTitleId === conv.id ? (
                      <div
                        className="flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Input
                          defaultValue={conv.title}
                          onChange={(e) => setNewTitle(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleRename(conv.id)
                          }
                          className="h-7 text-sm"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleRename(conv.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => setEditingTitleId(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="hidden group-hover:flex">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingTitleId(conv.id);
                            setNewTitle(conv.title);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete this chat.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(conv.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <main className="flex flex-1 flex-col h-full">
          <header className="flex-shrink-0 border-b p-4 flex justify-end items-center gap-2">
            <div id="google_translate_element"></div>
            <Select
              onValueChange={(lang) => {
                const googleSelect: HTMLSelectElement | null =
                  document.querySelector(".goog-te-combo");
                if (googleSelect) {
                  googleSelect.value = lang;
                  googleSelect.dispatchEvent(new Event("change"));
                }
              }}
            >
              <SelectTrigger className="w-[140px]">
                <Languages className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Translate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ml">Malayalam</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              disabled={!activeConversationId || activeMessages.length === 0}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </header>
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6 max-w-4xl mx-auto">
              {activeMessages.map((message, index) => (
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
                    className={cn(
                      "p-4 rounded-lg",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      // className="prose dark:prose-invert max-w-none break-words"
                    >
                      {message.content}
                    </ReactMarkdown>
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-4 border-t pt-4">
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
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                    <Bot className="h-6 w-6" />
                  </div>
                  <Card className="max-w-2xl">
                    <CardContent className="p-4">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </CardContent>
                  </Card>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <div className="border-t bg-background p-4">
            <div className="relative max-w-4xl mx-auto">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask anything..."
                className="pr-12"
                disabled={isLoading}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  size="icon"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </ResizablePanel>
      <DocPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        source={previewSource}
      />
    </ResizablePanelGroup>
  );
}
