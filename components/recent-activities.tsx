import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { FileText, AlertTriangle, UserCheck, Calendar, MessageSquare, Clock } from "lucide-react"

// Activity types and their corresponding icons
const activityIcons = {
  "case-created": FileText,
  "punishment-assigned": AlertTriangle,
  "student-record-updated": UserCheck,
  "hearing-scheduled": Calendar,
  "case-note-added": MessageSquare,
  "case-status-updated": Clock,
}

// Sample data for recent activities with more professional descriptions
const recentActivities = [
  {
    id: "act-001",
    type: "case-created",
    title: "Case Initiated",
    description: "Case #SDC-2024-091 initiated for Robert Chen (STU-45789)",
    user: {
      name: "Dr. Sarah Johnson",
      avatar: "/diverse-user-avatars.png",
    },
    timestamp: "10 minutes ago",
  },
  {
    id: "act-002",
    type: "punishment-assigned",
    title: "Disciplinary Action Recorded",
    description: "Academic probation applied to Case #SDC-2024-088 (Jessica Lee)",
    user: {
      name: "Prof. David Wilson",
      avatar: "/abstract-dw.png",
    },
    timestamp: "1 hour ago",
  },
  {
    id: "act-003",
    type: "hearing-scheduled",
    title: "Hearing Appointment Set",
    description: "Case #SDC-2024-090 hearing scheduled for May 15, 2024 at 14:30",
    user: {
      name: "Admin Assistant",
      avatar: "/stylized-letters-sj.png",
    },
    timestamp: "2 hours ago",
  },
  {
    id: "act-004",
    type: "case-note-added",
    title: "Documentation Updated",
    description: "Additional evidence submitted for Case #SDC-2024-087",
    user: {
      name: "Prof. Michael Brown",
      avatar: "/monogram-mb.png",
    },
    timestamp: "3 hours ago",
  },
]

export function RecentActivities() {
  return (
    <div className="space-y-6">
      {recentActivities.map((activity) => {
        const IconComponent = activityIcons[activity.type as keyof typeof activityIcons]

        return (
          <div key={activity.id} className="flex gap-4 group">
            <div
              className={cn(
                "mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full",
                activity.type === "case-created" && "bg-sdc-blue/10 text-sdc-blue",
                activity.type === "punishment-assigned" && "bg-amber-500/10 text-amber-500",
                activity.type === "student-record-updated" && "bg-sdc-teal/10 text-sdc-teal",
                activity.type === "hearing-scheduled" && "bg-indigo-500/10 text-indigo-500",
                activity.type === "case-note-added" && "bg-purple-500/10 text-purple-500",
                activity.type === "case-status-updated" && "bg-emerald-500/10 text-emerald-500",
              )}
            >
              {IconComponent && <IconComponent className="h-5 w-5" />}
            </div>

            <div className="flex-1 border-b border-gray-100 pb-6 last:border-0 last:pb-0 group-last:border-0 group-last:pb-0">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sdc-navy">{activity.title}</p>
                <span className="text-xs text-sdc-gray">{activity.timestamp}</span>
              </div>
              <p className="mt-1 text-sm text-sdc-gray">{activity.description}</p>

              <div className="mt-3 flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                  <AvatarFallback>
                    {activity.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-sdc-gray">{activity.user.name}</span>
              </div>
            </div>
          </div>
        )
      })}

      <div className="pt-2 text-center">
        <button className="text-sm font-medium text-sdc-blue hover:text-sdc-blue/80 transition-colors">
          View Activity Log
        </button>
      </div>
    </div>
  )
}
