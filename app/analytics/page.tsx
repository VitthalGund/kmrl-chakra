// "use client"

<<<<<<< HEAD
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   TrendingUp,
//   Users,
//   FileText,
//   Download,
//   Eye,
//   MessageSquare,
//   Clock,
//   Activity,
//   Train,
//   Bot,
//   Zap,
//   Target,
//   Award,
//   AlertCircle,
// } from "lucide-react"
// import Link from "next/link"
// import {
//   LineChart,
//   Line,
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts"

// export default function AnalyticsPage() {
//   const monthlyData = [
//     { month: "Jan", documents: 245, queries: 1200, users: 89 },
//     { month: "Feb", documents: 289, queries: 1450, users: 95 },
//     { month: "Mar", documents: 312, queries: 1680, users: 102 },
//     { month: "Apr", documents: 356, queries: 1890, users: 108 },
//     { month: "May", documents: 398, queries: 2100, users: 115 },
//     { month: "Jun", documents: 445, queries: 2350, users: 122 },
//   ]

//   const departmentData = [
//     { name: "Operations", value: 35, color: "#10b981" },
//     { name: "Maintenance", value: 25, color: "#3b82f6" },
//     { name: "Safety", value: 20, color: "#f59e0b" },
//     { name: "HR", value: 12, color: "#ef4444" },
//     { name: "Finance", value: 8, color: "#8b5cf6" },
//   ]

//   const documentTypes = [
//     { type: "Policies", count: 45, percentage: 30 },
//     { type: "Manuals", count: 38, percentage: 25 },
//     { type: "Reports", count: 32, percentage: 21 },
//     { type: "Training", count: 22, percentage: 15 },
//     { type: "Procedures", count: 13, percentage: 9 },
//   ]

//   const topDocuments = [
//     { title: "Safety Protocol 2025", titleMalayalam: "സുരക്ഷാ പ്രോട്ടോക്കോൾ 2025", views: 1250, downloads: 234 },
//     { title: "Emergency Response Plan", titleMalayalam: "അടിയന്തര പ്രതികരണ പദ്ധതി", views: 1156, downloads: 198 },
//     { title: "Train Maintenance Manual", titleMalayalam: "ട്രെയിൻ മെയിന്റനൻസ് മാനുവൽ", views: 890, downloads: 167 },
//     { title: "Employee Handbook", titleMalayalam: "ജീവനക്കാരുടെ കൈപ്പുസ്തകം", views: 678, downloads: 145 },
//     { title: "Customer Service Guide", titleMalayalam: "ഉപഭോക്തൃ സേവന ഗൈഡ്", views: 567, downloads: 123 },
//   ]

//   const kpiData = [
//     {
//       title: "Total Documents",
//       titleMalayalam: "മൊത്തം ഡോക്യുമെന്റുകൾ",
//       value: "2,847",
//       change: "+12.5%",
//       trend: "up",
//       icon: <FileText className="h-6 w-6 text-blue-600" />,
//     },
//     {
//       title: "AI Queries",
//       titleMalayalam: "AI ചോദ്യങ്ങൾ",
//       value: "15,234",
//       change: "+28.3%",
//       trend: "up",
//       icon: <Bot className="h-6 w-6 text-green-600" />,
//     },
//     {
//       title: "Active Users",
//       titleMalayalam: "സജീവ ഉപയോക്താക്കൾ",
//       value: "542",
//       change: "+8.7%",
//       trend: "up",
//       icon: <Users className="h-6 w-6 text-purple-600" />,
//     },
//     {
//       title: "System Efficiency",
//       titleMalayalam: "സിസ്റ്റം കാര്യക്ഷമത",
//       value: "94.2%",
//       change: "+2.1%",
//       trend: "up",
//       icon: <Zap className="h-6 w-6 text-orange-600" />,
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <Link href="/" className="flex items-center space-x-2">
//                 <Train className="h-6 w-6 text-primary" />
//                 <span className="font-bold text-lg">KMRL Chakra</span>
//               </Link>
//             </div>
//             <nav className="hidden md:flex items-center space-x-6">
//               <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
//                 Dashboard
//               </Link>
//               <Link href="/documents" className="text-foreground hover:text-primary transition-colors">
//                 Documents
//               </Link>
//               <Link href="/search" className="text-foreground hover:text-primary transition-colors">
//                 Search
//               </Link>
//               <Link href="/analytics" className="text-primary font-medium">
//                 Analytics
//               </Link>
//               <Link href="/settings" className="text-foreground hover:text-primary transition-colors">
//                 Settings
//               </Link>
//             </nav>
//             <Button asChild>
//               <Link href="/dashboard">Dashboard</Link>
//             </Button>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8">
//         {/* Page Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
//           <p className="text-xl text-muted-foreground mb-1">അനലിറ്റിക്സ് ഡാഷ്ബോർഡ്</p>
//           <p className="text-muted-foreground">
//             Comprehensive insights into document usage, system performance, and user engagement.
//           </p>
//         </div>

