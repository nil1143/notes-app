"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { ChevronRight, File } from "lucide-react";
import { useQueryState } from "nuqs";

interface SidebarDataProps {
  data: {
    navMain: {
      title: string;
      url: string;
      items: { title: string; url: string }[];
    }[];
  };
}

// Helper function to highlight matching text
function highlightText(text: string, searchQuery: string) {
  if (!searchQuery) return text;

  const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === searchQuery.toLowerCase() ? (
          <mark
            key={index}
            className="bg-primary/30 text-foreground font-semibold rounded px-0.5"
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}

export function SidebarData({ data }: SidebarDataProps) {
  const [search] = useQueryState("search", { defaultValue: "" });
  const searchQuery = search.toLowerCase();

  const filteredData = data.navMain
    .map((notebook) => {
      if (searchQuery === "") {
        // No search - show everything
        return {
          ...notebook,
          items: notebook.items.map((note) => ({
            ...note,
            isMatch: false,
          })),
        };
      }

      // Find notes that CONTAIN the search query
      const matchingNotes = notebook.items.filter(
        (note) => note.title.toLowerCase().includes(searchQuery)
      );

      // Check if notebook name CONTAINS the search query
      const notebookMatches = notebook.title.toLowerCase().includes(searchQuery);

      // Show notebook if it has matching notes OR notebook name matches
      if (matchingNotes.length > 0 || notebookMatches) {
        return {
          ...notebook,
          items: notebook.items.map((note) => ({
            ...note,
            isMatch: note.title.toLowerCase().includes(searchQuery),
          })),
        };
      }

      // No match - don't show this notebook
      return null;
    })
    .filter((notebook): notebook is NonNullable<typeof notebook> => notebook !== null);

  return (
    <>
      {filteredData.map((item) => (
        <Collapsible
          key={item.title}
          title={item.title}
          defaultOpen
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
            >
              <CollapsibleTrigger>
                {item.title}{" "}
                {item.items.length > 0 && (
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((note) => (
                    <SidebarMenuItem key={note.title}>
                      <SidebarMenuButton asChild>
                        <a href={note.url}>
                          <File />
                          <span>{highlightText(note.title, searchQuery)}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}
    </>
  );
}