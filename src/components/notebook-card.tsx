"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Notebook } from "@/db/schema";
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
import { BookOpen, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteNotebook } from "@/server/notebooks";

interface NotebookCardProps {
  notebook: Notebook & { notes: { id: string }[] };
}

export default function NotebookCard({ notebook }: NotebookCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteNotebook(notebook.id);

      if (response.success) {
        toast.success("Notebook deleted successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete notebook");
      }
    } catch {
      toast.error("Failed to delete notebook");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const noteCount = notebook.notes?.length || 0;
  return (
    <Card className="flex flex-col items-center justify-between p-4 gap-2 hover:shadow-lg transition-shadow min-h-[220px] max-w-[300px] bg-gradient-to-br from-background to-muted/40">
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="bg-muted rounded-full p-3 mb-2">
          <BookOpen className="h-7 w-7 text-primary" />
        </div>
        <CardTitle className="text-center w-full">{notebook.name}</CardTitle>
        <p className="text-xs text-muted-foreground text-center">
          {noteCount} {noteCount === 1 ? "note" : "notes"}
        </p>
      </div>
      <div className="flex w-full gap-2 mt-4">
        <Link href={`/dashboard/notebook/${notebook.id}`} className="flex-1">
          <Button variant="default" size="sm" className="w-full">
            Open
          </Button>
        </Link>
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="w-10"
              disabled={isDeleting}
              aria-label="Delete notebook"
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
                notebook and all of its notes.
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
      </div>
    </Card>
  );
}