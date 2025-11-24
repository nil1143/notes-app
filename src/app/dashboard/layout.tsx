import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Suspense } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Suspense fallback={<div>Loading sidebar...</div>}>
        <AppSidebar />
      </Suspense>
      <SidebarInset>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}
