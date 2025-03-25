import { create } from "zustand"

interface User {
  id: string
  name: string
  email: string
  role: string
  avatar: string
  initials: string
}

interface UserState {
  user: User
  setUser: (user: User) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@ejada.com",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SJ",
  },
  setUser: (user) => set({ user }),
}))

