"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Download,
  Eye,
  Filter,
  Grid,
  List,
  Calendar,
  User,
  Building,
  Search,
  Train,
  FolderOpen,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export default function DocumentsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const documents = [
    {
      id: 1,
      title: "Metro Safety Protocol 2025",
      department: "Operations",
      size: "2.4 MB",
      date: "2025-01-15",
      author: "Safety Team",
      downloads: 234,
      views: 1250,
      tags: ["safety", "protocol", "emergency"],
    },
    {
      id: 2,
      title: "Train Maintenance Manual",
      department: "Maintenance",
      size: "5.7 MB",
      date: "2025-01-14",
      author: "Maintenance Team",
      downloads: 189,
      views: 890,
      tags: ["maintenance", "manual", "trains"],
    },
    {
      id: 3,
      title: "Employee Handbook 2025",
      department: "HR",
      size: "3.2 MB",
      date: "2025-01-13",
      author: "HR Team",
      downloads: 156,
      views: 678,
      tags: ["hr", "handbook", "policies"],
    },
    {
      id: 4,
      title: "Emergency Response Plan",
      department: "Operations",
      size: "1.8 MB",
      date: "2025-01-12",
      author: "Emergency Team",
      downloads: 298,
      views: 1456,
      tags: ["emergency", "response", "safety"],
    },
    {
      id: 5,
      title: "Monthly Performance Report",
      department: "Management",
      size: "4.1 MB",
      date: "2025-01-11",
      author: "Analytics Team",
      downloads: 87,
      views: 432,
      tags: ["report", "performance", "analytics"],
    },
    {
      id: 6,
      title: "Training Module - Customer Service",
      department: "Training",
      size: "6.3 MB",
      date: "2025-01-10",
      author: "Training Team",
      downloads: 167,
      views: 723,
      tags: ["training", "customer-service", "module"],
    },
  ]

  const categories = [
    { name: "All Documents", count: documents.length, icon: <FileText className="h-4 w-4" /> },
    { name: "Policies", count: 12, icon: <CheckCircle className="h-4 w-4" /> },
    { name: "Manuals", count: 8, icon: <FolderOpen className="h-4 w-4" /> },
    { name: "Reports", count: 15, icon: <FileText className="h-4 w-4" /> },
    { name: "Training", count: 6, icon: <Star className="h-4 w-4" /> },
    { name: "Procedures", count: 9, icon: <AlertCircle className="h-4 w-4" /> },
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
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/documents" className="text-primary font-medium">
                Documents
              </Link>
              <Link href="/search" className="text-gray-300 hover:text-primary transition-colors">
                Search
              </Link>
              <Link href="/settings" className="text-gray-300 hover:text-primary transition-colors">
                Settings
              </Link>
            </nav>
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/search">
                <Search className="h-4 w-4 mr-2" />
                Search Documents
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-200">Document Management</h1>
          <p className="text-gray-400">Manage, organize, and access all your KMRL documents in one place.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-gray-200">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                    asChild
                  >
                    <Link href="/search">
                      <Search className="h-4 w-4 mr-2" />
                      Advanced Search
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Bulk Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-gray-200">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-between h-auto p-3 text-gray-300 hover:bg-gray-800"
                    >
                      <div className="flex items-center">
                        {category.icon}
                        <span className="ml-2">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                        {category.count}
                      </Badge>
                    </Button>
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
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-300">Safety Protocol updated</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-300">New training module added</p>
                      <p className="text-xs text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-300">Report generated</p>
                      <p className="text-xs text-gray-500">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <Card className="mb-6 bg-card border-border">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-card border-gray-600 text-gray-300"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-full md:w-48 bg-card border-gray-600 text-gray-300">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="safety">Safety</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      More Filters
                    </Button>
                    <span className="text-sm text-gray-400">{documents.length} documents found</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={
                        viewMode === "grid" ? "" : "bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                      }
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={
                        viewMode === "list" ? "" : "bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                      }
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {documents.map((doc) => (
                  <Card
                    key={doc.id}
                    className="hover:shadow-lg transition-all duration-300 group bg-card border-border"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <FileText className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-200">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-200">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-lg line-clamp-2 text-gray-200">{doc.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Size:</span>
                          <span className="text-gray-300">{doc.size}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Department:</span>
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {doc.department}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>{doc.views} views</span>
                          <span>{doc.downloads} downloads</span>
                        </div>
                        <div className="text-xs text-gray-500">Updated {doc.date}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {documents.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-all duration-300 bg-card border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <FileText className="h-8 w-8 text-primary" />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-200">{doc.title}</h3>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                              <span className="flex items-center">
                                <Building className="h-4 w-4 mr-1" />
                                {doc.department}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {doc.date}
                              </span>
                              <span className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {doc.author}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right text-sm">
                            <p className="text-gray-400">{doc.size}</p>
                            <p className="text-xs text-gray-500">{doc.views} views</p>
                            <p className="text-xs text-gray-500">{doc.downloads} downloads</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
