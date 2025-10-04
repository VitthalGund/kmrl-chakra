"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Search, FileText, Filter, Train, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiClient, type Document } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function DocumentsPage() {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [uploadData, setUploadData] = useState({
    file: null as File | null,
    category: "",
    department: "",
    tags: "",
    access_roles: "employee",
  });

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const data = await apiClient.getDocuments();
      setDocuments(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadData.file) {
      toast({
        title: "Error",
        description: "Please select a file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", uploadData.file);
      formData.append("category", uploadData.category);
      formData.append("department", uploadData.department);
      formData.append("tags", uploadData.tags);
      formData.append("access_roles", uploadData.access_roles);

      await apiClient.uploadDocument(formData);

      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });

      setIsUploadOpen(false);
      setUploadData({
        file: null,
        category: "",
        department: "",
        tags: "",
        access_roles: "employee",
      });
      loadDocuments();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
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
              className="text-primary font-medium"
            >
              Document Management
            </Link>
            <Link
              href="/dashboard/admin/users"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              User Management
            </Link>
          </nav>

          <Button variant="outline" asChild>
            <Link href="/dashboard">Exit Admin</Link>
          </Button>
        </div>
      </header>
      <div className="h-full p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Documents</h1>
              <p className="text-muted-foreground">
                Manage and access KMRL documents
              </p>
            </div>
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-metro hover:opacity-90">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload Document</DialogTitle>
                  <DialogDescription>
                    Add a new document to the knowledge base
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUpload} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="file">File</Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={(e) =>
                        setUploadData({
                          ...uploadData,
                          file: e.target.files?.[0] || null,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      placeholder="e.g., Policy, Procedure, Manual"
                      value={uploadData.category}
                      onChange={(e) =>
                        setUploadData({
                          ...uploadData,
                          category: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      placeholder="e.g., Operations, HR, Finance"
                      value={uploadData.department}
                      onChange={(e) =>
                        setUploadData({
                          ...uploadData,
                          department: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      placeholder="e.g., safety, training, guidelines"
                      value={uploadData.tags}
                      onChange={(e) =>
                        setUploadData({ ...uploadData, tags: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="access_roles">Access Level</Label>
                    <Select
                      value={uploadData.access_roles}
                      onValueChange={(value) =>
                        setUploadData({ ...uploadData, access_roles: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-metro hover:opacity-90"
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading..." : "Upload"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Documents Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Documents ({filteredDocuments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
              ) : filteredDocuments.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center text-center">
                  <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-lg font-medium">No documents found</p>
                  <p className="text-sm text-muted-foreground">
                    Upload your first document to get started
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Filename</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead>Uploaded</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            {doc.filename}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{doc.category}</Badge>
                        </TableCell>
                        <TableCell>{doc.department}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {doc.tags.slice(0, 3).map((tag, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(doc.uploaded_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
