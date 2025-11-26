"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Link from "@tiptap/extension-link";
import { JSONContent } from "@tiptap/react";
import { useEffect } from "react";

interface NotePreviewCardProps {
  title: string;
  notebookName: string;
  createdAt: Date;
  updatedAt: Date;
  content: JSONContent | JSONContent[];
}

export function NotePreview({
  title,
  createdAt,
  updatedAt,
  content,
}: NotePreviewCardProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Superscript,
      Subscript,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-4 cursor-pointer",
        },
      }),
    ],
    content: content,
    editable: false,
    immediatelyRender: false,
    onCreate: ({ editor }) => {
      editor.commands.setContent(content);
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <Card className="max-w-4xl max-h-[90vh] flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Created: {createdAt.toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Updated: {updatedAt.toLocaleDateString()}
                </span>
              </div>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto prose prose-neutral dark:prose-invert max-w-none pr-4 mt-4">
        <EditorContent
          editor={editor}
          className="[&_.ProseMirror]:outline-none 
            [&_.ProseMirror_h1]:text-3xl 
            [&_.ProseMirror_h1]:font-bold 
            [&_.ProseMirror_h1]:mb-4 
            [&_.ProseMirror_h2]:text-2xl 
            [&_.ProseMirror_h2]:font-bold 
            [&_.ProseMirror_h2]:mb-3 
            [&_.ProseMirror_h3]:text-xl 
            [&_.ProseMirror_h3]:font-bold 
            [&_.ProseMirror_h3]:mb-2 
            [&_.ProseMirror_p]:mb-4 
            [&_.ProseMirror_ul]:list-disc 
            [&_.ProseMirror_ul]:ml-6
            [&_.ProseMirror_ul]:mb-4 
            [&_.ProseMirror_ol]:list-decimal 
            [&_.ProseMirror_ol]:ml-6
            [&_.ProseMirror_ol]:mb-4 
            [&_.ProseMirror_li]:mb-1
            [&_.ProseMirror_blockquote]:border-l-4 
            [&_.ProseMirror_blockquote]:border-border 
            [&_.ProseMirror_blockquote]:pl-4 
            [&_.ProseMirror_blockquote]:italic 
            [&_.ProseMirror_pre]:bg-muted 
            [&_.ProseMirror_pre]:p-4 
            [&_.ProseMirror_pre]:rounded 
            [&_.ProseMirror_pre]:overflow-x-auto 
            [&_.ProseMirror_code]:bg-muted 
            [&_.ProseMirror_code]:px-1 
            [&_.ProseMirror_code]:rounded"
        />
      </CardContent>
    </Card>
  );
}