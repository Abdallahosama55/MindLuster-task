import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Welcome, John Doe</span>
            </div>
          </div>
        </header>
        <main className="flex-1 space-y-4 p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="text-sm font-medium tracking-tight">Card {i + 1}</h3>
                </div>
                <div className="text-2xl font-bold">{Math.floor(Math.random() * 5000)}</div>
                <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 20)}% from last month</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4 rounded-lg border bg-card shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-lg font-semibold leading-none tracking-tight">Overview</h3>
                <p className="text-sm text-muted-foreground">Your monthly statistics</p>
              </div>
              <div className="p-6 pt-0">
                <div className="h-[300px] w-full rounded-md bg-muted"></div>
              </div>
            </div>
            <div className="col-span-3 rounded-lg border bg-card shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-lg font-semibold leading-none tracking-tight">Recent Activity</h3>
                <p className="text-sm text-muted-foreground">Your recent actions</p>
              </div>
              <div className="p-6 pt-0">
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-9 w-9 rounded-full bg-primary/10"></div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Activity {i + 1}</p>
                        <p className="text-sm text-muted-foreground">{Math.floor(Math.random() * 60)} minutes ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