//         {/* KPI Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {kpiData.map((kpi, index) => (
//             <Card key={index} className="hover:shadow-lg transition-all duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
//                     <p className="text-xs text-muted-foreground mb-2">{kpi.titleMalayalam}</p>
//                     <p className="text-3xl font-bold">{kpi.value}</p>
//                     <p
//                       className={`text-sm flex items-center ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}
//                     >
//                       <TrendingUp className="h-4 w-4 mr-1" />
//                       {kpi.change} from last month
//                     </p>
//                   </div>
//                   <div className="float-animation">{kpi.icon}</div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <Tabs defaultValue="overview" className="space-y-6">
//           <TabsList className="grid w-full grid-cols-4">
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//             <TabsTrigger value="documents">Documents</TabsTrigger>
//             <TabsTrigger value="users">Users</TabsTrigger>
//             <TabsTrigger value="performance">Performance</TabsTrigger>
//           </TabsList>

//           <TabsContent value="overview" className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Monthly Trends */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Monthly Trends</CardTitle>
//                   <CardDescription>മാസിക ട്രെൻഡുകൾ</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={monthlyData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="month" />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Line type="monotone" dataKey="documents" stroke="#10b981" strokeWidth={2} />
//                       <Line type="monotone" dataKey="queries" stroke="#3b82f6" strokeWidth={2} />
//                       <Line type="monotone" dataKey="users" stroke="#f59e0b" strokeWidth={2} />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>

//               {/* Department Usage */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Department Usage</CardTitle>
//                   <CardDescription>വകുപ്പ് ഉപയോഗം</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <PieChart>
//                       <Pie
//                         data={departmentData}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                       >
//                         {departmentData.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Top Documents */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <Award className="h-5 w-5 mr-2" />
//                   Top Performing Documents
//                 </CardTitle>
//                 <CardDescription>മികച്ച പ്രകടനം കാഴ്ചവെക്കുന്ന ഡോക്യുമെന്റുകൾ</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {topDocuments.map((doc, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
//                     >
//                       <div className="flex items-center space-x-4">
//                         <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
//                           {index + 1}
//                         </div>
//                         <div>
//                           <h4 className="font-medium">{doc.title}</h4>
//                           <p className="text-sm text-muted-foreground">{doc.titleMalayalam}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-6 text-sm">
//                         <div className="flex items-center space-x-1">
//                           <Eye className="h-4 w-4 text-muted-foreground" />
//                           <span>{doc.views}</span>
//                         </div>
//                         <div className="flex items-center space-x-1">
//                           <Download className="h-4 w-4 text-muted-foreground" />
//                           <span>{doc.downloads}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="documents" className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Document Types Distribution */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Document Types Distribution</CardTitle>
//                   <CardDescription>ഡോക്യുമെന്റ് തരങ്ങളുടെ വിതരണം</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {documentTypes.map((type, index) => (
//                       <div key={index} className="space-y-2">
//                         <div className="flex justify-between text-sm">
//                           <span className="font-medium">{type.type}</span>
//                           <span className="text-muted-foreground">{type.count} documents</span>
//                         </div>
//                         <Progress value={type.percentage} className="h-2" />
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Document Activity */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Document Activity</CardTitle>
//                   <CardDescription>ഡോക്യുമെന്റ് പ്രവർത്തനം</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={monthlyData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="month" />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Bar dataKey="documents" fill="#10b981" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Document Insights */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-center space-x-3">
//                     <FileText className="h-8 w-8 text-blue-600" />
//                     <div>
//                       <p className="text-2xl font-bold">2,847</p>
//                       <p className="text-sm text-muted-foreground">Total Documents</p>
//                       <p className="text-xs text-muted-foreground">മൊത്തം ഡോക്യുമെന്റുകൾ</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-center space-x-3">
//                     <TrendingUp className="h-8 w-8 text-green-600" />
//                     <div>
//                       <p className="text-2xl font-bold">156</p>
//                       <p className="text-sm text-muted-foreground">Added This Month</p>
//                       <p className="text-xs text-muted-foreground">ഈ മാസം ചേർത്തത്</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-center space-x-3">
//                     <Activity className="h-8 w-8 text-orange-600" />
//                     <div>
//                       <p className="text-2xl font-bold">89.3%</p>
//                       <p className="text-sm text-muted-foreground">Utilization Rate</p>
//                       <p className="text-xs text-muted-foreground">ഉപയോഗ നിരക്ക്</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           <TabsContent value="users" className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* User Activity */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>User Activity Trends</CardTitle>
//                   <CardDescription>ഉപയോക്തൃ പ്രവർത്തന ട്രെൻഡുകൾ</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <AreaChart data={monthlyData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="month" />
//                       <YAxis />
//                       <Tooltip />
//                       <Area type="monotone" dataKey="users" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>

