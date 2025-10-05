"use client";

import { useState, useEffect } from "react";
import { Bell, Loader2, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { apiClient, Notification } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { formatDistanceToNow } from "date-fns";

export default function NotificationsPage() {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!isAuthenticated) return;
      setIsLoading(true);
      try {
        const data = await apiClient.getNotifications();
        setNotifications(data);
      } catch (error) {
        toast.error("Failed to fetch notifications.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [isAuthenticated]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Notifications
        </h1>
        <p className="text-muted-foreground">
          Recent updates, alerts, and announcements for you.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Feed</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="flex items-start gap-4 p-4 border-b last:border-b-0"
                >
                  <div className="mt-1">
                    {notif.author_email.includes("webhook") ? (
                      <Mail className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Bell className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{notif.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(notif.created_at), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {notif.message}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      From: {notif.author_email}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <Bell className="mx-auto h-12 w-12" />
              <p className="mt-4 text-lg font-semibold">No new notifications</p>
              <p>You're all caught up!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
