"use client";

import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

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
];

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { toast } = useToast();

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || user.department === selectedDepartment;
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;

    return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
  });

  const handleUserAction = (
    action: string,
    userId: string,
    userName: string
  ) => {
    toast({
      title: "Action Completed",
      description: `${action} performed on user ${userName} (${userId})`,
    });
  };

  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(
    (user) => user.status === "Active"
  ).length;
  const inactiveUsers = mockUsers.filter(
    (user) => user.status === "Inactive"
  ).length;
  const adminUsers = mockUsers.filter((user) => user.role === "Admin").length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Train className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                KMRL Chakra
              </span>
            </div>
            <Badge variant="destructive">
              <Shield className="h-3 w-3 mr-1" />
              Admin Panel
            </Badge>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a
              href="/admin/analytics"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Analytics
            </a>
            <a
              href="/admin/documents"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Document Management
            </a>
            <a href="/admin/users" className="text-primary font-medium">
              User Management
            </a>
          </nav>

          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            User Management
          </h1>
          <p className="text-muted-foreground">
            Manage user accounts, permissions, and access controls for KMRL
            Chakra system.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {totalUsers}
              </div>
              <p className="text-xs text-muted-foreground">
                Registered in system
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Users
              </CardTitle>
              <UserCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {activeUsers}
              </div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Inactive Users
              </CardTitle>
              <UserX className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {inactiveUsers}
              </div>
              <p className="text-xs text-muted-foreground">
                Temporarily disabled
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Admin Users
              </CardTitle>
              <Shield className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {adminUsers}
              </div>
              <p className="text-xs text-muted-foreground">
                With admin privileges
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
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
                />
              </div>

              <div className="flex gap-2">
                <Select
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
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
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
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
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Users List</CardTitle>
                <CardDescription>
                  Showing {filteredUsers.length} of {totalUsers} users
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
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
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                      />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">
                          {user.name}
                        </h3>
                        <Badge
                          variant={
                            user.status === "Active" ? "default" : "destructive"
                          }
                        >
                          {user.status}
                        </Badge>
                        <Badge variant="outline">{user.role}</Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
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

                      <div className="flex items-center gap-4 text-xs text-muted-foreground/50">
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
                      onClick={() =>
                        handleUserAction("View", user.id, user.name)
                      }
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleUserAction("Edit", user.id, user.name)
                      }
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            handleUserAction(
                              "Reset Password",
                              user.id,
                              user.name
                            )
                          }
                        >
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleUserAction("Change Role", user.id, user.name)
                          }
                        >
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleUserAction(
                              "View Activity",
                              user.id,
                              user.name
                            )
                          }
                        >
                          View Activity Log
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            handleUserAction("Deactivate", user.id, user.name)
                          }
                          className="text-destructive"
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
  );
}