//               {/* User Engagement */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>User Engagement Metrics</CardTitle>
//                   <CardDescription>ഉപയോക്തൃ ഇടപെടൽ മെട്രിക്സ്</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-6">
//                     <div>
//                       <div className="flex justify-between text-sm mb-2">
//                         <span>Daily Active Users</span>
//                         <span>342 / 542</span>
//                       </div>
//                       <Progress value={63} className="h-2" />
//                     </div>
//                     <div>
//                       <div className="flex justify-between text-sm mb-2">
//                         <span>Weekly Active Users</span>
//                         <span>489 / 542</span>
//                       </div>
//                       <Progress value={90} className="h-2" />
//                     </div>
//                     <div>
//                       <div className="flex justify-between text-sm mb-2">
//                         <span>Monthly Active Users</span>
//                         <span>542 / 542</span>
//                       </div>
//                       <Progress value={100} className="h-2" />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* User Statistics */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               <Card>
//                 <CardContent className="p-6 text-center">
//                   <Users className="h-8 w-8 text-primary mx-auto mb-2" />
//                   <p className="text-2xl font-bold">542</p>
//                   <p className="text-sm text-muted-foreground">Total Users</p>
//                   <p className="text-xs text-muted-foreground">മൊത്തം ഉപയോക്താക്കൾ</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardContent className="p-6 text-center">
//                   <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
//                   <p className="text-2xl font-bold">342</p>
//                   <p className="text-sm text-muted-foreground">Daily Active</p>
//                   <p className="text-xs text-muted-foreground">ദൈനംദിന സജീവ</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardContent className="p-6 text-center">
//                   <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
//                   <p className="text-2xl font-bold">1,234</p>
//                   <p className="text-sm text-muted-foreground">AI Interactions</p>
//                   <p className="text-xs text-muted-foreground">AI ഇടപെടലുകൾ</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardContent className="p-6 text-center">
//                   <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
//                   <p className="text-2xl font-bold">4.2h</p>
//                   <p className="text-sm text-muted-foreground">Avg. Session</p>
//                   <p className="text-xs text-muted-foreground">ശരാശരി സെഷൻ</p>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           <TabsContent value="performance" className="space-y-6">
//             {/* System Performance */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm font-medium text-muted-foreground">Response Time</p>
//                       <p className="text-2xl font-bold">0.23s</p>
//                       <p className="text-xs text-green-600">-15% faster</p>
//                     </div>
//                     <Zap className="h-8 w-8 text-yellow-500" />
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm font-medium text-muted-foreground">Uptime</p>
//                       <p className="text-2xl font-bold">99.9%</p>
//                       <p className="text-xs text-green-600">+0.1% improved</p>
//                     </div>
//                     <Target className="h-8 w-8 text-green-500" />
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm font-medium text-muted-foreground">AI Accuracy</p>
//                       <p className="text-2xl font-bold">94.2%</p>
//                       <p className="text-xs text-green-600">+2.1% improved</p>
//                     </div>
//                     <Bot className="h-8 w-8 text-blue-500" />
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm font-medium text-muted-foreground">Error Rate</p>
//                       <p className="text-2xl font-bold">0.8%</p>
//                       <p className="text-xs text-red-600">+0.2% increased</p>
//                     </div>
//                     <AlertCircle className="h-8 w-8 text-red-500" />
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Performance Charts */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>System Load</CardTitle>
//                   <CardDescription>സിസ്റ്റം ലോഡ്</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div>
//                       <div className="flex justify-between text-sm mb-1">
//                         <span>CPU Usage</span>
//                         <span>45%</span>
//                       </div>
//                       <Progress value={45} className="h-2" />
//                     </div>
//                     <div>
//                       <div className="flex justify-between text-sm mb-1">
//                         <span>Memory Usage</span>
//                         <span>67%</span>
//                       </div>
//                       <Progress value={67} className="h-2" />
//                     </div>
//                     <div>
//                       <div className="flex justify-between text-sm mb-1">
//                         <span>Storage Usage</span>
//                         <span>34%</span>
//                       </div>
//                       <Progress value={34} className="h-2" />
//                     </div>
//                     <div>
//                       <div className="flex justify-between text-sm mb-1">
//                         <span>Network Usage</span>
//                         <span>23%</span>
//                       </div>
//                       <Progress value={23} className="h-2" />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>AI Performance Metrics</CardTitle>
//                   <CardDescription>AI പ്രകടന മെട്രിക്സ്</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div>
//                       <div className="flex justify-between text-sm mb-1">
//                         <span>Query Processing</span>
//                         <span>94%</span>
//                       </div>
//                       <Progress value={94} className="h-2" />
//                     </div>
//                     <div>
//                       <div className="flex justify-between text-sm mb-1">
//                         <span>Document Indexing</span>
//                         <span>87%</span>
//                       </div>
//                       <Progress value={87} className="h-2" />
//                     </div>
//                     <div>
//                       <div className="flex justify-between text-sm mb-1">
//                         <span>Language Processing</span>
//                         <span>91%</span>
//                       </div>
//                       <Progress value={91} className="h-2" />
//                     </div>
//                     <div>
//                       <div className="flex justify-between text-sm mb-1">
//                         <span>Response Accuracy</span>
//                         <span>96%</span>
//                       </div>
//                       <Progress value={96} className="h-2" />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// }

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
=======
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
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
<<<<<<< HEAD
} from "lucide-react";
import Link from "next/link";
=======
} from "lucide-react"
import Link from "next/link"
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
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
<<<<<<< HEAD
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
=======
} from "recharts"

