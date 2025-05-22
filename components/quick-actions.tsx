import { Button } from "@/components/ui/button"
import { FileText, UserPlus, Calendar, Search, AlertTriangle, FileBarChart } from "lucide-react"

const actions = [
  {
    id: "new-case",
    title: "Create New Case",
    description: "Initiate a new disciplinary case record",
    icon: FileText,
    color: "text-sdc-blue",
    bgColor: "bg-sdc-blue/10",
  },
  {
    id: "schedule-hearing",
    title: "Schedule Hearing",
    description: "Arrange a disciplinary committee hearing",
    icon: Calendar,
    color: "text-sdc-teal",
    bgColor: "bg-sdc-teal/10",
  },
  {
    id: "assign-punishment",
    title: "Assign Disciplinary Action",
    description: "Record a disciplinary measure for a case",
    icon: AlertTriangle,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    id: "generate-report",
    title: "Generate Report",
    description: "Create statistical reports and analytics",
    icon: FileBarChart,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    id: "search-records",
    title: "Search Records",
    description: "Find student or case information",
    icon: Search,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    id: "add-student",
    title: "Register Student",
    description: "Add a new student to the database",
    icon: UserPlus,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 gap-3">
      {actions.map((action) => (
        <Button
          key={action.id}
          variant="ghost"
          className="flex h-auto w-full items-start justify-start gap-3 p-3 text-left hover:bg-gray-50"
        >
          <div className={`mt-0.5 rounded-md p-2 ${action.bgColor}`}>
            <action.icon className={`h-5 w-5 ${action.color}`} />
          </div>
          <div>
            <h3 className="font-medium text-sdc-navy">{action.title}</h3>
            <p className="text-xs text-sdc-gray">{action.description}</p>
          </div>
        </Button>
      ))}
    </div>
  )
}
