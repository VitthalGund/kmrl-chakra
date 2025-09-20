"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Bell, Train, Save, RefreshCw, MessageSquare, Bot, Database, Calendar } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    whatsapp: true,
    dailyDigest: true,
    documentUpdates: true,
    systemAlerts: false
  })

  const [profile, setProfile] = useState({
    name: 'Metro Worker',
    namemalayalam: 'മെട്രോ തൊഴിലാളി',
    email: 'worker@kmrl.co.in',
    phone: '+91 9876543210',
    department: 'Operations',
    role: 'Senior Operator',
    employeeId: 'KMRL001',
    language: 'malayalam'
  })

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
              <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">Dashboard</Link>
              <Link href="/documents" className="text-foreground hover:text-primary transition-colors">Documents</Link>
              <Link href="/search" className="text-foreground hover:text-primary transition-colors">Search</Link>
              <Link href="/analytics" className="text-foreground hover:text-primary transition-colors">Analytics</Link>
              <Link href="/settings" className="text-primary font-medium">Settings</Link>
            </nav>
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-xl text-muted-foreground mb-1">ക്രമീകരണങ്ങൾ</p>
          <p className="text-muted-foreground">
            Customize your KMRL Chakra experience and manage your preferences.
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="language">Language</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Information
                </CardTitle>
                <CardDescription>പ്രൊഫൈൽ വിവരങ്ങൾ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="namemalayalam">Name in Malayalam</Label>
                    <Input
                      id="namemalayalam"
                      value={profile.namemalayalam}
                      onChange={(e) => setProfile({...profile, namemalayalam: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeid">Employee ID</Label>
                    <Input
                      id="employeeid"
                      value={profile.employeeId}
                      onChange={(e) => setProfile({...profile, employeeId: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select value={profile.department} onValueChange={(value) => setProfile({...profile, department: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="safety">Safety</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">2.5 years</p>
                  <p className="text-sm text-muted-foreground">With KMRL</p>
                  <p className="text-xs text-muted-foreground">KMRL-ൽ</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Bot className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-sm text-muted-foreground">AI Queries</p>
                  <p className="text-xs text-muted-foreground">AI ചോദ്യങ്ങൾ</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Database className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">567</p>
                  <p className="text-sm text-muted-foreground">Documents Accessed</p>
                  <p className="text-xs text-muted-foreground">ആക്സസ് ചെയ്ത ഡോക്യുമെന്റുകൾ</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-sm text-muted-foreground">WhatsApp Chats</p>
                  <p className="text-xs text-muted-foreground">വാട്സ്ആപ്പ് ചാറ്റുകൾ</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>അറിയിപ്പ് മുൻഗണനകൾ</CardDescription>
              </CardHeader>\
