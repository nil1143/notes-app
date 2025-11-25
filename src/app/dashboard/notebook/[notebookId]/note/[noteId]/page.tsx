import { PageWrapper } from "@/components/page-wrapper";
import RichTextEditor from "@/components/rich-text-editor";
import { getNoteById } from "@/server/notes";
import { JSONContent } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Params = Promise<{
  noteId: string;
  notebookId: string;
}>;

export default async function NotePage({ params }: { params: Params }) {
  const { noteId, notebookId } = await params;
  const { note } = await getNoteById(noteId);

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        {
          label: note.notebook?.name ?? "Notebook",
          href: `/dashboard/notebook/${note.notebook?.id}`,
        },
        { label: note.title ?? "Note", href: `/dashboard/note/${noteId}` },
      ]}
    >
      <div className="space-y-4">
        <RichTextEditor
          content={note.content as JSONContent[]}
          noteId={noteId}
        />
        
        <div className="flex justify-end">
          <Link href={`/dashboard/notebook/${notebookId}`}>
            <Button size="lg" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Save & Return to Notebook
            </Button>
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
