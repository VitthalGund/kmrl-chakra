"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, FileText, Download, TrendingUp, TrendingDown, Activity, Clock, Train, Shield } from "lucide-react"
import Link from "next/link"

export default function AdminAnalyticsPage() {
  const analyticsData = [
    {
      title: "Total Documents",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: <FileText className="h-6 w-6 text-primary" />,
    },
    {
      title: "Active Users",
      value: "89",
      change: "+15%",
      trend: "up",
      icon: <Users className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Total Downloads",
      value: "15,234",
      change: "+8%",
      trend: "up",
      icon: <Download className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "System Uptime",
      value: "99.8%",
      change: "+0.2%",
      trend: "up",
      icon: <Activity className="h-6 w-6 text-purple-500" />,
    },
  ]

  const departmentUsage = [
    { name: "Operations", usage: 85, documents: 456 },
    { name: "Maintenance", usage: 72, documents: 389 },
    { name: "HR", usage: 68, documents: 234 },
    { name: "Safety", usage: 91, documents: 567 },
    { name: "Finance", usage: 45, documents: 123 },
  ]

  const recentActivity = [
    {
      action: "Document uploaded",
      user: "Safety Team",
      document: "Emergency Protocol Update",
      time: "2 minutes ago",
      type: "upload",
    },
    {
      action: "Bulk download",
      user: "Operations Manager",
      document: "Monthly Reports",
      time: "15 minutes ago",
      type: "download",
    },
    {
      action: "User access granted",
      user: "Admin",
      document: "New Employee - John Doe",
      time: "1 hour ago",
      type: "access",
    },
    {
      action: "Document deleted",
      user: "HR Team",
      document: "Outdated Policy",
      time: "2 hours ago",
      type: "delete",
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
                <span className="font-bold text-lg text-gray-200">KMRL Chakra</span>
              </Link>
              <Badge variant="secondary" className="bg-red-600 text-white">
                <Shield className="h-3 w-3 mr-1" />
                Admin
              </Badge>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/admin/analytics" className="text-primary font-medium">
                Analytics
              </Link>
              <Link href="/admin/documents" className="text-gray-300 hover:text-primary transition-colors">
                Document Management
              </Link>
              <Link href="/admin/users" className="text-gray-300 hover:text-primary transition-colors">
                User Management
              </Link>
            </nav>
            <Button
              variant="outline"
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
              asChild
            >
              <Link href="/documents">Exit Admin</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-200">Analytics Dashboard</h1>
          <p className="text-gray-400">Monitor system performance, user activity, and document usage</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {analyticsData.map((metric, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-200">{metric.value}</p>
                    <p
                      className={`text-sm flex items-center ${
                        metric.trend === "up" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {metric.change} from last month
                    </p>
                  </div>
                  <div className="float-animation">{metric.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Department Usage */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-gray-200">Department Usage</CardTitle>
              <CardDescription className="text-gray-400">Document access by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentUsage.map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{dept.name}</span>
                      <span className="text-gray-400">{dept.documents} documents</span>
                    </div>
                    <Progress value={dept.usage} className="h-2" />
                    <div className="text-xs text-gray-500">{dept.usage}% usage rate</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-200">
                <Clock className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
              <CardDescription className="text-gray-400">Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border border-gray-700 rounded-lg">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "upload"
                          ? "bg-green-500"
                          : activity.type === "download"
                            ? "bg-blue-500"
                            : activity.type === "access"
                              ? "bg-purple-500"
                              : "bg-red-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-300">{activity.action}</p>
                      <p className="text-xs text-gray-400">by {activity.user}</p>
                      <p className="text-xs text-gray-500">{activity.document}</p>
                      <p className="text-xs text-gray-600 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health */}
        <div className="mt-8">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-gray-200">System Health</CardTitle>
              <CardDescription className="text-gray-400">Current system status and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">AI Processing</span>
                    <span className="text-gray-400">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                  <div className="text-xs text-green-500">Optimal</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Document Indexing</span>
                    <span className="text-gray-400">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                  <div className="text-xs text-yellow-500">Good</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">WhatsApp Bot</span>
                    <span className="text-gray-400">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <div className="text-xs text-green-500">Excellent</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
