
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import { ThemeToggle } from "../theme-toggle";

export function AppHeader() {

  return (
    <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-6" />
      <div className="flex flex-1 items-center">
        <h1 className="text-lg font-semibold flex-grow">MindLuster Management System</h1>
  
        <ThemeToggle/>
      </div>
    </header>
  );
}