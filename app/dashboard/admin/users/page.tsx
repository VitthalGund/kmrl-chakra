// app/dashboard/admin/users/page.tsx

"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Building,
  MoreHorizontal,
  UserCheck,
  UserX,
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Search,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { apiClient, User } from "@/lib/api";
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

  const [filters, setFilters] = useState({
    status: "all",
    role: "all",
    department: "all",
  });
  const [pagination, setPagination] = useState({ skip: 0, limit: 10 });

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const statusFilter =
        filters.status !== "all" ? filters.status : undefined;
      const response = await apiClient.getAdminUsers(statusFilter);
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
    if (isAuthenticated) fetchUsers();
  }, [isAuthenticated, filters, pagination]);

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || currentUser?.role !== "Admin")) {
      toast.error("Access Denied", {
        description: "You must be an admin to view this page.",
      });
      router.push("/dashboard");
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
        await apiClient.approveUser(userEmail, "User");
      } else {
        await apiClient.rejectUser(userEmail);
      }
      toast.success(
        `${action.charAt(0).toUpperCase() + action.slice(1)} successful`,
        { id: toastId, description: `User ${userName} has been ${action}d.` }
      );
      fetchUsers();
    } catch (error) {
      toast.error(`Failed to ${action} user`, {
        id: toastId,
        description: "An error occurred. Please try again.",
      });
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const totalPages = Math.ceil(totalUsers / pagination.limit);
  const currentPage = pagination.skip / pagination.limit + 1;

  return (
    <div className="p-6 space-y-6 flex flex-col h-full">
      <div className="flex-shrink-0 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            User Management
          </h1>
          <p className="text-muted-foreground">
            Manage user accounts, permissions, and access controls.
          </p>
        </div>

        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input placeholder="Search by name or email... (Feature coming soon)" />
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
      </div>

      <div className="flex-grow">
        <Card className="p-6">
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
                              handleUserAction("approve", user.email, user.name)
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
                              handleUserAction("reject", user.email, user.name)
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
          </CardContent>
        </Card>
      </div>

      <div className="flex-shrink-0 pt-6 flex justify-end items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              skip: Math.max(0, prev.skip - prev.limit),
            }))
          }
          disabled={pagination.skip === 0}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setPagination((prev) => ({ ...prev, skip: prev.skip + prev.limit }))
          }
          disabled={currentPage >= totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
