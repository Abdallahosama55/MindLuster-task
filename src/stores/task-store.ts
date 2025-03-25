import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"

export type TaskPriority = "low" | "medium" | "high"
export type TaskStatus = "todo" | "in-progress" | "completed"

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: Date
  createdAt: Date
  assignedTo?: string
  tags?: string[]
  projectId?: string
}

interface TaskState {
  tasks: Task[]
  addTask: (task: Omit<Task, "id" | "createdAt">) => void
  updateTask: (id: string, task: Partial<Task>) => void
  deleteTask: (id: string) => void
  getTasks: (filter?: Partial<Task>) => Task[]
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [
    {
      id: "1",
      title: "Design new dashboard layout",
      description: "Create wireframes and mockups for the new dashboard",
      status: "in-progress",
      priority: "high",
      dueDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
      createdAt: new Date(),
      assignedTo: "1",
      tags: ["design", "ui/ux"],
      projectId: "project-1",
    },
    {
      id: "2",
      title: "Implement authentication flow",
      description: "Add login, registration, and password reset functionality",
      status: "todo",
      priority: "high",
      dueDate: new Date(Date.now() + 86400000 * 5), // 5 days from now
      createdAt: new Date(),
      assignedTo: "1",
      tags: ["backend", "security"],
      projectId: "project-1",
    },
    {
      id: "3",
      title: "Write API documentation",
      description: "Document all API endpoints and parameters",
      status: "todo",
      priority: "medium",
      dueDate: new Date(Date.now() + 86400000 * 7), // 7 days from now
      createdAt: new Date(),
      tags: ["documentation"],
      projectId: "project-2",
    },
    {
      id: "4",
      title: "Fix navigation bug on mobile",
      description: "The navigation menu doesn't close properly on mobile devices",
      status: "todo",
      priority: "medium",
      dueDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
      createdAt: new Date(),
      assignedTo: "1",
      tags: ["bug", "mobile"],
      projectId: "project-1",
    },
    {
      id: "5",
      title: "Optimize database queries",
      description: "Improve performance of slow database queries",
      status: "completed",
      priority: "high",
      createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
      tags: ["performance", "database"],
      projectId: "project-2",
    },
  ],

  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          id: uuidv4(),
          createdAt: new Date(),
        },
      ],
    })),

  updateTask: (id, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  getTasks: (filter) => {
    const { tasks } = get()
    if (!filter) return tasks

    return tasks.filter((task) => {
      return Object.entries(filter).every(([key, value]) => {
        if (key === "tags" && Array.isArray(value)) {
          return value.every((tag) => task.tags?.includes(tag))
        }
        return task[key as keyof Task] === value
      })
    })
  },
}))

