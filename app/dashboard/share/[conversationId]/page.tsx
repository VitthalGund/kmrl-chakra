"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { apiClient, ChatSession, Source } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { AuthGuard } from "@/components/auth-guard";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User, Eye, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DocPreview } from "@/components/doc-preview";

const SharedConversationPage = () => {
  const { conversationId } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const [conversation, setConversation] = useState<ChatSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewSource, setPreviewSource] = useState<Source | null>(null);
  console.log({ conversationId });
  useEffect(() => {
    if (conversationId) {
      const fetchPreview = async () => {
        try {
          setIsLoading(true);
          const response = await apiClient.getSharedChatPreview(
            conversationId as string
          );
          setConversation(response);
        } catch (err) {
          setError(
            "Conversation not found. The link may be invalid or the chat may have been deleted."
          );
          toast.error("Could not load conversation preview.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchPreview();
    }
  }, [conversationId]);

  const handleImport = async () => {
    if (!conversationId) return;
    if (!user) {
      toast.error("You must be logged in to import a conversation.");
      router.push(`/login?redirect=/dashboard/share/${conversationId}`);
      return;
    }

    setIsImporting(true);
    try {
      const newSession = await apiClient.importSharedChat(
        conversationId as string
      );
      toast.success("Conversation imported successfully!");
      router.push(`/dashboard?sessionId=${newSession.id}`);
    } catch (err) {
      toast.error("Failed to import conversation.");
      setIsImporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex justify-center">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-16 w-1/2" />
            <div className="flex justify-end w-full">
              <Skeleton className="h-16 w-1/2" />
            </div>
            <Skeleton className="h-16 w-1/2" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="container mx-auto p-4 flex flex-col items-center">
        <Card className="w-full max-w-4xl p-6">
          <CardHeader>
            <CardTitle className="text-2xl">{conversation?.title}</CardTitle>
            <p className="text-muted-foreground">
              This is a preview of a shared conversation. Click below to import
              it into your own history.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex-grow overflow-hidden border rounded-lg">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6 max-w-4xl max-h-[calc(100vh-400px)] mx-auto">
                  {conversation?.history.map((message, index) => (
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
                          "p-4 rounded-lg max-w-2xl",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.content}
                        </ReactMarkdown>
                        {message.sources && message.sources.length > 0 && (
                          <div className="mt-4 border-t pt-4">
                            <h4 className="font-semibold text-sm mb-2">
                              Sources:
                            </h4>
                            <div className="space-y-2">
                              {message.sources.map(
                                (source: Source, i: number) => (
                                  <div
                                    key={i}
                                    className="text-xs p-2 bg-background/50 rounded-md flex items-center justify-between gap-2"
                                  >
                                    <div className="flex-grow overflow-hidden">
                                      <p className="font-bold truncate">
                                        {source.file_name}
                                      </p>
                                    </div>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setOpen(true);
                                        setPreviewSource(source);
                                      }}
                                    >
                                      <Eye className="h-4 w-4 mr-2" />
                                      Preview
                                    </Button>
                                  </div>
                                )
                              )}
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
                </div>
              </ScrollArea>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleImport}
              disabled={isImporting}
              className="w-full"
              size="lg"
            >
              {isImporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                "Continue Conversation"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
      {previewSource && (
        <DocPreview
          source={previewSource}
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      )}
    </AuthGuard>
  );
};

export default SharedConversationPage;
