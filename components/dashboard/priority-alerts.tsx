import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AlertTriangle, Clock, Calendar } from "lucide-react"

const priorityAlerts = [
  {
    id: "alert-001",
    title: "Overdue Hearing",
    description: "Case #SDC-2024-082 hearing is overdue by 3 days",
    type: "overdue",
    icon: AlertTriangle,
  },
  {
    id: "alert-002",
    title: "Deadline Approaching",
    description: "Decision for Case #SDC-2024-087 due in 2 days",
    type: "deadline",
    icon: Clock,
  },
  {
    id: "alert-003",
    title: "Hearing Tomorrow",
    description: "Prepare for Case #SDC-2024-088 hearing",
    type: "upcoming",
    icon: Calendar,
  },
]

export function PriorityAlerts() {
  return (
    <div className="space-y-3">
      {priorityAlerts.map((alert) => (
        <div
          key={alert.id}
          className={cn(
            "rounded-lg border-l-4 bg-white p-3 shadow-sm",
            alert.type === "overdue" && "border-l-rose-500",
            alert.type === "deadline" && "border-l-amber-500",
            alert.type === "upcoming" && "border-l-blue-500",
          )}
        >
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "mt-0.5 rounded-full p-1.5",
                alert.type === "overdue" && "bg-rose-100 text-rose-500",
                alert.type === "deadline" && "bg-amber-100 text-amber-500",
                alert.type === "upcoming" && "bg-blue-100 text-blue-500",
              )}
            >
              <alert.icon className="h-4 w-4" />
            </div>

            <div className="flex-1">
              <h4 className="text-sm font-medium">{alert.title}</h4>
              <p className="mt-1 text-xs text-muted-foreground">{alert.description}</p>

              <div className="mt-2 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-7 rounded-full px-3 text-xs",
                    alert.type === "overdue" && "text-rose-500 hover:bg-rose-50 hover:text-rose-600",
                    alert.type === "deadline" && "text-amber-500 hover:bg-amber-50 hover:text-amber-600",
                    alert.type === "upcoming" && "text-blue-500 hover:bg-blue-50 hover:text-blue-600",
                  )}
                >
                  Take Action
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
