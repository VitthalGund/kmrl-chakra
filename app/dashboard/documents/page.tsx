"use client";

import { useState, useEffect } from "react";
import {
  Search,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  Calendar,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { apiClient, Document } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { format } from "date-fns";

export default function DocumentsPage() {
  const { isAuthenticated } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [filters, setFilters] = useState({
    department: "all",
    category: "all",
  });
  const [pagination, setPagination] = useState({ skip: 0, limit: 8 });

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!isAuthenticated) return;
      setIsLoading(true);
      try {
        const response = await apiClient.getDocuments({
          skip: pagination.skip,
          limit: pagination.limit,
          department:
            filters.department !== "all" ? filters.department : undefined,
          category: filters.category !== "all" ? filters.category : undefined,
        });
        setDocuments(response.documents);
        setTotalDocuments(response.total);
      } catch (error) {
        toast.error("Failed to fetch documents.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, [isAuthenticated, filters, pagination]);

  const totalPages =
    totalDocuments > 0 ? Math.ceil(totalDocuments / pagination.limit) : 1;
  const currentPage =
    totalDocuments > 0 ? pagination.skip / pagination.limit + 1 : 1;

  const DocumentCard = ({ doc }: { doc: Document }) => (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <FileText className="h-8 w-8 text-primary" />
          <Badge variant="outline">{doc.category}</Badge>
        </div>
        <CardTitle className="pt-4 text-lg truncate">{doc.filename}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4" />
          <span>{doc.department}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(doc.uploaded_at), "PPP")}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="p-6 space-y-6 flex flex-col h-full">
      <div className="flex-shrink-0 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Document Library
          </h1>
          <p className="text-muted-foreground">
            Browse and manage all documents in the KMRL knowledge base.
          </p>
        </div>
        <Card>
          <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-10" />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Select
                value={filters.department}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, department: value }))
                }
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.category}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                  <SelectItem value="Report">Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-muted p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-5 w-5" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex-grow">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : documents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {documents.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground h-full flex flex-col justify-center items-center">
            <p className="text-lg font-semibold">No documents found.</p>
            <p>Try adjusting your filters or uploading a new document.</p>
          </div>
        )}
      </div>

      <div className="flex-shrink-0 pt-6 flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          Showing {pagination.skip + 1} -{" "}
          {Math.min(pagination.skip + pagination.limit, totalDocuments)} of{" "}
          {totalDocuments} documents
        </span>
        <div className="flex items-center space-x-2">
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
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                skip: prev.skip + prev.limit,
              }))
            }
            disabled={currentPage >= totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
