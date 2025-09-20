"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Upload,
  Download,
  Eye,
  Edit,
  Trash2,
  Filter,
  Search,
  Plus,
  Train,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function AdminDocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const documents = [
    {
      id: 1,
      title: "Metro Safety Protocol 2025",
      department: "Operations",
      size: "2.4 MB",
      date: "2025-01-15",
      author: "Safety Team",
      status: "Active",
      downloads: 234,
      views: 1250,
      lastModified: "2025-01-15 14:30",
    },
    {
      id: 2,
      title: "Train Maintenance Manual",
      department: "Maintenance",
      size: "5.7 MB",
      date: "2025-01-14",
      author: "Maintenance Team",
      status: "Active",
      downloads: 189,
      views: 890,
      lastModified: "2025-01-14 09:15",
    },
    {
      id: 3,
      title: "Employee Handbook 2025",
      department: "HR",
      size: "3.2 MB",
      date: "2025-01-13",
      author: "HR Team",
      status: "Draft",
      downloads: 156,
      views: 678,
      lastModified: "2025-01-13 16:45",
    },
    {
      id: 4,
      title: "Emergency Response Plan",
      department: "Operations",
      size: "1.8 MB",
      date: "2025-01-12",
      author: "Emergency Team",
      status: "Active",
      downloads: 298,
      views: 1456,
      lastModified: "2025-01-12 11:20",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-600 text-white"
      case "Draft":
        return "bg-yellow-600 text-white"
      case "Archived":
        return "bg-gray-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-3 w-3" />
      case "Draft":
        return <Clock className="h-3 w-3" />
      case "Archived":
        return <AlertTriangle className="h-3 w-3" />
      default:
        return <AlertTriangle className="h-3 w-3" />
    }
  }

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
              <Link href="/admin/analytics" className="text-gray-300 hover:text-primary transition-colors">
                Analytics
              </Link>
              <Link href="/admin/documents" className="text-primary font-medium">
                Document Management
              </Link>
              <Link href="/admin/users" className="text-gray-300 hover:text-primary transition-colors">
                User Management
              </Link>
            </nav>
            <Button className="bg-primary hover:bg-primary/90">
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-200">Document Management</h1>
          <p className="text-gray-400">Upload, manage, and organize all KMRL documents</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Documents</p>
                  <p className="text-2xl font-bold text-gray-200">2,847</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Pending Review</p>
                  <p className="text-2xl font-bold text-gray-200">23</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Storage Used</p>
                  <p className="text-2xl font-bold text-gray-200">1.2 TB</p>
                </div>
                <Upload className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Active Users</p>
                  <p className="text-2xl font-bold text-gray-200">89</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

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
              <Select>
                <SelectTrigger className="w-full md:w-48 bg-card border-gray-600 text-gray-300">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
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
                  Advanced Filters
                </Button>
                <span className="text-sm text-gray-400">{documents.length} documents found</span>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Document
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Documents Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-gray-200">All Documents</CardTitle>
            <CardDescription className="text-gray-400">Manage and organize your document library</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <FileText className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-200">{doc.title}</h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                        <span>{doc.department}</span>
                        <span>{doc.size}</span>
                        <span>{doc.author}</span>
                        <span>Modified: {doc.lastModified}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right text-sm">
                      <p className="text-gray-400">{doc.views} views</p>
                      <p className="text-xs text-gray-500">{doc.downloads} downloads</p>
                    </div>
                    <Badge className={`text-xs flex items-center gap-1 ${getStatusColor(doc.status)}`}>
                      {getStatusIcon(doc.status)}
                      {doc.status}
                    </Badge>
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
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-red-600 text-red-400 hover:bg-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
