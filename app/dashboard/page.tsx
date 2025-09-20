"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  FileText,
  MessageSquare,
  Bell,
  BarChart3,
  Clock,
  TrendingUp,
  Download,
  Upload,
  Eye,
  Train,
  Bot,
  Zap,
  Filter,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const recentDocuments = [
    {
      id: 1,
      title: "Safety Protocol Update",
      titleMalayalam: "സുരക്ഷാ പ്രോട്ടോക്കോൾ അപ്ഡേറ്റ്",
      type: "Policy",
      date: "2025-01-15",
      status: "New",
      department: "Operations",
    },
    {
      id: 2,
      title: "Monthly Maintenance Report",
      titleMalayalam: "മാസിക മെയിന്റനൻസ് റിപ്പോർട്ട്",
      type: "Report",
      date: "2025-01-14",
      status: "Updated",
      department: "Maintenance",
    },
    {
      id: 3,
      title: "Staff Training Manual",
      titleMalayalam: "സ്റ്റാഫ് പരിശീലന മാനുവൽ",
      type: "Manual",
      date: "2025-01-13",
      status: "Reviewed",
      department: "HR",
    },
  ]

  const quickStats = [
    {
      title: "Total Documents",
      titleMalayalam: "മൊത്തം ഡോക്യുമെന്റുകൾ",
      value: "2,847",
      change: "+12%",
      icon: <FileText className="h-6 w-6 text-primary" />,
    },
    {
      title: "Pending Reviews",
      titleMalayalam: "അവലോകനത്തിനായി കാത്തിരിക്കുന്നവ",
      value: "23",
      change: "-5%",
      icon: <Clock className="h-6 w-6 text-orange-500" />,
    },
    {
      title: "AI Queries Today",
      titleMalayalam: "ഇന്നത്തെ AI ചോദ്യങ്ങൾ",
      value: "156",
      change: "+28%",
      icon: <Bot className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "System Efficiency",
      titleMalayalam: "സിസ്റ്റം കാര്യക്ഷമത",
      value: "94.2%",
      change: "+2.1%",
      icon: <TrendingUp className="h-6 w-6 text-green-500" />,
    },
  ]

  const notifications = [
    {
      id: 1,
      title: "New safety guidelines uploaded",
      titleMalayalam: "പുതിയ സുരക്ഷാ മാർഗ്ഗനിർദ്ദേശങ്ങൾ അപ്‌ലോഡ് ചെയ്തു",
      time: "2 hours ago",
      type: "info",
    },
    {
      id: 2,
      title: "Weekly maintenance report due",
      titleMalayalam: "പ്രതിവാര മെയിന്റനൻസ് റിപ്പോർട്ട് അവസാന തീയതി",
      time: "4 hours ago",
      type: "warning",
    },
    {
      id: 3,
      title: "System backup completed",
      titleMalayalam: "സിസ്റ്റം ബാക്കപ്പ് പൂർത്തിയായി",
      time: "6 hours ago",
      type: "success",
    },
  ]

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
              <Link href="/dashboard" className="text-primary font-medium">
                Dashboard
              </Link>
              <Link href="/documents" className="text-foreground hover:text-primary transition-colors">
                Documents
              </Link>
              <Link href="/search" className="text-foreground hover:text-primary transition-colors">
                Search
              </Link>
              <Link href="/analytics" className="text-foreground hover:text-primary transition-colors">
                Analytics
              </Link>
              <Link href="/settings" className="text-foreground hover:text-primary transition-colors">
                Settings
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                WhatsApp Bot
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Metro Worker!</h1>
          <p className="text-xl text-muted-foreground mb-1">സ്വാഗതം, മെട്രോ തൊഴിലാളി!</p>
          <p className="text-muted-foreground">
            Here's your personalized dashboard with the latest updates and quick access to your documents.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search documents, ask questions... / ഡോക്യുമെന്റുകൾ തിരയുക, ചോദ്യങ്ങൾ ചോദിക്കുക..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-base rounded-lg"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Zap className="h-4 w-4 mr-2" />
              AI Search
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-xs text-muted-foreground mb-2">{stat.titleMalayalam}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="float-animation">{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Documents */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Documents</CardTitle>
                    <CardDescription>സമീപകാല ഡോക്യുമെന്റുകൾ</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <h4 className="font-medium">{doc.title}</h4>
                          <p className="text-sm text-muted-foreground">{doc.titleMalayalam}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {doc.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {doc.department}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{doc.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            doc.status === "New" ? "default" : doc.status === "Updated" ? "secondary" : "outline"
                          }
                          className="text-xs"
                        >
                          {doc.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" asChild>
                    <Link href="/documents">View All Documents</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications & Quick Actions */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </CardTitle>
                <CardDescription>അറിയിപ്പുകൾ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === "info"
                            ? "bg-blue-500"
                            : notification.type === "warning"
                              ? "bg-orange-500"
                              : "bg-green-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.titleMalayalam}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>ദ്രുത പ്രവർത്തനങ്ങൾ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                    <Link href="/upload">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document
                    </Link>
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                    <Link href="/search">
                      <Search className="h-4 w-4 mr-2" />
                      Advanced Search
                    </Link>
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                    <Link href="/whatsapp">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      WhatsApp Bot
                    </Link>
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                    <Link href="/analytics">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>സിസ്റ്റം നില</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>AI Processing</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Document Indexing</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>WhatsApp Bot</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
