"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { apiClient } from "@/lib/api";
import { Loader2, Bell, Mail, Trash2, Plus, Lock, Badge } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isPushLoading, setIsPushLoading] = useState(true);

  const [alertConfigs, setAlertConfigs] = useState<any[]>([]);
  const [newAlertEmail, setNewAlertEmail] = useState("");
  const [newAlertPriority, setNewAlertPriority] = useState("normal");
  const [isAlertLoading, setIsAlertLoading] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((subscription) => {
          setIsPushEnabled(!!subscription);
          setIsPushLoading(false);
        });
      });
    } else {
      console.warn("Push notifications are not supported in this browser.");
      setIsPushLoading(false);
    }
  }, []);

  const fetchAlertConfigs = async () => {
    try {
      const { data } = await apiClient.axios.get("/alerts/config");
      setAlertConfigs(data);
    } catch {
      toast.error("Failed to load email alert configurations.");
    }
  };

  useEffect(() => {
    fetchAlertConfigs();
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    setIsPasswordLoading(true);
    const toastId = toast.loading("Changing password...");
    try {
      const { data } = await apiClient.axios.post("/users/me/change-password", {
        current_password: currentPassword,
        new_password: newPassword,
      });
      toast.success(data.message, { id: toastId });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error("Failed to change password.", {
        id: toastId,
        description: error.response?.data?.detail,
      });
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const handlePushSubscriptionChange = async (checked: boolean) => {
    setIsPushLoading(true);
    if (!checked) {
      try {
        const reg = await navigator.serviceWorker.ready;
        const subscription = await reg.pushManager.getSubscription();
        if (subscription) {
          await subscription.unsubscribe();
          toast.success("Push notifications disabled.");
          setIsPushEnabled(false);
        }
      } catch {
        toast.error("Failed to unsubscribe.");
      }
    } else {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          toast.warning("Notification permission was denied.");
          setIsPushLoading(false);
          return;
        }
        const reg = await navigator.serviceWorker.ready;
        const subscription = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
          ),
        });
        await apiClient.axios.post("/updates/subscribe", subscription.toJSON());
        toast.success("Push notifications enabled!");
        setIsPushEnabled(true);
      } catch (err) {
        toast.error("Failed to subscribe to push notifications.");
      }
    }
    setIsPushLoading(false);
  };

  const handleAddAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAlertLoading(true);
    try {
      await apiClient.axios.post("/alerts/config", {
        monitored_email: newAlertEmail,
        priority: newAlertPriority,
      });
      toast.success(`Now monitoring ${newAlertEmail}.`);
      setNewAlertEmail("");
      fetchAlertConfigs();
    } catch (error: any) {
      toast.error("Failed to add alert.", {
        description: error.response?.data?.detail,
      });
    } finally {
      setIsAlertLoading(false);
    }
  };

  const handleDeleteAlert = async (configId: string) => {
    const originalConfigs = [...alertConfigs];
    setAlertConfigs((prev) => prev.filter((c) => c._id !== configId));
    try {
      await apiClient.axios.delete(`/alerts/config/${configId}`);
      toast.success("Alert configuration removed.");
    } catch {
      toast.error("Failed to remove alert.");
      setAlertConfigs(originalConfigs);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences.
        </p>
      </div>

      <Card className="p-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Security
          </CardTitle>
          <CardDescription>Change your account password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isPasswordLoading}>
              {isPasswordLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="p-4">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage how you receive real-time alerts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label
                htmlFor="push-notifications"
                className="font-medium flex items-center gap-2"
              >
                <Bell className="h-4 w-4" />
                Browser Push Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive instant alerts directly in your browser when online.
              </p>
            </div>
            {isPushLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Switch
                id="push-notifications"
                checked={isPushEnabled}
                onCheckedChange={handlePushSubscriptionChange}
              />
            )}
          </div>
          <Separator />
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email-Based Alerts
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get push notifications when an email is received from a specific
              address.
            </p>
            <form
              onSubmit={handleAddAlert}
              className="flex items-end gap-2 mb-4"
            >
              <div className="flex-grow space-y-1">
                <Label htmlFor="monitor-email">Email to Monitor</Label>
                <Input
                  id="monitor-email"
                  type="email"
                  placeholder="sender@example.com"
                  value={newAlertEmail}
                  onChange={(e) => setNewAlertEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label>Priority</Label>
                <Select
                  value={newAlertPriority}
                  onValueChange={setNewAlertPriority}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled={isAlertLoading}>
                {isAlertLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            </form>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">
                Currently Monitored Emails:
              </h4>
              {alertConfigs.length > 0 ? (
                alertConfigs.map((config) => (
                  <div
                    key={config._id}
                    className="flex items-center justify-between text-sm p-2 bg-muted rounded-md"
                  >
                    <div>
                      <span className="font-medium">
                        {config.monitored_email}
                      </span>
                      <Badge
                        variant={
                          config.priority === "high"
                            ? "destructive"
                            : "secondary"
                        }
                        className="ml-2"
                      >
                        {config.priority}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteAlert(config._id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center p-4">
                  You are not monitoring any emails.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
