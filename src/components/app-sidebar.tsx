import * as React from "react";
import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { getNotebooks } from "@/server/notebooks";
import Image from "next/image";
import Link from "next/link";
import { SidebarData } from "./sidebar-data";

export async function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const notebooks = await getNotebooks();

  // Just transform the data structure, NO filtering here
  const navMain =
    notebooks.notebooks?.map((notebook) => ({
      title: notebook.name,
      url: `/dashboard/${notebook.id}`,
      items: notebook.notes.map((note) => ({
        title: note.title,
        url: `/dashboard/notebook/${notebook.id}/note/${note.id}`,
      })),
    })) ?? [];

  const data = {
    navMain,
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 pl-2">
          <div className="flex flex-1 items-center justify-center gap-4 p-1">
            <Image src="/logo.png" alt="Logo" width={28} height={28} />
            <h2>Notes App</h2>
          </div>
        </Link>
        <SidebarSeparator />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <React.Suspense fallback={<div className="p-4">Loading...</div>}>
          <SidebarData data={data} />
        </React.Suspense>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