export default function AnalyticsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("6months")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const monthlyData = [
    { month: "Jan", documents: 245, queries: 1200, users: 89, downloads: 456, searches: 890 },
    { month: "Feb", documents: 289, queries: 1450, users: 95, downloads: 523, searches: 1020 },
    { month: "Mar", documents: 312, queries: 1680, users: 102, downloads: 612, searches: 1180 },
    { month: "Apr", documents: 356, queries: 1890, users: 108, downloads: 698, searches: 1340 },
    { month: "May", documents: 398, queries: 2100, users: 115, downloads: 756, searches: 1520 },
    { month: "Jun", documents: 445, queries: 2350, users: 122, downloads: 834, searches: 1680 },
  ]
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413

  const departmentData = [
    { name: "Operations", value: 35, color: "#10b981", users: 45 },
    { name: "Maintenance", value: 25, color: "#3b82f6", users: 32 },
    { name: "Safety", value: 20, color: "#f59e0b", users: 28 },
    { name: "HR", value: 12, color: "#ef4444", users: 18 },
    { name: "Finance", value: 8, color: "#8b5cf6", users: 12 },
<<<<<<< HEAD
  ];
=======
  ]
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413

  const performanceData = [
    { name: "Response Time", value: 95, color: "#10b981" },
    { name: "Uptime", value: 99, color: "#3b82f6" },
    { name: "AI Accuracy", value: 94, color: "#f59e0b" },
    { name: "User Satisfaction", value: 92, color: "#8b5cf6" },
<<<<<<< HEAD
  ];
