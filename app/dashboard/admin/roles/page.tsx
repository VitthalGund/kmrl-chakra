"use client";

import { useState, useEffect } from "react";
import { Shield, Plus, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { apiClient } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

interface Role {
  role_name: string;
  description: string;
  permissions: string[];
}

const ALL_PERMISSIONS = [
  "document:upload",
  "document:read:own_department",
  "document:read:all",
  "notification:broadcast",
  "user:approve",
  "user:manage",
  "role:manage",
];

export default function AdminRolesPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");
  const [newRolePermissions, setNewRolePermissions] = useState<string[]>([]);

  const fetchRoles = async () => {
    setIsLoading(true);
    try {
      const { data } = await apiClient.axios.get("/admin/roles");
      setRoles(data);
    } catch {
      toast.error("Failed to fetch roles.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || user?.role !== "Admin") {
        toast.error("Access Denied.");
        router.push("/dashboard/documents");
      } else {
        fetchRoles();
      }
    }
  }, [authLoading, isAuthenticated, user, router]);

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setNewRolePermissions((prev) =>
      checked ? [...prev, permission] : prev.filter((p) => p !== permission)
    );
  };

  const handleCreateRole = async () => {
    if (!newRoleName || !newRoleDesc) {
      toast.warning("Role Name and Description are required.");
      return;
    }

    const toastId = toast.loading("Creating new role...");
    try {
      await apiClient.axios.post("/admin/roles", {
        role_name: newRoleName,
        description: newRoleDesc,
        permissions: newRolePermissions,
      });
      toast.success("Role created successfully!", { id: toastId });
      fetchRoles(); // Refresh the list
      setIsDialogOpen(false); // Close the dialog
      setNewRoleName("");
      setNewRoleDesc("");
      setNewRolePermissions([]); // Reset form
    } catch (error) {
      toast.error("Failed to create role.", { id: toastId });
    }
  };

  if (authLoading || !user || user.role !== "Admin") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Role Management
        </h1>
        <p className="text-muted-foreground">
          Define user roles and their permissions across the platform.
        </p>
      </div>

      <Card className="p-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Existing Roles</CardTitle>
            <CardDescription>
              List of all defined roles in the system.
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Role
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Role</DialogTitle>
                <DialogDescription>
                  Define a new role and select its permissions.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input
                  placeholder="Role Name (e.g., Auditor)"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                />
                <Input
                  placeholder="Brief description of the role"
                  value={newRoleDesc}
                  onChange={(e) => setNewRoleDesc(e.target.value)}
                />
                <h4 className="font-medium">Permissions</h4>
                <div className="grid grid-cols-2 gap-4">
                  {ALL_PERMISSIONS.map((permission) => (
                    <div
                      key={permission}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={permission}
                        onCheckedChange={(checked) =>
                          handlePermissionChange(permission, !!checked)
                        }
                      />
                      <label
                        htmlFor={permission}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {permission}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateRole}>Create Role</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.role_name}>
                    <TableCell className="font-medium">
                      {role.role_name}
                    </TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {role.permissions.join(", ")}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={role.role_name === "Admin"}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
