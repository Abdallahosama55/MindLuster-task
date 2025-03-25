
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center text-center">
        <div className="mb-4 text-[150px] font-bold leading-none text-primary">404</div>
        <h1 className="mb-2 text-2xl font-bold">Page not found</h1>
        <p className="mb-8 text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. The page might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <Button asChild size="lg">
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Back to Task
          </Link>
        </Button>
      </div>
    </div>
  )
}