"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Users,
  FileText,
  Download,
  Eye,
  MessageSquare,
  Clock,
  Activity,
  Train,
  Bot,
  Zap,
  Target,
  Award,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function AnalyticsPage() {
  const monthlyData = [
    { month: "Jan", documents: 245, queries: 1200, users: 89 },
    { month: "Feb", documents: 289, queries: 1450, users: 95 },
    { month: "Mar", documents: 312, queries: 1680, users: 102 },
    { month: "Apr", documents: 356, queries: 1890, users: 108 },
    { month: "May", documents: 398, queries: 2100, users: 115 },
    { month: "Jun", documents: 445, queries: 2350, users: 122 },
  ]

  const departmentData = [
    { name: "Operations", value: 35, color: "#10b981" },
    { name: "Maintenance", value: 25, color: "#3b82f6" },
    { name: "Safety", value: 20, color: "#f59e0b" },
    { name: "HR", value: 12, color: "#ef4444" },
    { name: "Finance", value: 8, color: "#8b5cf6" },
  ]

  const documentTypes = [
    { type: "Policies", count: 45, percentage: 30 },
    { type: "Manuals", count: 38, percentage: 25 },
    { type: "Reports", count: 32, percentage: 21 },
    { type: "Training", count: 22, percentage: 15 },
    { type: "Procedures", count: 13, percentage: 9 },
  ]

  const topDocuments = [
    { title: "Safety Protocol 2025", titleMalayalam: "സുരക്ഷാ പ്രോട്ടോക്കോൾ 2025", views: 1250, downloads: 234 },
    { title: "Emergency Response Plan", titleMalayalam: "അടിയന്തര പ്രതികരണ പദ്ധതി", views: 1156, downloads: 198 },
    { title: "Train Maintenance Manual", titleMalayalam: "ട്രെയിൻ മെയിന്റനൻസ് മാനുവൽ", views: 890, downloads: 167 },
    { title: "Employee Handbook", titleMalayalam: "ജീവനക്കാരുടെ കൈപ്പുസ്തകം", views: 678, downloads: 145 },
    { title: "Customer Service Guide", titleMalayalam: "ഉപഭോക്തൃ സേവന ഗൈഡ്", views: 567, downloads: 123 },
  ]

  const kpiData = [
    {
      title: "Total Documents",
      titleMalayalam: "മൊത്തം ഡോക്യുമെന്റുകൾ",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: <FileText className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "AI Queries",
      titleMalayalam: "AI ചോദ്യങ്ങൾ",
      value: "15,234",
      change: "+28.3%",
      trend: "up",
      icon: <Bot className="h-6 w-6 text-green-600" />,
    },
    {
      title: "Active Users",
      titleMalayalam: "സജീവ ഉപയോക്താക്കൾ",
      value: "542",
      change: "+8.7%",
      trend: "up",
      icon: <Users className="h-6 w-6 text-purple-600" />,
    },
    {
      title: "System Efficiency",
      titleMalayalam: "സിസ്റ്റം കാര്യക്ഷമത",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: <Zap className="h-6 w-6 text-orange-600" />,
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
              <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link href="/documents" className="text-foreground hover:text-primary transition-colors">
                Documents
              </Link>
              <Link href="/search" className="text-foreground hover:text-primary transition-colors">
                Search
              </Link>
              <Link href="/analytics" className="text-primary font-medium">
                Analytics
              </Link>
              <Link href="/settings" className="text-foreground hover:text-primary transition-colors">
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-xl text-muted-foreground mb-1">അനലിറ്റിക്സ് ഡാഷ്ബോർഡ്</p>
          <p className="text-muted-foreground">
            Comprehensive insights into document usage, system performance, and user engagement.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                    <p className="text-xs text-muted-foreground mb-2">{kpi.titleMalayalam}</p>
                    <p className="text-3xl font-bold">{kpi.value}</p>
                    <p
                      className={`text-sm flex items-center ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}
                    >
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {kpi.change} from last month
                    </p>
                  </div>
                  <div className="float-animation">{kpi.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                  <CardDescription>മാസിക ട്രെൻഡുകൾ</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="documents" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="queries" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="users" stroke="#f59e0b" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Department Usage */}
              <Card>
                <CardHeader>
                  <CardTitle>Department Usage</CardTitle>
                  <CardDescription>വകുപ്പ് ഉപയോഗം</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Top Performing Documents
                </CardTitle>
                <CardDescription>മികച്ച പ്രകടനം കാഴ്ചവെക്കുന്ന ഡോക്യുമെന്റുകൾ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topDocuments.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{doc.title}</h4>
                          <p className="text-sm text-muted-foreground">{doc.titleMalayalam}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <span>{doc.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="h-4 w-4 text-muted-foreground" />
                          <span>{doc.downloads}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Document Types Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Document Types Distribution</CardTitle>
                  <CardDescription>ഡോക്യുമെന്റ് തരങ്ങളുടെ വിതരണം</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documentTypes.map((type, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{type.type}</span>
                          <span className="text-muted-foreground">{type.count} documents</span>
                        </div>
                        <Progress value={type.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Document Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Document Activity</CardTitle>
                  <CardDescription>ഡോക്യുമെന്റ് പ്രവർത്തനം</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="documents" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Document Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">2,847</p>
                      <p className="text-sm text-muted-foreground">Total Documents</p>
                      <p className="text-xs text-muted-foreground">മൊത്തം ഡോക്യുമെന്റുകൾ</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-sm text-muted-foreground">Added This Month</p>
                      <p className="text-xs text-muted-foreground">ഈ മാസം ചേർത്തത്</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <Activity className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold">89.3%</p>
                      <p className="text-sm text-muted-foreground">Utilization Rate</p>
                      <p className="text-xs text-muted-foreground">ഉപയോഗ നിരക്ക്</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>User Activity Trends</CardTitle>
                  <CardDescription>ഉപയോക്തൃ പ്രവർത്തന ട്രെൻഡുകൾ</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="users" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* User Engagement */}
              <Card>
                <CardHeader>
                  <CardTitle>User Engagement Metrics</CardTitle>
                  <CardDescription>ഉപയോക്തൃ ഇടപെടൽ മെട്രിക്സ്</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Daily Active Users</span>
                        <span>342 / 542</span>
                      </div>
                      <Progress value={63} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Weekly Active Users</span>
                        <span>489 / 542</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Monthly Active Users</span>
                        <span>542 / 542</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">542</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-xs text-muted-foreground">മൊത്തം ഉപയോക്താക്കൾ</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">342</p>
                  <p className="text-sm text-muted-foreground">Daily Active</p>
                  <p className="text-xs text-muted-foreground">ദൈനംദിന സജീവ</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-sm text-muted-foreground">AI Interactions</p>
                  <p className="text-xs text-muted-foreground">AI ഇടപെടലുകൾ</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">4.2h</p>
                  <p className="text-sm text-muted-foreground">Avg. Session</p>
                  <p className="text-xs text-muted-foreground">ശരാശരി സെഷൻ</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* System Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                      <p className="text-2xl font-bold">0.23s</p>
                      <p className="text-xs text-green-600">-15% faster</p>
                    </div>
                    <Zap className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Uptime</p>
                      <p className="text-2xl font-bold">99.9%</p>
                      <p className="text-xs text-green-600">+0.1% improved</p>
                    </div>
                    <Target className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">AI Accuracy</p>
                      <p className="text-2xl font-bold">94.2%</p>
                      <p className="text-xs text-green-600">+2.1% improved</p>
                    </div>
                    <Bot className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Error Rate</p>
                      <p className="text-2xl font-bold">0.8%</p>
                      <p className="text-xs text-red-600">+0.2% increased</p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Load</CardTitle>
                  <CardDescription>സിസ്റ്റം ലോഡ്</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CPU Usage</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Memory Usage</span>
                        <span>67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Storage Usage</span>
                        <span>34%</span>
                      </div>
                      <Progress value={34} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Network Usage</span>
                        <span>23%</span>
                      </div>
                      <Progress value={23} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Performance Metrics</CardTitle>
                  <CardDescription>AI പ്രകടന മെട്രിക്സ്</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Query Processing</span>
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
                        <span>Language Processing</span>
                        <span>91%</span>
                      </div>
                      <Progress value={91} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Response Accuracy</span>
                        <span>96%</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
