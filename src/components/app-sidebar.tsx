import * as React from "react";

import { SearchForm } from "@/components/search-form";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
   SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getNotebooks } from "@/server/notebooks";
import Image from "next/image";
// import { SidebarData } from "./sidebar-data";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const notebooks = await getNotebooks();

  const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
      ...(notebooks.notebooks?.map((notebook) => ({
        title: notebook.name,
        url: `/dashboard/${notebook.id}`,
        items: notebook.notes.map((note) => ({
          title: note.title,
          url: `/dashboard/note/${note.id}`,
        })),
      })) ?? []),
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 pl-2">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <h2>Notes</h2>
        </Link>

        <React.Suspense>
          <SearchForm />
        </React.Suspense>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {data.navMain.map((item) => (
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
                  {item.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          {/* <File /> */}
                          {item.title}
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
        {/* <SidebarData data={data} /> */}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
