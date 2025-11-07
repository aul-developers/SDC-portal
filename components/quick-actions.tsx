import { Button } from "@/components/ui/button"
import { FileText, UserPlus, Calendar, Search, AlertTriangle, FileBarChart } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    id: "new-case",
    title: "Create New Case",
    description: "Initiate a new disciplinary case record",
    icon: FileText,
    color: "text-sdc-blue",
    bgColor: "bg-sdc-blue/10",
  },
 
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 gap-3">
      {actions.map((action) => (
        <a
          href="/dashboard/cases"
          key={action.id}
          className="block w-full no-underline"
        >
          <Button
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
        </a>
      ))}
    </div>
  )
}
