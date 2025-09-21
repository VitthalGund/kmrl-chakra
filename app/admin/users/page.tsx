"use client"

import { useState } from "react"
import {
  Train,
  Shield,
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  UserCheck,
  UserX,
  Calendar,
  Mail,
  Phone,
  Building,
  Activity,
  Download,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Mock user data
const mockUsers = [
  {
    id: "KMRL001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@kmrl.co.in",
    phone: "+91 9876543210",
    department: "Operations",
    role: "Admin",
    status: "Active",
    joinDate: "2023-01-15",
    lastLogin: "2025-01-20 14:30",
    documentsAccessed: 245,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "KMRL002",
    name: "Priya Nair",
    email: "priya.nair@kmrl.co.in",
    phone: "+91 9876543211",
    department: "Maintenance",
    role: "Manager",
    status: "Active",
    joinDate: "2023-03-20",
    lastLogin: "2025-01-20 12:15",
    documentsAccessed: 189,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "KMRL003",
    name: "Arjun Menon",
    email: "arjun.menon@kmrl.co.in",
    phone: "+91 9876543212",
    department: "Engineering",
    role: "User",
    status: "Active",
    joinDate: "2023-06-10",
    lastLogin: "2025-01-19 16:45",
    documentsAccessed: 156,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "KMRL004",
    name: "Sneha Pillai",
    email: "sneha.pillai@kmrl.co.in",
    phone: "+91 9876543213",
    department: "HR",
    role: "Manager",
    status: "Inactive",
    joinDate: "2023-02-28",
    lastLogin: "2025-01-15 10:20",
    documentsAccessed: 98,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "KMRL005",
    name: "Vishnu Prasad",
    email: "vishnu.prasad@kmrl.co.in",
    phone: "+91 9876543214",
    department: "Safety",
    role: "User",
    status: "Active",
    joinDate: "2023-08-12",
    lastLogin: "2025-01-20 09:30",
    documentsAccessed: 134,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "KMRL006",
    name: "Lakshmi Devi",
    email: "lakshmi.devi@kmrl.co.in",
    phone: "+91 9876543215",
    department: "Finance",
    role: "User",
    status: "Active",
    joinDate: "2023-04-05",
    lastLogin: "2025-01-20 11:45",
    documentsAccessed: 167,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const { toast } = useToast()

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || user.department === selectedDepartment
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus

    return matchesSearch && matchesDepartment && matchesRole && matchesStatus
  })

  const handleUserAction = (action: string, userId: string, userName: string) => {
    toast({
      title: "Action Completed",
      description: `${action} performed on user ${userName} (${userId})`,
    })
  }

  const totalUsers = mockUsers.length
  const activeUsers = mockUsers.filter((user) => user.status === "Active").length
  const inactiveUsers = mockUsers.filter((user) => user.status === "Inactive").length
  const adminUsers = mockUsers.filter((user) => user.role === "Admin").length

  return (
    <div className="min-h-screen bg-black text-gray-200">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Train className="h-8 w-8 text-green-500" />
              <span className="text-xl font-bold text-white">KMRL Chakra</span>
            </div>
            <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
              <Shield className="h-3 w-3 mr-1" />
              Admin Panel
            </Badge>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="/admin/analytics" className="text-gray-300 hover:text-white transition-colors">
              Analytics
            </a>
            <a href="/admin/documents" className="text-gray-300 hover:text-white transition-colors">
              Document Management
            </a>
            <a href="/admin/users" className="text-blue-400 font-medium">
              User Management
            </a>
          </nav>

          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400">
            Manage user accounts, permissions, and access controls for KMRL Chakra system.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalUsers}</div>
              <p className="text-xs text-gray-400">Registered in system</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Users</CardTitle>
              <UserCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{activeUsers}</div>
              <p className="text-xs text-gray-400">Currently active</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Inactive Users</CardTitle>
              <UserX className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{inactiveUsers}</div>
              <p className="text-xs text-gray-400">Temporarily disabled</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Admin Users</CardTitle>
              <Shield className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{adminUsers}</div>
              <p className="text-xs text-gray-400">With admin privileges</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, email, or employee ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="flex gap-2">
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Safety">Safety</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Users List</CardTitle>
                <CardDescription className="text-gray-400">
                  Showing {filteredUsers.length} of {totalUsers} users
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-800/70 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-gray-700 text-white">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">{user.name}</h3>
                        <Badge
                          variant={user.status === "Active" ? "default" : "secondary"}
                          className={
                            user.status === "Active"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : "bg-red-500/20 text-red-400 border-red-500/30"
                          }
                        >
                          {user.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            user.role === "Admin"
                              ? "border-purple-500/30 text-purple-400"
                              : user.role === "Manager"
                                ? "border-blue-500/30 text-blue-400"
                                : "border-gray-500/30 text-gray-400"
                          }
                        >
                          {user.role}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {user.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          {user.department}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Joined: {user.joinDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="h-3 w-3" />
                          Last login: {user.lastLogin}
                        </div>
                        <div>Documents accessed: {user.documentsAccessed}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUserAction("View", user.id, user.name)}
                      className="text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUserAction("Edit", user.id, user.name)}
                      className="text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-800 border-gray-700" align="end">
                        <DropdownMenuLabel className="text-gray-300">Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-700" />
                        <DropdownMenuItem
                          onClick={() => handleUserAction("Reset Password", user.id, user.name)}
                          className="text-gray-300 hover:bg-gray-700"
                        >
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUserAction("Change Role", user.id, user.name)}
                          className="text-gray-300 hover:bg-gray-700"
                        >
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUserAction("View Activity", user.id, user.name)}
                          className="text-gray-300 hover:bg-gray-700"
                        >
                          View Activity Log
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-700" />
                        <DropdownMenuItem
                          onClick={() => handleUserAction("Deactivate", user.id, user.name)}
                          className="text-red-400 hover:bg-red-500/20"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Deactivate User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
