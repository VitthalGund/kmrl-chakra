"use client";

import { useState, useEffect } from "react";
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
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
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
import { toast } from "sonner";
import { apiClient, User } from "@/lib/api"; // CORRECTED IMPORT
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function AdminUsersPage() {
  const {
    user: currentUser,
    isAuthenticated,
    isLoading: authLoading,
  } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // State for filters and pagination
  const [filters, setFilters] = useState({
    status: "all",
    role: "all",
    department: "all",
  });
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 5,
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const statusFilter =
        filters.status !== "all" ? filters.status : undefined;
      // CORRECTED API CALL: Using apiClient and passing filters correctly
      const response = await apiClient.getAdminUsers(statusFilter);
      // NOTE: The current backend doesn't support full filtering and pagination for this endpoint yet.
      // This frontend code is ready for when it does. We will simulate for now.
      setUsers(response.users);
      setTotalUsers(response.total);
    } catch (error) {
      toast.error("Failed to fetch users", {
        description: "There was an error connecting to the server.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated, filters, pagination]);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || currentUser?.role !== "Admin") {
        toast.error("Access Denied", {
          description: "You must be an admin to view this page.",
        });
        router.push("/dashboard");
      }
    }
  }, [authLoading, isAuthenticated, currentUser, router]);

  const handleUserAction = async (
    action: "approve" | "reject",
    userEmail: string,
    userName: string
  ) => {
    const toastId = toast.loading(`Processing action for ${userName}...`);
    try {
      if (action === "approve") {
        await apiClient.approveUser(userEmail, "User"); // CORRECTED API CALL
      } else {
        await apiClient.rejectUser(userEmail); // CORRECTED API CALL
      }
      toast.success(
        `${action.charAt(0).toUpperCase() + action.slice(1)} successful`,
        {
          id: toastId,
          description: `User ${userName} has been ${action}d.`,
        }
      );
      fetchUsers(); // Refresh the user list
    } catch (error) {
      toast.error(`Failed to ${action} user`, {
        id: toastId,
        description: "An error occurred. Please try again.",
      });
    }
  };

  if (authLoading || !isAuthenticated || currentUser?.role !== "Admin") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const totalPages = Math.ceil(totalUsers / pagination.limit);
  const currentPage = pagination.skip / pagination.limit + 1;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Train className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">
              KMRL Chakra
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard/admin"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Analytics
            </Link>
            <Link
              href="/dashboard/documents"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Document Management
            </Link>
            <Link
              href="/dashboard/admin/users"
              className="text-primary font-medium"
            >
              User Management
            </Link>
          </nav>

          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            User Management
          </h1>
          <p className="text-muted-foreground">
            Manage user accounts, permissions, and access controls for the KMRL
            Chakra system.
          </p>
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
                <Input placeholder="Search by name, email, or employee ID... (Feature coming soon)" />
              </div>

              <div className="flex gap-2">
                <Select
                  value={filters.department}
                  onValueChange={(value) =>
                    setFilters({ ...filters, department: value })
                  }
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.role}
                  onValueChange={(value) =>
                    setFilters({ ...filters, role: value })
                  }
                >
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
                  value={filters.status}
                  onValueChange={(value) =>
                    setFilters({ ...filters, status: value })
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
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
                  Showing {users.length} of {totalUsers} users
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-4">
                {users.length > 0 ? (
                  users.map((user) => (
                    <div
                      key={user.email}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
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
                                user.status === "active"
                                  ? "default"
                                  : user.status === "pending"
                                  ? "secondary"
                                  : "destructive"
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
                              <Building className="h-3 w-3" />
                              {user.department}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {user.status === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-green-500 text-green-500 hover:bg-green-500/10 hover:text-green-400"
                              onClick={() =>
                                handleUserAction(
                                  "approve",
                                  user.email,
                                  user.name
                                )
                              }
                            >
                              <UserCheck className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-500 text-red-500 hover:bg-red-500/10 hover:text-red-400"
                              onClick={() =>
                                handleUserAction(
                                  "reject",
                                  user.email,
                                  user.name
                                )
                              }
                            >
                              <UserX className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Reset Password</DropdownMenuItem>
                            <DropdownMenuItem>Change Role</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Deactivate User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 text-muted-foreground">
                    <p>No users found matching your criteria.</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
