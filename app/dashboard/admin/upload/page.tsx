"use client";

import { useState, useEffect } from "react";
import { Upload, FileText, Link as LinkIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { apiClient } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function AdminUploadPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("General");
  const [department, setDepartment] = useState("Public");

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || user?.role !== "Admin") {
        toast.error("Access Denied", {
          description: "You do not have permission to access this page.",
        });
        router.push("/dashboard/documents");
      }
    }
  }, [authLoading, isAuthenticated, user, router]);

  const handleUpload = async (type: "file" | "text" | "url") => {
    setIsLoading(true);
    const toastId = toast.loading(`Ingesting ${type}...`);

    try {
      let response;
      const formData = new FormData();
      formData.append("category", category);
      formData.append("department", department);
      formData.append("tags", "admin-upload"); // Example tag

      if (type === "file" && file) {
        formData.append("file", file);
        response = await apiClient.axios.post(
          "/api/v1/documents/upload-file",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else if (type === "text" && text) {
        formData.append("text_content", text);
        formData.append(
          "source_name",
          `Text Upload - ${new Date().toISOString()}`
        );
        response = await apiClient.axios.post(
          "/api/v1/documents/upload-text",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else if (type === "url" && url) {
        formData.append("url", url);
        response = await apiClient.axios.post(
          "/api/v1/documents/upload-url",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        throw new Error("No content provided.");
      }

      toast.success("Ingestion successful!", {
        id: toastId,
        description: response.data.message,
      });
      // Reset forms
      setFile(null);
      setText("");
      setUrl("");
    } catch (error: any) {
      toast.error("Ingestion failed.", {
        id: toastId,
        description: error.message || "An unknown error occurred.",
      });
    } finally {
      setIsLoading(false);
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
          Admin - Add Knowledge
        </h1>
        <p className="text-muted-foreground">
          Ingest new documents, text, or web content into the system.
        </p>
      </div>

      <Tabs defaultValue="file">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="file">
            <FileText className="mr-2 h-4 w-4" />
            File
          </TabsTrigger>
          <TabsTrigger value="text">
            <Input className="mr-2 h-4 w-4" />
            Text
          </TabsTrigger>
          <TabsTrigger value="url">
            <LinkIcon className="mr-2 h-4 w-4" />
            URL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="file">
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Upload a File</CardTitle>
              <CardDescription>
                Upload PDF, DOCX, TXT, or image files.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="file"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
                className="file:text-primary file:font-medium"
              />
              <div className="flex gap-4">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Report">Report</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Public">Public</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() => handleUpload("file")}
                disabled={isLoading || !file}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                Ingest File
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text">
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Paste Text</CardTitle>
              <CardDescription>
                Ingest raw text content directly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your text content here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={10}
              />
              <div className="flex gap-4">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="FAQ">FAQ</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Public">Public</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() => handleUpload("text")}
                disabled={isLoading || !text}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                Ingest Text
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="url">
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Ingest from URL</CardTitle>
              <CardDescription>
                Scrape a webpage or download a file from a URL.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="https://example.com/document.pdf"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <div className="flex gap-4">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Web Content">Web Content</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() => handleUpload("url")}
                disabled={isLoading || !url}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                Ingest from URL
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