=======
  ]
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413

  const documentTypes = [
    { type: "Policies", count: 45, percentage: 30, trend: "+5%" },
    { type: "Manuals", count: 38, percentage: 25, trend: "+12%" },
    { type: "Reports", count: 32, percentage: 21, trend: "-2%" },
    { type: "Training", count: 22, percentage: 15, trend: "+8%" },
    { type: "Procedures", count: 13, percentage: 9, trend: "+3%" },
<<<<<<< HEAD
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
=======
  ]

  const topDocuments = [
    { title: "Safety Protocol 2025", views: 1250, downloads: 234, rating: 4.8 },
    { title: "Emergency Response Plan", views: 1156, downloads: 198, rating: 4.7 },
    { title: "Train Maintenance Manual", views: 890, downloads: 167, rating: 4.6 },
    { title: "Employee Handbook", views: 678, downloads: 145, rating: 4.5 },
    { title: "Customer Service Guide", views: 567, downloads: 123, rating: 4.4 },
  ]
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413

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
          <p className="text-sm font-medium text-gray-200">{`${label}`}</p>
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

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-200">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <Train className="h-6 w-6 text-primary" />
<<<<<<< HEAD
                <span className="font-bold text-lg text-gray-200">
                  KMRL Chakra
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/documents"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                Documents
              </Link>
              <Link
                href="/search"
                className="text-gray-300 hover:text-primary transition-colors"
              >
=======
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
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                Search
              </Link>
              <Link href="/analytics" className="text-primary font-medium">
                Analytics
              </Link>
<<<<<<< HEAD
              <Link
                href="/settings"
                className="text-gray-300 hover:text-primary transition-colors"
              >
=======
              <Link href="/settings" className="text-gray-300 hover:text-primary transition-colors">
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                Settings
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="bg-transparent border-gray-600 text-gray-300"
              >
<<<<<<< HEAD
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
=======
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
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
<<<<<<< HEAD
              <h1 className="text-3xl font-bold mb-2 text-gray-200">
                Analytics Dashboard
              </h1>
              <p className="text-gray-400">
                Comprehensive insights into document usage, system performance,
                and user engagement.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge
                variant="secondary"
                className="bg-green-500/20 text-green-400"
              >
