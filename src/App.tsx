import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { MainLayout } from "./layouts/main-layout"
import { TasksPage } from "./pages/TasksPage"
import NotFound from "./pages/Notfound"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ejada-ui-theme">
      <Routes>
        <Route path="/" element={<MainLayout />}>
    
        <Route path="/" element={<TasksPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="*" element={<NotFound />} />
   
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App

