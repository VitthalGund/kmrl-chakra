"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, Shield, BarChart3, CheckCircle, XCircle, TrendingUp, FileText, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { apiClient, type User } from "@/lib/api"
import {
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function AdminPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState<User[]>([])
  const [pendingUsers, setPendingUsers] = useState<User[]>([])
  const [analytics, setAnalytics] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedRole, setSelectedRole] = useState("")
  const [isApproveOpen, setIsApproveOpen] = useState(false)

  const [newRole, setNewRole] = useState({
    role_name: "",
    description: "",
    permissions: [] as string[],
  })

  const availablePermissions = [
    "read_documents",
    "write_documents",
    "delete_documents",
    "manage_users",
    "view_analytics",
    "create_notifications",
  ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [allUsers, pending, analyticsData] = await Promise.all([
        apiClient.getAdminUsers(),
        apiClient.getAdminUsers("pending"),
        apiClient.getAnalytics(),
      ])
      setUsers(allUsers)
      setPendingUsers(pending)
      setAnalytics(analyticsData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load admin data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async () => {
    if (!selectedUser || !selectedRole) return

    try {
      await apiClient.approveUser(selectedUser.id, selectedRole)
      toast({
        title: "Success",
        description: `User ${selectedUser.name} approved`,
      })
      setIsApproveOpen(false)
      setSelectedUser(null)
      setSelectedRole("")
      loadData()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve user",
        variant: "destructive",
      })
    }
  }

  const handleReject = async (userId: string) => {
    try {
      await apiClient.rejectUser(userId)
      toast({
        title: "Success",
        description: "User rejected",
      })
      loadData()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject user",
        variant: "destructive",
      })
    }
  }

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Success",
      description: `Role ${newRole.role_name} created`,
    })
    setNewRole({ role_name: "", description: "", permissions: [] })
  }

  const togglePermission = (permission: string) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }))
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  const COLORS = ["#0072b5", "#007a5e", "#6b63ff", "#b573f0", "#00264d"]

  return (
    <div className="h-full p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground">Manage users, roles, and view system analytics</p>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="users">
              <Users className="mr-2 h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="roles">
              <Shield className="mr-2 h-4 w-4" />
              Roles
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            {/* Pending Users */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals ({pendingUsers.length})</CardTitle>
                <CardDescription>Review and approve new user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingUsers.length === 0 ? (
                  <div className="flex h-32 items-center justify-center text-muted-foreground">
                    No pending approvals
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">Pending</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog
                                open={isApproveOpen && selectedUser?.id === user.id}
                                onOpenChange={setIsApproveOpen}
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    className="bg-gradient-success hover:opacity-90"
                                    onClick={() => setSelectedUser(user)}
                                  >
                                    <CheckCircle className="mr-1 h-3 w-3" />
                                    Approve
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Approve User</DialogTitle>
                                    <DialogDescription>Assign a role to {user.name}</DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <Label>Select Role</Label>
                                      <Select value={selectedRole} onValueChange={setSelectedRole}>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Choose a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="employee">Employee</SelectItem>
                                          <SelectItem value="manager">Manager</SelectItem>
                                          <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <Button
                                      onClick={handleApprove}
                                      className="w-full bg-gradient-metro hover:opacity-90"
                                      disabled={!selectedRole}
                                    >
                                      Approve User
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button size="sm" variant="destructive" onClick={() => handleReject(user.id)}>
                                <XCircle className="mr-1 h-3 w-3" />
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* All Users */}
            <Card>
              <CardHeader>
                <CardTitle>All Users ({users.length})</CardTitle>
                <CardDescription>View and manage all registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          <Badge className="bg-gradient-metro">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Role Management Tab */}
          <TabsContent value="roles" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Create Role */}
              <Card>
                <CardHeader>
                  <CardTitle>Create New Role</CardTitle>
                  <CardDescription>Define a new role with specific permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateRole} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="role-name">Role Name</Label>
                      <Input
                        id="role-name"
                        placeholder="e.g., Senior Manager"
                        value={newRole.role_name}
                        onChange={(e) => setNewRole({ ...newRole, role_name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role-description">Description</Label>
                      <Input
                        id="role-description"
                        placeholder="Brief description of the role"
                        value={newRole.description}
                        onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Permissions</Label>
                      <div className="space-y-2">
                        {availablePermissions.map((permission) => (
                          <div key={permission} className="flex items-center space-x-2">
                            <Checkbox
                              id={permission}
                              checked={newRole.permissions.includes(permission)}
                              onCheckedChange={() => togglePermission(permission)}
                            />
                            <Label htmlFor={permission} className="cursor-pointer text-sm font-normal">
                              {permission.replace(/_/g, " ")}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-gradient-metro hover:opacity-90">
                      Create Role
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Existing Roles */}
              <Card>
                <CardHeader>
                  <CardTitle>Existing Roles</CardTitle>
                  <CardDescription>Current roles and their permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Admin", "Manager", "Employee"].map((role) => (
                      <Card key={role}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{role}</h4>
                              <p className="text-xs text-muted-foreground">
                                {role === "Admin" && "Full system access"}
                                {role === "Manager" && "Department management"}
                                {role === "Employee" && "Basic access"}
                              </p>
                            </div>
                            <Badge className="bg-gradient-metro">{role}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics?.total_documents || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="mr-1 inline h-3 w-3 text-green-500" />
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics?.total_queries || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="mr-1 inline h-3 w-3 text-green-500" />
                    +8% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics?.active_users || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="mr-1 inline h-3 w-3 text-green-500" />
                    +5% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Department Distribution</CardTitle>
                  <CardDescription>Users by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Operations", value: 35 },
                          { name: "HR", value: 20 },
                          { name: "Finance", value: 25 },
                          { name: "IT", value: 20 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[0, 1, 2, 3].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                  <CardDescription>Query volume over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={[
                        { month: "Jan", queries: 120 },
                        { month: "Feb", queries: 150 },
                        { month: "Mar", queries: 180 },
                        { month: "Apr", queries: 220 },
                        { month: "May", queries: 250 },
                        { month: "Jun", queries: 280 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="queries" stroke="#0072b5" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