=======
              <h1 className="text-3xl font-bold mb-2 text-gray-200">Analytics Dashboard</h1>
              <p className="text-gray-400">
                Comprehensive insights into document usage, system performance, and user engagement.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                <Activity className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="bg-card border border-border rounded-md px-3 py-2 text-sm text-gray-300"
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
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card border-border"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
<<<<<<< HEAD
                    <p className="text-sm font-medium text-gray-400">
                      {kpi.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-200 mt-1">
                      {kpi.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <p
                        className={`text-sm flex items-center ${
                          kpi.trend === "up" ? "text-green-400" : "text-red-400"
                        }`}
=======
                    <p className="text-sm font-medium text-gray-400">{kpi.title}</p>
                    <p className="text-3xl font-bold text-gray-200 mt-1">{kpi.value}</p>
                    <div className="flex items-center mt-2">
                      <p
                        className={`text-sm flex items-center ${kpi.trend === "up" ? "text-green-400" : "text-red-400"}`}
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                      >
                        {kpi.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {kpi.change}
                      </p>
                    </div>
<<<<<<< HEAD
                    <p className="text-xs text-gray-500 mt-1">
                      {kpi.description}
                    </p>
                  </div>
                  <div className="ml-4 p-3 bg-gray-800 rounded-lg">
                    {kpi.icon}
                  </div>
=======
                    <p className="text-xs text-gray-500 mt-1">{kpi.description}</p>
                  </div>
                  <div className="ml-4 p-3 bg-gray-800 rounded-lg">{kpi.icon}</div>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card border border-border">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Documents
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Users
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Enhanced Monthly Trends */}
              <Card className="bg-card border-border">
                <CardHeader>
<<<<<<< HEAD
                  <CardTitle className="text-gray-200">
                    Monthly Trends
                  </CardTitle>
=======
                  <CardTitle className="text-gray-200">Monthly Trends</CardTitle>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                  <CardDescription className="text-gray-400">
                    Document activity and user engagement over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="documents"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: "#10b981", strokeWidth: 2 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="queries"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: "#3b82f6", strokeWidth: 2 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#f59e0b"
                        strokeWidth={3}
                        dot={{ fill: "#f59e0b", strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: "#f59e0b", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Enhanced Department Usage */}
              <Card className="bg-card border-border">
                <CardHeader>
<<<<<<< HEAD
                  <CardTitle className="text-gray-200">
                    Department Usage Distribution
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Document access by department
                  </CardDescription>
=======
                  <CardTitle className="text-gray-200">Department Usage Distribution</CardTitle>
                  <CardDescription className="text-gray-400">Document access by department</CardDescription>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
<<<<<<< HEAD
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
=======
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        stroke="#1f2937"
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
            <Card className="bg-card border-border">
              <CardHeader>
<<<<<<< HEAD
                <CardTitle className="text-gray-200">
                  System Performance Overview
                </CardTitle>
                <CardDescription className="text-gray-400">
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
=======
                <CardTitle className="text-gray-200">System Performance Overview</CardTitle>
                <CardDescription className="text-gray-400">Key performance indicators at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={performanceData}>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                    <RadialBar
                      minAngle={15}
                      label={{ position: "insideStart", fill: "#fff" }}
                      background
                      clockWise
                      dataKey="value"
                    />
<<<<<<< HEAD
                    <Legend
                      iconSize={18}
                      layout="horizontal"
                      verticalAlign="bottom"
                    />
=======
                    <Legend iconSize={18} layout="horizontal" verticalAlign="bottom" />
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                    <Tooltip content={<CustomTooltip />} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Enhanced Top Documents */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-200">
                  <Award className="h-5 w-5 mr-2 text-yellow-500" />
                  Top Performing Documents
                </CardTitle>
<<<<<<< HEAD
                <CardDescription className="text-gray-400">
                  Most accessed and downloaded documents
                </CardDescription>
=======
                <CardDescription className="text-gray-400">Most accessed and downloaded documents</CardDescription>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topDocuments.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-gray-800/50 transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-full text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
<<<<<<< HEAD
                          <h4 className="font-medium text-gray-200">
                            {doc.title}
                          </h4>
=======
                          <h4 className="font-medium text-gray-200">{doc.title}</h4>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-3 h-3 rounded-full ${
<<<<<<< HEAD
                                    i < Math.floor(doc.rating)
                                      ? "bg-yellow-400"
                                      : "bg-gray-600"
=======
                                    i < Math.floor(doc.rating) ? "bg-yellow-400" : "bg-gray-600"
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                                  }`}
                                />
                              ))}
                            </div>
<<<<<<< HEAD
                            <span className="text-sm text-gray-400">
                              {doc.rating}
                            </span>
=======
                            <span className="text-sm text-gray-400">{doc.rating}</span>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
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
              <Card className="bg-card border-border">
                <CardHeader>
<<<<<<< HEAD
                  <CardTitle className="text-gray-200">
                    Document Types Distribution
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Breakdown by document category
                  </CardDescription>
=======
                  <CardTitle className="text-gray-200">Document Types Distribution</CardTitle>
                  <CardDescription className="text-gray-400">Breakdown by document category</CardDescription>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documentTypes.map((type, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
<<<<<<< HEAD
                          <span className="font-medium text-gray-200">
                            {type.type}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400">
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
=======
                          <span className="font-medium text-gray-200">{type.type}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400">{type.count} docs</span>
                            <Badge variant={type.trend.startsWith("+") ? "default" : "destructive"} className="text-xs">
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
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
              <Card className="bg-card border-border">
                <CardHeader>
<<<<<<< HEAD
                  <CardTitle className="text-gray-200">
                    Document Activity
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Monthly document additions and updates
                  </CardDescription>
=======
                  <CardTitle className="text-gray-200">Document Activity</CardTitle>
                  <CardDescription className="text-gray-400">Monthly document additions and updates</CardDescription>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
<<<<<<< HEAD
                      <Bar
                        dataKey="documents"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                        stroke="#065f46"
                        strokeWidth={1}
                      />
=======
                      <Bar dataKey="documents" fill="#10b981" radius={[4, 4, 0, 0]} stroke="#065f46" strokeWidth={1} />
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Document Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <FileText className="h-8 w-8 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-200">2,847</p>
                      <p className="text-sm text-gray-400">Total Documents</p>
<<<<<<< HEAD
                      <p className="text-xs text-green-400 mt-1">
                        +156 this month
                      </p>
=======
                      <p className="text-xs text-green-400 mt-1">+156 this month</p>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-green-500/20 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-200">156</p>
                      <p className="text-sm text-gray-400">Added This Month</p>
<<<<<<< HEAD
                      <p className="text-xs text-green-400 mt-1">
                        +12% vs last month
                      </p>
=======
                      <p className="text-xs text-green-400 mt-1">+12% vs last month</p>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-orange-500/20 rounded-lg">
                      <Activity className="h-8 w-8 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-200">89.3%</p>
                      <p className="text-sm text-gray-400">Utilization Rate</p>
<<<<<<< HEAD
                      <p className="text-xs text-green-400 mt-1">
                        +2.1% improvement
                      </p>
=======
                      <p className="text-xs text-green-400 mt-1">+2.1% improvement</p>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Enhanced User Activity */}
              <Card className="bg-card border-border">
                <CardHeader>
<<<<<<< HEAD
                  <CardTitle className="text-gray-200">
                    User Activity Trends
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Monthly active user growth
                  </CardDescription>
=======
                  <CardTitle className="text-gray-200">User Activity Trends</CardTitle>
                  <CardDescription className="text-gray-400">Monthly active user growth</CardDescription>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.3}
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Enhanced User Engagement */}
              <Card className="bg-card border-border">
                <CardHeader>
<<<<<<< HEAD
                  <CardTitle className="text-gray-200">
                    User Engagement Metrics
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Active user statistics
                  </CardDescription>
=======
                  <CardTitle className="text-gray-200">User Engagement Metrics</CardTitle>
                  <CardDescription className="text-gray-400">Active user statistics</CardDescription>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
<<<<<<< HEAD
                        <span className="text-gray-300">
                          Daily Active Users
                        </span>
                        <span className="text-gray-200 font-medium">
                          342 / 542
                        </span>
                      </div>
                      <Progress value={63} className="h-3" />
                      <p className="text-xs text-gray-500 mt-1">
                        63% engagement rate
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">
                          Weekly Active Users
                        </span>
                        <span className="text-gray-200 font-medium">
                          489 / 542
                        </span>
                      </div>
                      <Progress value={90} className="h-3" />
                      <p className="text-xs text-gray-500 mt-1">
                        90% engagement rate
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">
                          Monthly Active Users
                        </span>
                        <span className="text-gray-200 font-medium">
                          542 / 542
                        </span>
                      </div>
                      <Progress value={100} className="h-3" />
                      <p className="text-xs text-gray-500 mt-1">
                        100% engagement rate
                      </p>
=======
                        <span className="text-gray-300">Daily Active Users</span>
                        <span className="text-gray-200 font-medium">342 / 542</span>
                      </div>
                      <Progress value={63} className="h-3" />
                      <p className="text-xs text-gray-500 mt-1">63% engagement rate</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Weekly Active Users</span>
                        <span className="text-gray-200 font-medium">489 / 542</span>
                      </div>
                      <Progress value={90} className="h-3" />
                      <p className="text-xs text-gray-500 mt-1">90% engagement rate</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Monthly Active Users</span>
                        <span className="text-gray-200 font-medium">542 / 542</span>
                      </div>
                      <Progress value={100} className="h-3" />
                      <p className="text-xs text-gray-500 mt-1">100% engagement rate</p>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-primary/20 rounded-lg w-fit mx-auto mb-3">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-gray-200">542</p>
                  <p className="text-sm text-gray-400">Total Users</p>
                  <p className="text-xs text-green-400 mt-1">+8.7% growth</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-green-500/20 rounded-lg w-fit mx-auto mb-3">
                    <Activity className="h-8 w-8 text-green-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-200">342</p>
                  <p className="text-sm text-gray-400">Daily Active</p>
                  <p className="text-xs text-green-400 mt-1">+15% increase</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-blue-500/20 rounded-lg w-fit mx-auto mb-3">
                    <MessageSquare className="h-8 w-8 text-blue-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-200">1,234</p>
                  <p className="text-sm text-gray-400">AI Interactions</p>
                  <p className="text-xs text-green-400 mt-1">+28% increase</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-orange-500/20 rounded-lg w-fit mx-auto mb-3">
                    <Clock className="h-8 w-8 text-orange-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-200">4.2h</p>
                  <p className="text-sm text-gray-400">Avg. Session</p>
                  <p className="text-xs text-green-400 mt-1">+12% longer</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* System Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
<<<<<<< HEAD
                      <p className="text-sm font-medium text-gray-400">
                        Response Time
                      </p>
=======
                      <p className="text-sm font-medium text-gray-400">Response Time</p>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                      <p className="text-2xl font-bold text-gray-200">0.23s</p>
                      <p className="text-xs text-green-400">-15% faster</p>
                    </div>
                    <div className="p-3 bg-yellow-500/20 rounded-lg">
                      <Zap className="h-8 w-8 text-yellow-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
<<<<<<< HEAD
                      <p className="text-sm font-medium text-gray-400">
                        Uptime
                      </p>
=======
                      <p className="text-sm font-medium text-gray-400">Uptime</p>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                      <p className="text-2xl font-bold text-gray-200">99.9%</p>
                      <p className="text-xs text-green-400">+0.1% improved</p>
                    </div>
                    <div className="p-3 bg-green-500/20 rounded-lg">
                      <Target className="h-8 w-8 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
<<<<<<< HEAD
                      <p className="text-sm font-medium text-gray-400">
                        AI Accuracy
                      </p>
=======
                      <p className="text-sm font-medium text-gray-400">AI Accuracy</p>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                      <p className="text-2xl font-bold text-gray-200">94.2%</p>
                      <p className="text-xs text-green-400">+2.1% improved</p>
                    </div>
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <Bot className="h-8 w-8 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
<<<<<<< HEAD
                      <p className="text-sm font-medium text-gray-400">
                        Error Rate
                      </p>
=======
                      <p className="text-sm font-medium text-gray-400">Error Rate</p>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                      <p className="text-2xl font-bold text-gray-200">0.8%</p>
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
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-gray-200">System Load</CardTitle>
<<<<<<< HEAD
                  <CardDescription className="text-gray-400">
                    Real-time system resource usage
                  </CardDescription>
=======
                  <CardDescription className="text-gray-400">Real-time system resource usage</CardDescription>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">CPU Usage</span>
                        <span className="text-gray-200 font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-3" />
                      <p className="text-xs text-gray-500 mt-1">Normal load</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Memory Usage</span>
                        <span className="text-gray-200 font-medium">67%</span>
                      </div>
                      <Progress value={67} className="h-3" />
<<<<<<< HEAD
                      <p className="text-xs text-yellow-500 mt-1">
                        Moderate usage
                      </p>
=======
                      <p className="text-xs text-yellow-500 mt-1">Moderate usage</p>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Storage Usage</span>
                        <span className="text-gray-200 font-medium">34%</span>
                      </div>
                      <Progress value={34} className="h-3" />
                      <p className="text-xs text-green-500 mt-1">Low usage</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Network Usage</span>
                        <span className="text-gray-200 font-medium">23%</span>
                      </div>
                      <Progress value={23} className="h-3" />
                      <p className="text-xs text-green-500 mt-1">Low usage</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
<<<<<<< HEAD
                  <CardTitle className="text-gray-200">
                    AI Performance Metrics
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    AI system performance indicators
                  </CardDescription>
=======
                  <CardTitle className="text-gray-200">AI Performance Metrics</CardTitle>
                  <CardDescription className="text-gray-400">AI system performance indicators</CardDescription>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Query Processing</span>
                        <span className="text-gray-200 font-medium">94%</span>
                      </div>
                      <Progress value={94} className="h-3" />
<<<<<<< HEAD
                      <p className="text-xs text-green-500 mt-1">
                        Excellent performance
                      </p>
=======
                      <p className="text-xs text-green-500 mt-1">Excellent performance</p>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Document Indexing</span>
                        <span className="text-gray-200 font-medium">87%</span>
                      </div>
                      <Progress value={87} className="h-3" />
<<<<<<< HEAD
                      <p className="text-xs text-green-500 mt-1">
                        Good performance
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">
                          Language Processing
                        </span>
                        <span className="text-gray-200 font-medium">91%</span>
                      </div>
                      <Progress value={91} className="h-3" />
                      <p className="text-xs text-green-500 mt-1">
                        Very good performance
                      </p>
=======
                      <p className="text-xs text-green-500 mt-1">Good performance</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Language Processing</span>
                        <span className="text-gray-200 font-medium">91%</span>
                      </div>
                      <Progress value={91} className="h-3" />
                      <p className="text-xs text-green-500 mt-1">Very good performance</p>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Response Accuracy</span>
                        <span className="text-gray-200 font-medium">96%</span>
                      </div>
                      <Progress value={96} className="h-3" />
<<<<<<< HEAD
                      <p className="text-xs text-green-500 mt-1">
                        Outstanding accuracy
                      </p>
=======
                      <p className="text-xs text-green-500 mt-1">Outstanding accuracy</p>
>>>>>>> 3a180698cd7e533f2736ea3ce110f056ed105413
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
