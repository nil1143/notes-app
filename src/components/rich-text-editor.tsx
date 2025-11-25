"use client";

import {
  useEditor,
  EditorContent,
  useEditorState,
  type JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Link from "@tiptap/extension-link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Strikethrough,
  Code,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Plus,
  ChevronDown,
  Superscript as SuperscriptIcon,
  Subscript as SubscriptIcon,
} from "lucide-react";
import { updateNote } from "@/server/notes";
import { useCallback } from "react";

interface RichTextEditorProps {
  content?: JSONContent[];
  noteId?: string;
}

const RichTextEditor = ({ content, noteId }: RichTextEditorProps) => {
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
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-4 cursor-pointer",
        },
      }),
    ],
    immediatelyRender: false,
    autofocus: true,
    editable: true,
    injectCSS: false,
    onUpdate: ({ editor }) => {
      if (noteId) {
        const content = editor.getJSON();
        updateNote(noteId, { content });
      }
    },
    content: content ?? {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Getting Started with Notes App" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "App Notes is your powerful, developer-friendly ",
            },
            {
              type: "text",
              text: "rich text editor",
              marks: [{ type: "italic" }],
            },
            { type: "text", text: " built for speed and simplicity." },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "It integrates open-source UI components and modern TipTap extensions - all MIT licensed - so you can build, write and ship faster.",
            },
          ],
        },
        {
          type: "codeBlock",
          content: [{ type: "text", text: "pnpm notes-app" }],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Features" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Fast and fully responsive editor.",
              marks: [{ type: "bold" }],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Supports **markdown** shortcuts and slash commands.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Use keyboard shortcuts like " },
            { type: "text", text: "⌘+B", marks: [{ type: "code" }] },
            { type: "text", text: " for most common markdown marks." },
          ],
        },
      ],
    },
  });

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor) return {};
      return {
        isBold: ctx.editor?.isActive("bold"),
        canBold: ctx.editor?.can().chain().focus().toggleBold().run(),
        isItalic: ctx.editor?.isActive("italic"),
        canItalic: ctx.editor?.can().chain().focus().toggleItalic().run(),
        isStrike: ctx.editor?.isActive("strike"),
        canStrike: ctx.editor?.can().chain().focus().toggleStrike().run(),
        isCode: ctx.editor?.isActive("code"),
        canCode: ctx.editor?.can().chain().focus().toggleCode().run(),
        isUnderline: ctx.editor?.isActive("underline"),
        canUnderline: ctx.editor?.can().chain().focus().toggleUnderline().run(),
        isLink: ctx.editor?.isActive("link"),
        isSuperscript: ctx.editor?.isActive("superscript"),
        isSubscript: ctx.editor?.isActive("subscript"),
        isParagraph: ctx.editor?.isActive("paragraph"),
        isHeading1: ctx.editor?.isActive("heading", { level: 1 }),
        isHeading2: ctx.editor?.isActive("heading", { level: 2 }),
        isHeading3: ctx.editor?.isActive("heading", { level: 3 }),
        isBulletList: ctx.editor?.isActive("bulletList"),
        isOrderedList: ctx.editor?.isActive("orderedList"),
        isCodeBlock: ctx.editor?.isActive("codeBlock"),
        isBlockquote: ctx.editor?.isActive("blockquote"),
        isAlignLeft: ctx.editor?.isActive({ textAlign: "left" }),
        isAlignCenter: ctx.editor?.isActive({ textAlign: "center" }),
        isAlignRight: ctx.editor?.isActive({ textAlign: "right" }),
        isAlignJustify: ctx.editor?.isActive({ textAlign: "justify" }),
        canUndo: ctx.editor?.can().chain().focus().undo().run(),
        canRedo: ctx.editor?.can().chain().focus().redo().run(),
      };
    },
  });

  const getActiveHeading = () => {
    if (editorState?.isHeading1) return "H1";
    if (editorState?.isHeading2) return "H2";
    if (editorState?.isHeading3) return "H3";
    return "P";
  };

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);
// ...existing code...

  return (
    <div className="w-full bg-card text-card-foreground rounded-lg overflow-hidden border">
      {/* Toolbar - Organized in rows */}
      <div className="p-1.5 sm:p-2 bg-muted/50 border-b space-y-1 sm:space-y-0">
        {/* Row 1: Undo/Redo, Heading, Lists - Mobile */}
        <div className="flex items-center justify-center gap-0.5 sm:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editorState?.canUndo}
            className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editorState?.canRedo}
            className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Redo className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent gap-1"
              >
                {getActiveHeading()}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-popover border">
              <DropdownMenuItem
                onClick={() => editor?.chain().focus().setParagraph().run()}
                className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Paragraph
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Heading 1
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Heading 2
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Heading 3
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="w-px h-6 bg-border mx-1" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isBulletList
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isOrderedList
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>

        {/* Row 2: Text Formatting - Mobile */}
        <div className="flex items-center justify-center gap-0.5 sm:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            disabled={!editorState?.canBold}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isBold
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            disabled={!editorState?.canItalic}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isItalic
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            disabled={!editorState?.canStrike}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isStrike
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleCode().run()}
            disabled={!editorState?.canCode}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isCode
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Code className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            disabled={!editorState?.canUnderline}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isUnderline
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Row 3: Link, Super/Subscript - Mobile */}
        <div className="flex items-center justify-center gap-0.5 sm:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={setLink}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isLink
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleSuperscript().run()}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isSuperscript
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <SuperscriptIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleSubscript().run()}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isSubscript
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <SubscriptIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Row 4: Alignment - Mobile */}
        <div className="flex items-center justify-center gap-0.5 sm:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().setTextAlign("left").run()}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isAlignLeft
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().setTextAlign("center").run()}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isAlignCenter
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().setTextAlign("right").run()}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isAlignRight
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().setTextAlign("justify").run()}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isAlignJustify
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <AlignJustify className="h-4 w-4" />
          </Button>
        </div>

        {/* Desktop/Tablet: Wrapping Row */}
        <div className="hidden sm:flex flex-wrap items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editorState?.canUndo}
            className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editorState?.canRedo}
            className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Redo className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent gap-1"
              >
                {getActiveHeading()}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-popover border">
              <DropdownMenuItem
                onClick={() => editor?.chain().focus().setParagraph().run()}
                className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Paragraph
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Heading 1
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Heading 2
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Heading 3
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isBulletList
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isOrderedList
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            disabled={!editorState?.canBold}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isBold
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            disabled={!editorState?.canItalic}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isItalic
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            disabled={!editorState?.canStrike}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isStrike
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleCode().run()}
            disabled={!editorState?.canCode}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isCode
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Code className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            disabled={!editorState?.canUnderline}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isUnderline
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <Button
            variant="ghost"
            size="sm"
            onClick={setLink}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isLink
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleSuperscript().run()}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isSuperscript
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <SuperscriptIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleSubscript().run()}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isSubscript
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <SubscriptIcon className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().setTextAlign("left").run()}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isAlignLeft
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().setTextAlign("center").run()}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isAlignCenter
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().setTextAlign("right").run()}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isAlignRight
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().setTextAlign("justify").run()}
            className={`size-8 p-0 hover:bg-accent ${
              editorState?.isAlignJustify
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <AlignJustify className="h-4 w-4" />
          </Button>

          <div className="flex-1 min-w-2" />
        </div>
      </div>

      {/* Editor Content */}
      <div className="min-h-[50vh] sm:min-h-[60vh] lg:min-h-96 p-3 sm:p-4 lg:p-6 bg-card">
        <EditorContent
          editor={editor}
          className="prose prose-sm sm:prose-base lg:prose-lg prose-neutral dark:prose-invert max-w-none focus:outline-none 
          [&_.ProseMirror]:focus:outline-none 
          [&_.ProseMirror]:min-h-[45vh]
          sm:[&_.ProseMirror]:min-h-[55vh]
          lg:[&_.ProseMirror]:min-h-96
          [&_.ProseMirror_h1]:text-2xl 
          sm:[&_.ProseMirror_h1]:text-3xl 
          lg:[&_.ProseMirror_h1]:text-4xl
          [&_.ProseMirror_h1]:font-bold 
          [&_.ProseMirror_h1]:mb-3
          sm:[&_.ProseMirror_h1]:mb-4
          [&_.ProseMirror_h2]:text-xl 
          sm:[&_.ProseMirror_h2]:text-2xl 
          lg:[&_.ProseMirror_h2]:text-3xl
          [&_.ProseMirror_h2]:font-bold 
          [&_.ProseMirror_h2]:mb-2
          sm:[&_.ProseMirror_h2]:mb-3
          [&_.ProseMirror_h3]:text-lg
          sm:[&_.ProseMirror_h3]:text-xl
          lg:[&_.ProseMirror_h3]:text-2xl
          [&_.ProseMirror_h3]:font-bold
          [&_.ProseMirror_h3]:mb-2
          [&_.ProseMirror_p]:mb-3
          sm:[&_.ProseMirror_p]:mb-4
          [&_.ProseMirror_ul]:list-disc 
          [&_.ProseMirror_ul]:ml-4
          sm:[&_.ProseMirror_ul]:ml-6
          [&_.ProseMirror_ul]:mb-3
          sm:[&_.ProseMirror_ul]:mb-4
          [&_.ProseMirror_ol]:list-decimal 
          [&_.ProseMirror_ol]:ml-4
          sm:[&_.ProseMirror_ol]:ml-6
          [&_.ProseMirror_ol]:mb-3
          sm:[&_.ProseMirror_ol]:mb-4
          [&_.ProseMirror_li]:mb-1
          [&_.ProseMirror_blockquote]:border-l-4 
          [&_.ProseMirror_blockquote]:border-border 
          [&_.ProseMirror_blockquote]:pl-3
          sm:[&_.ProseMirror_blockquote]:pl-4
          [&_.ProseMirror_blockquote]:italic 
          [&_.ProseMirror_pre]:bg-muted 
          [&_.ProseMirror_pre]:p-2
          sm:[&_.ProseMirror_pre]:p-3
          lg:[&_.ProseMirror_pre]:p-4
          [&_.ProseMirror_pre]:rounded 
          [&_.ProseMirror_pre]:overflow-x-auto 
          [&_.ProseMirror_pre]:text-xs
          sm:[&_.ProseMirror_pre]:text-sm
          [&_.ProseMirror_code]:bg-muted 
          [&_.ProseMirror_code]:px-1 
          [&_.ProseMirror_code]:rounded
          [&_.ProseMirror_code]:text-xs
          sm:[&_.ProseMirror_code]:text-sm"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
