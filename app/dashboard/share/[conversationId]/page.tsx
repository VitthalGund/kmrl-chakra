"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient, ChatMessage } from "@/lib/api";

interface Conversation {
  id: string;
  title: string;
  history: ChatMessage[];
}

// The page component
const SharedConversationPage = () => {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (conversationId) {
      const fetchSharedConversation = async () => {
        try {
          const response = await apiClient.axios.get<Conversation>(
            `/api/v1/collaboration/chat/share/${conversationId}/`
          );

          if (response.status === 404) {
            setError("This conversation could not be found or is not public.");
            return;
          }
          console.log({ response });

          setConversation(response.data);
        } catch (err) {
          setError("An error occurred while loading the conversation.");
          toast.error("Could not load the shared conversation.");
        } finally {
          setLoading(false);
        }
      };

      fetchSharedConversation();
    }
  }, [conversationId]);

  // Display a loading skeleton while the data is being fetched
  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-12 w-1/2" />
            </div>
            <div className="flex items-start justify-end gap-4">
              <Skeleton className="h-12 w-1/2" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Display an error message if the conversation could not be loaded
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Render the conversation if it was loaded successfully
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{conversation?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversation?.history.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 ${
                  msg.role === "user" ? "justify-end" : ""
                }`}
              >
                {msg.role === "assistant" && (
                  <Avatar>
                    <AvatarImage src="/kmrl-logo.jpg" alt="KMRL" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg p-3 max-w-[75%] ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.role === "user" && (
                  <Avatar>
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SharedConversationPage;
