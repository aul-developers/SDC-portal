import { Button } from "@/components/ui/button"
import { Calendar, Download, Filter } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          An overview of all disciplinary cases and committee activities.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="h-9 gap-1.5">
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">Academic Year</span>
          <span>2024-2025</span>
        </Button>

        <Button variant="outline" size="sm" className="h-9 gap-1.5">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>

        <Button variant="outline" size="sm" className="h-9 gap-1.5">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </Button>
      </div>
    </div>
  )
}
