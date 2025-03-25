// src/layouts/main-layout.tsx
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/ui/app-header";

export function MainLayout() {
  return (
    <>
     
      <AppSidebar />
      
      <SidebarInset>
      <AppHeader />
        <Outlet />
      </SidebarInset>
    </>
  );
}