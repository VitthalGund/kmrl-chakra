"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
  RefreshCw,
  TrendingDown,
} from "lucide-react";
import Link from "next/link";
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
  RadialBarChart,
  RadialBar,
} from "recharts";

export default function AnalyticsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("6months");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const monthlyData = [
    {
      month: "Jan",
      documents: 245,
      queries: 1200,
      users: 89,
      downloads: 456,
      searches: 890,
    },
    {
      month: "Feb",
      documents: 289,
      queries: 1450,
      users: 95,
      downloads: 523,
      searches: 1020,
    },
    {
      month: "Mar",
      documents: 312,
      queries: 1680,
      users: 102,
      downloads: 612,
      searches: 1180,
    },
    {
      month: "Apr",
      documents: 356,
      queries: 1890,
      users: 108,
      downloads: 698,
      searches: 1340,
    },
    {
      month: "May",
      documents: 398,
      queries: 2100,
      users: 115,
      downloads: 756,
      searches: 1520,
    },
    {
      month: "Jun",
      documents: 445,
      queries: 2350,
      users: 122,
      downloads: 834,
      searches: 1680,
    },
  ];

  const departmentData = [
    { name: "Operations", value: 35, color: "var(--chart-1)", users: 45 },
    { name: "Maintenance", value: 25, color: "var(--chart-2)", users: 32 },
    { name: "Safety", value: 20, color: "var(--chart-3)", users: 28 },
    { name: "HR", value: 12, color: "var(--chart-4)", users: 18 },
    { name: "Finance", value: 8, color: "var(--chart-5)", users: 12 },
  ];

  const performanceData = [
    { name: "Response Time", value: 95, color: "var(--chart-1)" },
    { name: "Uptime", value: 99, color: "var(--chart-2)" },
    { name: "AI Accuracy", value: 94, color: "var(--chart-3)" },
    { name: "User Satisfaction", value: 92, color: "var(--chart-4)" },
  ];

  const documentTypes = [
    { type: "Policies", count: 45, percentage: 30, trend: "+5%" },
    { type: "Manuals", count: 38, percentage: 25, trend: "+12%" },
    { type: "Reports", count: 32, percentage: 21, trend: "-2%" },
    { type: "Training", count: 22, percentage: 15, trend: "+8%" },
    { type: "Procedures", count: 13, percentage: 9, trend: "+3%" },
  ];

  const topDocuments = [
    { title: "Safety Protocol 2025", views: 1250, downloads: 234, rating: 4.8 },
    {
      title: "Emergency Response Plan",
      views: 1156,
      downloads: 198,
      rating: 4.7,
    },
    {
      title: "Train Maintenance Manual",
      views: 890,
      downloads: 167,
      rating: 4.6,
    },
    { title: "Employee Handbook", views: 678, downloads: 145, rating: 4.5 },
    {
      title: "Customer Service Guide",
      views: 567,
      downloads: 123,
      rating: 4.4,
    },
  ];

  const kpiData = [
    {
      title: "Total Documents",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      description: "Active documents in system",
    },
    {
      title: "AI Queries",
      value: "15,234",
      change: "+28.3%",
      trend: "up",
      icon: <Bot className="h-6 w-6 text-green-600" />,
      description: "Processed this month",
    },
    {
      title: "Active Users",
      value: "542",
      change: "+8.7%",
      trend: "up",
      icon: <Users className="h-6 w-6 text-purple-600" />,
      description: "Monthly active users",
    },
    {
      title: "System Efficiency",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: <Zap className="h-6 w-6 text-orange-600" />,
      description: "Overall performance",
    },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-muted-foreground">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <Train className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg text-foreground">
                  KMRL Chakra
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/documents"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Documents
              </Link>
              <Link
                href="/search"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Search
              </Link>
              <Link href="/analytics" className="text-primary font-medium">
                Analytics
              </Link>
              <Link
                href="/settings"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Settings
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
                Refresh
              </Button>
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-foreground">
                Analytics Dashboard
              </h1>
              <p className="text-muted-foreground">
                Comprehensive insights into document usage, system performance,
                and user engagement.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary">
                <Activity className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="bg-card border border-border rounded-md px-3 py-2 text-sm text-muted-foreground"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="6months">Last 6 months</option>
                <option value="1year">Last year</option>
              </select>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {kpi.title}
                    </p>
                    <p className="text-3xl font-bold text-foreground mt-1">
                      {kpi.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <p
                        className={`text-sm flex items-center ${
                          kpi.trend === "up" ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {kpi.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {kpi.change}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground/50 mt-1">
                      {kpi.description}
                    </p>
                  </div>
                  <div className="ml-4 p-3 bg-muted rounded-lg">{kpi.icon}</div>
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
              {/* Enhanced Monthly Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Monthly Trends
                  </CardTitle>
                  <CardDescription>
                    Document activity and user engagement over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                      />
                      <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                      <YAxis stroke="var(--muted-foreground)" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="documents"
                        stroke="var(--chart-1)"
                        strokeWidth={3}
                        dot={{ fill: "var(--chart-1)", strokeWidth: 2, r: 6 }}
                        activeDot={{
                          r: 8,
                          stroke: "var(--chart-1)",
                          strokeWidth: 2,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="queries"
                        stroke="var(--chart-2)"
                        strokeWidth={3}
                        dot={{ fill: "var(--chart-2)", strokeWidth: 2, r: 6 }}
                        activeDot={{
                          r: 8,
                          stroke: "var(--chart-2)",
                          strokeWidth: 2,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="var(--chart-3)"
                        strokeWidth={3}
                        dot={{ fill: "var(--chart-3)", strokeWidth: 2, r: 6 }}
                        activeDot={{
                          r: 8,
                          stroke: "var(--chart-3)",
                          strokeWidth: 2,
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Enhanced Department Usage */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Department Usage Distribution
                  </CardTitle>
                  <CardDescription>
                    Document access by department
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        stroke="var(--card)"
                        strokeWidth={2}
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Performance Radial Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">
                  System Performance Overview
                </CardTitle>
                <CardDescription>
                  Key performance indicators at a glance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="20%"
                    outerRadius="90%"
                    data={performanceData}
                  >
                    <RadialBar
                      minAngle={15}
                      label={{ position: "insideStart", fill: "#fff" }}
                      background
                      clockWise
                      dataKey="value"
                    />
                    <Legend
                      iconSize={18}
                      layout="horizontal"
                      verticalAlign="bottom"
                    />
                    <Tooltip content={<CustomTooltip />} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Enhanced Top Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Award className="h-5 w-5 mr-2 text-yellow-500" />
                  Top Performing Documents
                </CardTitle>
                <CardDescription>
                  Most accessed and downloaded documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topDocuments.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-full text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">
                            {doc.title}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-3 h-3 rounded-full ${
                                    i < Math.floor(doc.rating)
                                      ? "bg-yellow-400"
                                      : "bg-muted-foreground/50"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {doc.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-1 text-blue-400">
                          <Eye className="h-4 w-4" />
                          <span>{doc.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-green-400">
                          <Download className="h-4 w-4" />
                          <span>{doc.downloads.toLocaleString()}</span>
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
              {/* Enhanced Document Types Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Document Types Distribution
                  </CardTitle>
                  <CardDescription>
                    Breakdown by document category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documentTypes.map((type, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium text-foreground">
                            {type.type}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground">
                              {type.count} docs
                            </span>
                            <Badge
                              variant={
                                type.trend.startsWith("+")
                                  ? "default"
                                  : "destructive"
                              }
                              className="text-xs"
                            >
                              {type.trend}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={type.percentage} className="h-3" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Document Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Document Activity
                  </CardTitle>
                  <CardDescription>
                    Monthly document additions and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                      />
                      <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                      <YAxis stroke="var(--muted-foreground)" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar
                        dataKey="documents"
                        fill="var(--chart-1)"
                        radius={[4, 4, 0, 0]}
                        stroke="var(--chart-1)"
                        strokeWidth={1}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Document Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <FileText className="h-8 w-8 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        2,847
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total Documents
                      </p>
                      <p className="text-xs text-green-400 mt-1">
                        +156 this month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-green-500/20 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">156</p>
                      <p className="text-sm text-muted-foreground">
                        Added This Month
                      </p>
                      <p className="text-xs text-green-400 mt-1">
                        +12% vs last month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-orange-500/20 rounded-lg">
                      <Activity className="h-8 w-8 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        89.3%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Utilization Rate
                      </p>
                      <p className="text-xs text-green-400 mt-1">
                        +2.1% improvement
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Enhanced User Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">
                    User Activity Trends
                  </CardTitle>
                  <CardDescription>Monthly active user growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                      />
                      <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                      <YAxis stroke="var(--muted-foreground)" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stroke="var(--chart-2)"
                        fill="var(--chart-2)"
                        fillOpacity={0.3}
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Enhanced User Engagement */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">
                    User Engagement Metrics
                  </CardTitle>
                  <CardDescription>Active user statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                          Daily Active Users
                        </span>
                        <span className="text-foreground font-medium">
                          342 / 542
                        </span>
                      </div>
                      <Progress value={63} className="h-3" />
                      <p className="text-xs text-muted-foreground/50 mt-1">
                        63% engagement rate
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                          Weekly Active Users
                        </span>
                        <span className="text-foreground font-medium">
                          489 / 542
                        </span>
                      </div>
                      <Progress value={90} className="h-3" />
                      <p className="text-xs text-muted-foreground/50 mt-1">
                        90% engagement rate
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                          Monthly Active Users
                        </span>
                        <span className="text-foreground font-medium">
                          542 / 542
                        </span>
                      </div>
                      <Progress value={100} className="h-3" />
                      <p className="text-xs text-muted-foreground/50 mt-1">
                        100% engagement rate
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-primary/20 rounded-lg w-fit mx-auto mb-3">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">542</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-xs text-green-400 mt-1">+8.7% growth</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-green-500/20 rounded-lg w-fit mx-auto mb-3">
                    <Activity className="h-8 w-8 text-green-400" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">342</p>
                  <p className="text-sm text-muted-foreground">Daily Active</p>
                  <p className="text-xs text-green-400 mt-1">+15% increase</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-blue-500/20 rounded-lg w-fit mx-auto mb-3">
                    <MessageSquare className="h-8 w-8 text-blue-400" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">1,234</p>
                  <p className="text-sm text-muted-foreground">
                    AI Interactions
                  </p>
                  <p className="text-xs text-green-400 mt-1">+28% increase</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-orange-500/20 rounded-lg w-fit mx-auto mb-3">
                    <Clock className="h-8 w-8 text-orange-400" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">4.2h</p>
                  <p className="text-sm text-muted-foreground">Avg. Session</p>
                  <p className="text-xs text-green-400 mt-1">+12% longer</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* System Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Response Time
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        0.23s
                      </p>
                      <p className="text-xs text-green-400">-15% faster</p>
                    </div>
                    <div className="p-3 bg-yellow-500/20 rounded-lg">
                      <Zap className="h-8 w-8 text-yellow-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Uptime
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        99.9%
                      </p>
                      <p className="text-xs text-green-400">+0.1% improved</p>
                    </div>
                    <div className="p-3 bg-green-500/20 rounded-lg">
                      <Target className="h-8 w-8 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        AI Accuracy
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        94.2%
                      </p>
                      <p className="text-xs text-green-400">+2.1% improved</p>
                    </div>
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <Bot className="h-8 w-8 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Error Rate
                      </p>
                      <p className="text-2xl font-bold text-foreground">0.8%</p>
                      <p className="text-xs text-red-400">+0.2% increased</p>
                    </div>
                    <div className="p-3 bg-red-500/20 rounded-lg">
                      <AlertCircle className="h-8 w-8 text-red-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">System Load</CardTitle>
                  <CardDescription>
                    Real-time system resource usage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">CPU Usage</span>
                        <span className="text-foreground font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-3" />
                      <p className="text-xs text-muted-foreground/50 mt-1">
                        Normal load
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">
                          Memory Usage
                        </span>
                        <span className="text-foreground font-medium">67%</span>
                      </div>
                      <Progress value={67} className="h-3" />
                      <p className="text-xs text-yellow-500 mt-1">
                        Moderate usage
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">
                          Storage Usage
                        </span>
                        <span className="text-foreground font-medium">34%</span>
                      </div>
                      <Progress value={34} className="h-3" />
                      <p className="text-xs text-green-500 mt-1">Low usage</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">
                          Network Usage
                        </span>
                        <span className="text-foreground font-medium">23%</span>
                      </div>
                      <Progress value={23} className="h-3" />
                      <p className="text-xs text-green-500 mt-1">Low usage</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">
                    AI Performance Metrics
                  </CardTitle>
                  <CardDescription>
                    AI system performance indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">
                          Query Processing
                        </span>
                        <span className="text-foreground font-medium">94%</span>
                      </div>
                      <Progress value={94} className="h-3" />
                      <p className="text-xs text-green-500 mt-1">
                        Excellent performance
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">
                          Document Indexing
                        </span>
                        <span className="text-foreground font-medium">87%</span>
                      </div>
                      <Progress value={87} className="h-3" />
                      <p className="text-xs text-green-500 mt-1">
                        Good performance
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">
                          Language Processing
                        </span>
                        <span className="text-foreground font-medium">91%</span>
                      </div>
                      <Progress value={91} className="h-3" />
                      <p className="text-xs text-green-500 mt-1">
                        Very good performance
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">
                          Response Accuracy
                        </span>
                        <span className="text-foreground font-medium">96%</span>
                      </div>
                      <Progress value={96} className="h-3" />
                      <p className="text-xs text-green-500 mt-1">
                        Outstanding accuracy
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
