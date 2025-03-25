"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useTaskStore } from "@/stores/task-store"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowBigLeft, Calendar, Clock, Tag, Trash2 } from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"

export function TaskDetailsPage() {
  const { taskId } = useParams<{ taskId: string }>()
  const navigate = useNavigate()
  const getTasks = useTaskStore((state) => state.getTasks)
  const deleteTask = useTaskStore((state) => state.deleteTask)

  const tasks = getTasks()
  const task = tasks.find((t) => t.id === taskId)

  if (!task) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Task not found</h2>
          <p className="mt-2 text-muted-foreground">The task you're looking for doesn't exist.</p>
          <Button className="mt-4" onClick={() => navigate("/tasks")}>
            Go back to tasks
          </Button>
        </div>
      </div>
    )
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id)
      navigate("/tasks")
    }
  }

  return (
    <>
      <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/tasks")}>
              <ArrowBigLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold">Task Details</h1>
          </div>
          <div className="flex items-center gap-2">
           
            <Button variant="destructive" size="sm" className="gap-1" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{task.title}</h2>
              <Badge
                className={
                  task.priority === "high"
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    : task.priority === "medium"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                }
              >
                {task.priority} priority
              </Badge>
            </div>

            <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Created {format(task.createdAt, "PPP")}</span>
              </div>

              {task.dueDate && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Due {formatDistanceToNow(task.dueDate, { addSuffix: true })}</span>
                </div>
              )}

              {task.tags && task.tags.length > 0 && (
                <div className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  <span>{task.tags.join(", ")}</span>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-4 text-lg font-medium">Description</h3>
            <p className="text-muted-foreground">{task.description || "No description provided."}</p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-4 text-lg font-medium">Status</h3>
            <div className="flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${
                  task.status === "completed"
                    ? "bg-green-500"
                    : task.status === "in-progress"
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                }`}
              />
              <span className="capitalize">{task.status.replace("-", " ")}</span>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

