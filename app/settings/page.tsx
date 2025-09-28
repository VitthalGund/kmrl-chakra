"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Bell,
  Train,
  Save,
  RefreshCw,
  MessageSquare,
  Bot,
  Database,
  Calendar,
  Settings,
  Globe,
  Shield,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [notifications, setNotifications] = useState({
    email: true,
    whatsapp: true,
    dailyDigest: true,
    documentUpdates: true,
    systemAlerts: false,
  })

  const [profile, setProfile] = useState({
    name: "Metro Worker",
    email: "worker@kmrl.co.in",
    phone: "+91 9876543210",
    department: "Operations",
    role: "Senior Operator",
    employeeId: "KMRL001",
    language: "english",
  })

  const [languageSettings, setLanguageSettings] = useState({
    interfaceLanguage: "english",
    dateFormat: "dd/mm/yyyy",
    timeFormat: "24h",
    timezone: "ist",
  })

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  })

  const [systemSettings, setSystemSettings] = useState({
    theme: "dark",
    itemsPerPage: "20",
    autoSaveInterval: "5",
  })

  useEffect(() => {
    const root = document.documentElement
    if (systemSettings.theme === "dark") {
      root.classList.add("dark")
      root.style.colorScheme = "dark"
    } else if (systemSettings.theme === "light") {
      root.classList.remove("dark")
      root.style.colorScheme = "light"
    } else {
      // System theme
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      if (prefersDark) {
        root.classList.add("dark")
        root.style.colorScheme = "dark"
      } else {
        root.classList.remove("dark")
        root.style.colorScheme = "light"
      }
    }
  }, [systemSettings.theme])

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Validate required fields
      if (!profile.name || !profile.email || !profile.employeeId) {
        throw new Error("Please fill in all required fields")
      }

      // Save to localStorage for persistence
      localStorage.setItem("kmrl_profile", JSON.stringify(profile))

      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save profile",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleResetProfile = () => {
    const defaultProfile = {
      name: "Metro Worker",
      email: "worker@kmrl.co.in",
      phone: "+91 9876543210",
      department: "Operations",
      role: "Senior Operator",
      employeeId: "KMRL001",
      language: "english",
    }
    setProfile(defaultProfile)
    localStorage.removeItem("kmrl_profile")
    toast({
      title: "Profile Reset",
      description: "Profile information has been reset to defaults.",
    })
  }

  const handleSaveNotifications = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      localStorage.setItem("kmrl_notifications", JSON.stringify(notifications))
      toast({
        title: "Notifications Updated",
        description: "Your notification preferences have been saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save notification preferences",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleResetNotifications = () => {
    const defaultNotifications = {
      email: true,
      whatsapp: true,
      dailyDigest: true,
      documentUpdates: true,
      systemAlerts: false,
    }
    setNotifications(defaultNotifications)
    localStorage.removeItem("kmrl_notifications")
    toast({
      title: "Notifications Reset",
      description: "Notification preferences have been reset to defaults.",
    })
  }

  const handleSaveLanguage = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      localStorage.setItem("kmrl_language", JSON.stringify(languageSettings))
      toast({
        title: "Language Settings Updated",
        description: "Your language and regional preferences have been saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save language settings",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleResetLanguage = () => {
    const defaultLanguage = {
      interfaceLanguage: "english",
      dateFormat: "dd/mm/yyyy",
      timeFormat: "24h",
      timezone: "ist",
    }
    setLanguageSettings(defaultLanguage)
    localStorage.removeItem("kmrl_language")
    toast({
      title: "Language Settings Reset",
      description: "Language settings have been reset to defaults.",
    })
  }

  const handleSaveSecurity = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (securitySettings.newPassword && securitySettings.newPassword !== securitySettings.confirmPassword) {
        throw new Error("New passwords do not match")
      }

      if (securitySettings.newPassword && securitySettings.newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters long")
      }

      // Clear password fields after successful save
      setSecuritySettings({
        ...securitySettings,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      toast({
        title: "Security Updated",
        description: "Your security settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update security settings",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveSystem = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      localStorage.setItem("kmrl_system", JSON.stringify(systemSettings))
      toast({
        title: "System Settings Updated",
        description: "Your system preferences have been saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save system settings",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleResetSystem = () => {
    const defaultSystem = {
      theme: "dark",
      itemsPerPage: "20",
      autoSaveInterval: "5",
    }
    setSystemSettings(defaultSystem)
    localStorage.removeItem("kmrl_system")
    toast({
      title: "System Settings Reset",
      description: "System settings have been reset to defaults.",
    })
  }

  const handleClearCache = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast({
        title: "Cache Cleared",
        description: "Application cache has been cleared successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear cache",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const savedProfile = localStorage.getItem("kmrl_profile")
    const savedNotifications = localStorage.getItem("kmrl_notifications")
    const savedLanguage = localStorage.getItem("kmrl_language")
    const savedSystem = localStorage.getItem("kmrl_system")

    if (savedProfile) setProfile(JSON.parse(savedProfile))
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications))
    if (savedLanguage) setLanguageSettings(JSON.parse(savedLanguage))
    if (savedSystem) setSystemSettings(JSON.parse(savedSystem))
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <Train className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg text-gray-200">KMRL Chakra</span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-300 hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link href="/documents" className="text-gray-300 hover:text-primary transition-colors">
                Documents
              </Link>
              <Link href="/search" className="text-gray-300 hover:text-primary transition-colors">
                Search
              </Link>
              <Link href="/analytics" className="text-gray-300 hover:text-primary transition-colors">
                Analytics
              </Link>
              <Link href="/settings" className="text-primary font-medium">
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
          <h1 className="text-3xl font-bold mb-2 text-gray-200">Settings</h1>
          <p className="text-gray-400">Customize your KMRL Chakra experience and manage your preferences.</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-card border border-border">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="language"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Language
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Security
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-200">
                  <User className="h-5 w-5 mr-2" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your personal information and account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-gray-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-gray-200"
                      required
                    />
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeid" className="text-gray-300">
                      Employee ID *
                    </Label>
                    <Input
                      id="employeeid"
                      value={profile.employeeId}
                      onChange={(e) => setProfile({ ...profile, employeeId: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-gray-200"
                      required
                    />
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-gray-300">
                      Department
                    </Label>
                    <Select
                      value={profile.department}
                      onValueChange={(value) => setProfile({ ...profile, department: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Safety">Safety</SelectItem>
                        <SelectItem value="Human Resources">Human Resources</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Management">Management</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Customer Service">Customer Service</SelectItem>
                        <SelectItem value="Security">Security</SelectItem>
                        <SelectItem value="IT">Information Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-gray-300">
                      Role
                    </Label>
                    <Input
                      id="role"
                      value={profile.role}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-gray-200"
                    />
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                  <Button
                    variant="outline"
                    onClick={handleResetProfile}
                    className="w-full sm:w-auto bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                    disabled={isSaving}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button onClick={handleSaveProfile} className="w-full sm:w-auto" disabled={isSaving}>
                    {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-200">2.5 years</p>
                  <p className="text-sm text-gray-400">With KMRL</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Bot className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-200">1,234</p>
                  <p className="text-sm text-gray-400">AI Queries</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Database className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-200">567</p>
                  <p className="text-sm text-gray-400">Documents Accessed</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-200">89</p>
                  <p className="text-sm text-gray-400">WhatsApp Chats</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-200">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage how you receive notifications and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <Label className="text-base font-medium text-gray-200">Email Notifications</Label>
                      <p className="text-sm text-gray-400">Receive updates via email</p>
                    </div>
                    <Button
                      variant={notifications.email ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                      className={notifications.email ? "bg-primary" : "bg-transparent border-gray-600 text-gray-300"}
                    >
                      {notifications.email ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <Label className="text-base font-medium text-gray-200">WhatsApp Notifications</Label>
                      <p className="text-sm text-gray-400">Get instant updates on WhatsApp</p>
                    </div>
                    <Button
                      variant={notifications.whatsapp ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNotifications({ ...notifications, whatsapp: !notifications.whatsapp })}
                      className={notifications.whatsapp ? "bg-primary" : "bg-transparent border-gray-600 text-gray-300"}
                    >
                      {notifications.whatsapp ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <Label className="text-base font-medium text-gray-200">Daily Digest</Label>
                      <p className="text-sm text-gray-400">Daily summary of activities</p>
                    </div>
                    <Button
                      variant={notifications.dailyDigest ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNotifications({ ...notifications, dailyDigest: !notifications.dailyDigest })}
                      className={
                        notifications.dailyDigest ? "bg-primary" : "bg-transparent border-gray-600 text-gray-300"
                      }
                    >
                      {notifications.dailyDigest ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <Label className="text-base font-medium text-gray-200">Document Updates</Label>
                      <p className="text-sm text-gray-400">New document notifications</p>
                    </div>
                    <Button
                      variant={notifications.documentUpdates ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        setNotifications({ ...notifications, documentUpdates: !notifications.documentUpdates })
                      }
                      className={
                        notifications.documentUpdates ? "bg-primary" : "bg-transparent border-gray-600 text-gray-300"
                      }
                    >
                      {notifications.documentUpdates ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <Label className="text-base font-medium text-gray-200">System Alerts</Label>
                      <p className="text-sm text-gray-400">Critical system notifications</p>
                    </div>
                    <Button
                      variant={notifications.systemAlerts ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNotifications({ ...notifications, systemAlerts: !notifications.systemAlerts })}
                      className={
                        notifications.systemAlerts ? "bg-primary" : "bg-transparent border-gray-600 text-gray-300"
                      }
                    >
                      {notifications.systemAlerts ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                  <Button
                    variant="outline"
                    onClick={handleResetNotifications}
                    className="w-full sm:w-auto bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                    disabled={isSaving}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button onClick={handleSaveNotifications} className="w-full sm:w-auto" disabled={isSaving}>
                    {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    {isSaving ? "Saving..." : "Save Preferences"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="language" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-200">
                  <Globe className="h-5 w-5 mr-2" />
                  Language & Region
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Set your preferred language and regional settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="interface-language" className="text-gray-300">
                      Interface Language
                    </Label>
                    <Select
                      value={languageSettings.interfaceLanguage}
                      onValueChange={(value) => setLanguageSettings({ ...languageSettings, interfaceLanguage: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="malayalam">Malayalam</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format" className="text-gray-300">
                      Date Format
                    </Label>
                    <Select
                      value={languageSettings.dateFormat}
                      onValueChange={(value) => setLanguageSettings({ ...languageSettings, dateFormat: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time-format" className="text-gray-300">
                      Time Format
                    </Label>
                    <Select
                      value={languageSettings.timeFormat}
                      onValueChange={(value) => setLanguageSettings({ ...languageSettings, timeFormat: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12 Hour</SelectItem>
                        <SelectItem value="24h">24 Hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-gray-300">
                      Timezone
                    </Label>
                    <Select
                      value={languageSettings.timezone}
                      onValueChange={(value) => setLanguageSettings({ ...languageSettings, timezone: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="gmt">GMT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                  <Button
                    variant="outline"
                    onClick={handleResetLanguage}
                    className="w-full sm:w-auto bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                    disabled={isSaving}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button onClick={handleSaveLanguage} className="w-full sm:w-auto" disabled={isSaving}>
                    {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    {isSaving ? "Saving..." : "Save Settings"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-200">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Settings
                </CardTitle>
                <CardDescription className="text-gray-400">Manage your account security and privacy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-gray-300">
                      Current Password
                    </Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="Enter current password"
                      value={securitySettings.currentPassword}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, currentPassword: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-gray-300">
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Enter new password"
                      value={securitySettings.newPassword}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, newPassword: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-gray-300">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm new password"
                      value={securitySettings.confirmPassword}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, confirmPassword: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-gray-200"
                    />
                  </div>
                </div>
                <div className="border-t border-border pt-6">
                  <h4 className="text-lg font-medium mb-4 text-gray-200">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <Label className="text-base font-medium text-gray-200">Enable 2FA</Label>
                      <p className="text-sm text-gray-400">Add extra security to your account</p>
                    </div>
                    <Button
                      variant={securitySettings.twoFactorEnabled ? "default" : "outline"}
                      onClick={() =>
                        setSecuritySettings({
                          ...securitySettings,
                          twoFactorEnabled: !securitySettings.twoFactorEnabled,
                        })
                      }
                      className={
                        securitySettings.twoFactorEnabled
                          ? "bg-primary"
                          : "bg-transparent border-gray-600 text-gray-300"
                      }
                    >
                      {securitySettings.twoFactorEnabled ? "Enabled" : "Setup 2FA"}
                    </Button>
                  </div>
                </div>
                <div className="border-t border-border pt-6">
                  <h4 className="text-lg font-medium mb-4 text-gray-200">Active Sessions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <p className="font-medium text-gray-200">Current Session</p>
                        <p className="text-sm text-gray-400">Chrome on Windows • Kochi, Kerala</p>
                      </div>
                      <span className="text-sm text-green-400 bg-green-400/20 px-2 py-1 rounded">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <p className="font-medium text-gray-200">Mobile App</p>
                        <p className="text-sm text-gray-400">Android • Last seen 2 hours ago</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        Revoke
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveSecurity} className="w-full sm:w-auto" disabled={isSaving}>
                    {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    {isSaving ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-200">
                  <Settings className="h-5 w-5 mr-2" />
                  System Preferences
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure system-wide settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="theme" className="text-gray-300">
                      Theme
                    </Label>
                    <Select
                      value={systemSettings.theme}
                      onValueChange={(value) => setSystemSettings({ ...systemSettings, theme: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="items-per-page" className="text-gray-300">
                      Items per Page
                    </Label>
                    <Select
                      value={systemSettings.itemsPerPage}
                      onValueChange={(value) => setSystemSettings({ ...systemSettings, itemsPerPage: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="auto-save" className="text-gray-300">
                      Auto-save Interval
                    </Label>
                    <Select
                      value={systemSettings.autoSaveInterval}
                      onValueChange={(value) => setSystemSettings({ ...systemSettings, autoSaveInterval: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 minute</SelectItem>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div>
                  <h4 className="text-lg font-medium mb-4 text-gray-200">Data & Storage</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <Label className="text-base font-medium text-gray-200">Cache Size</Label>
                        <p className="text-sm text-gray-400">Current cache: 245 MB</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClearCache}
                        disabled={isLoading}
                        className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Clear Cache"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <Label className="text-base font-medium text-gray-200">Download Location</Label>
                        <p className="text-sm text-gray-400">/Downloads/KMRL-Documents</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div>
                  <h4 className="text-lg font-medium mb-4 text-gray-200">System Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-border rounded-lg">
                      <p className="text-gray-400 text-sm">Version</p>
                      <p className="font-medium text-gray-200">KMRL Chakra v2.1.0</p>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                      <p className="text-gray-400 text-sm">Last Updated</p>
                      <p className="font-medium text-gray-200">January 15, 2025</p>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                      <p className="text-gray-400 text-sm">Database</p>
                      <p className="font-medium text-green-400">Connected</p>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                      <p className="text-gray-400 text-sm">AI Service</p>
                      <p className="font-medium text-green-400">Online</p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                  <Button
                    variant="outline"
                    onClick={handleResetSystem}
                    className="w-full sm:w-auto bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                    disabled={isSaving}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset to Defaults
                  </Button>
                  <Button onClick={handleSaveSystem} className="w-full sm:w-auto" disabled={isSaving}>
                    {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
