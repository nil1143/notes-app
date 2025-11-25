"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Note } from "@/db/schema";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Eye, Loader2, Pencil, Trash2, FileText } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteNote } from "@/server/notes";
import { NotePreviewModal } from "./note-preview-modal";

interface NoteCardProps {
  note: Note;
  notebookName: string;
}

export default function NoteCard({ note, notebookName }: NoteCardProps) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  if (!note) {
    return null;
  }

  //  Function to extract text from TipTap JSON
  const extractText = (content: unknown): string => {
    if (!content) return "No content";

    try {
      const getText = (obj: unknown): string => {
        if (typeof obj === "string") return obj;
        if (obj && typeof obj === "object" && "text" in obj) {
          return String(obj.text);
        }
        if (
          obj &&
          typeof obj === "object" &&
          "content" in obj &&
          Array.isArray(obj.content)
        ) {
          return obj.content.map(getText).join(" ");
        }
        return "";
      };

      const text = getText(content).trim();
      return text || "No content";
    } catch {
      return "No content";
    }
  };

  const textContent = note.content ? extractText(note.content) : "No content";
  const displayContent =
    textContent && textContent.length > 120
      ? textContent.slice(0, 120) + "..."
      : textContent;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteNote(note.id);

      if (response.success) {
        toast.success("Note deleted successfully");
        router.refresh();
      }
    } catch {
      toast.error("Failed to delete note");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const hasContent = Boolean(
    note.content && textContent && textContent !== "No content"
  );

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <Card className="max-w-[300px] group hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary/50 hover:border-l-primary relative overflow-hidden bg-gradient-to-br from-background to-muted/20">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full" />

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <FileText className="h-5 w-5 text-primary shrink-0" />
              <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {note.title || "Untitled Note"}
              </CardTitle>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {note.updatedAt ? formatDate(note.updatedAt) : "No date"}
          </p>
        </CardHeader>

        {/* <CardContent className="pb-3">
          <p className="text-sm text-muted-foreground line-clamp-3 min-h-[3.6rem]">
            {displayContent}
          </p>
        </CardContent> */}

        <CardFooter className="flex gap-2 pt-2 border-t">
          {hasContent && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPreviewOpen(true)}
              className="flex-1 gap-2 hover:bg-primary/10"
            >
              <Eye className="h-4 w-4" />
              View
            </Button>
          )}

          <Link
            href={`/dashboard/notebook/${note.notebookId}/note/${note.id}`}
            className="flex-1"
          >
            <Button
              variant="ghost"
              size="sm"
              className="w-full gap-2 hover:bg-primary/10"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
          </Link>

          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                disabled={isDeleting}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                {isDeleting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Trash2 className="size-4" />
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  note.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>

      {hasContent && (
        <NotePreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          title={note.title || "Untitled Note"}
          notebookName={notebookName}
          createdAt={note.createdAt ? new Date(note.createdAt) : new Date()}
          updatedAt={note.updatedAt ? new Date(note.updatedAt) : new Date()}
          content={note.content as any}
        />
      )}
    </>
  );
}
