"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, FileWarning } from "lucide-react";
import Markdown from "react-markdown";

interface DocPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  source: {
    id: string;
    file_name: string;
    storage_url?: string;
    file_type?: string;
    context?: string;
  } | null;
}

export function DocPreview({ isOpen, onClose, source }: DocPreviewProps) {
  if (!source) return null;

  const renderContent = () => {
    if (!source.storage_url && !source.context) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
          <FileWarning className="h-16 w-16 mb-4" />
          <p className="text-lg font-semibold">No Preview Available</p>
          <p>A storage URL for this document has not been provided.</p>
        </div>
      );
    }
    if (source.context) {
      return (
        <div className="flex flex-col items-center justify-start text-muted-foreground">
          <Markdown>{source.context}</Markdown>
        </div>
      );
    }

    const isImage = source.file_type?.startsWith("image/");
    const isPdf = source.file_type === "application/pdf";

    if (isImage) {
      return (
        <img
          src={source.storage_url}
          alt={source.file_name}
          className="max-w-full max-h-full object-contain"
        />
      );
    }

    if (isPdf) {
      return (
        <iframe
          src={source.storage_url}
          className="w-full h-full"
          title={source.file_name}
        />
      );
    }

    // Fallback for other file types like docx, pptx, etc.
    return (
      <div className="flex flex-col items-center justify-start h-full text-muted-foreground">
        <FileWarning className="h-16 w-16 mb-4" />
        <p className="text-lg font-semibold">Direct Preview Not Supported</p>
        <p>You can download the file to view it.</p>
        <a
          href={source.storage_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-primary hover:underline"
        >
          Download {source.file_name}
        </a>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="truncate">
            {source.context ? "Content" : source.file_name}
          </DialogTitle>
        </DialogHeader>
        <div
          className={`flex-grow flex justify-center ${
            source.context ? "items-start" : "items-center"
          } overflow-auto`}
        >
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
