"use client";

import { useState, useEffect } from "react";
import { Bell, Send, Loader2, Users, Building, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { apiClient } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function AdminNotificationsPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetType, setTargetType] = useState("broadcast");
  const [targetValue, setTargetValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [departments, setDepartments] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || user?.role !== "Admin") {
        toast.error("Access Denied.");
        router.push("/dashboard/documents");
      } else {
        // Fetch dynamic data for dropdowns
        const fetchConfig = async () => {
          try {
            const [deptRes, rolesRes] = await Promise.all([
              apiClient.axios.get("/config/departments"),
              apiClient.axios.get("/config/roles"),
            ]);
            setDepartments(deptRes.data);
            setRoles(rolesRes.data);
          } catch {
            toast.error("Failed to load configuration data.");
          }
        };
        fetchConfig();
      }
    }
  }, [authLoading, isAuthenticated, user, router]);

  const handleSendNotification = async () => {
    if (!title || !message) {
      toast.warning("Title and message are required.");
      return;
    }

    let targetPayload: any = { type: targetType };
    if (targetType === "department" || targetType === "role") {
      if (!targetValue) {
        toast.warning("Please select a target value.");
        return;
      }
      targetPayload.names = [targetValue];
    }

    setIsLoading(true);
    const toastId = toast.loading("Sending notification...");

    try {
      await apiClient.axios.post("/notifications/broadcast", {
        title,
        message,
        target: targetPayload,
      });
      toast.success("Notification sent successfully!", { id: toastId });
      setTitle("");
      setMessage("");
      setTargetValue("");
    } catch (error) {
      toast.error("Failed to send notification.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || !user || user.role !== "Admin") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Create Notification
        </h1>
        <p className="text-muted-foreground">
          Broadcast announcements to users of the platform.
        </p>
      </div>

      <Card className="p-4">
        <CardHeader>
          <CardTitle>Compose Message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Notification Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Write your announcement here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
          />

          <div className="flex items-end gap-4">
            <div className="flex-grow">
              <label className="text-sm font-medium">Target Audience</label>
              <Select value={targetType} onValueChange={setTargetType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="broadcast">
                    <Users className="mr-2 h-4 w-4" />
                    Broadcast to All
                  </SelectItem>
                  <SelectItem value="department">
                    <Building className="mr-2 h-4 w-4" />
                    Target Department
                  </SelectItem>
                  <SelectItem value="role">
                    <Shield className="mr-2 h-4 w-4" />
                    Target Role
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(targetType === "department" || targetType === "role") && (
              <Select onValueChange={setTargetValue}>
                <SelectTrigger className="w-[240px]">
                  <SelectValue placeholder={`Select a ${targetType}`} />
                </SelectTrigger>
                <SelectContent>
                  {targetType === "department"
                    ? departments.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))
                    : roles.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <Button onClick={handleSendNotification} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Send Notification
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
