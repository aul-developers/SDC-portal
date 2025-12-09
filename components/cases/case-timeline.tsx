import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { FileText, AlertTriangle, Calendar, MessageSquare, CheckCircle2 } from "lucide-react"

const timelineEvents = [
  {
    id: "event-001",
    type: "case-created",
    title: "New Case Created",
    description: "Case #SDC-2024-091 has been created for student Robert Chen",
    user: {
      name: "Dr. Sarah Johnson",
      avatar: "/diverse-user-avatars.png",
    },
    date: "May 10, 2024",
    time: "10:30 AM",
  },
  {
    id: "event-002",
    type: "hearing-scheduled",
    title: "Hearing Scheduled",
    description: "Hearing for Case #SDC-2024-090 scheduled for May 15, 2024",
    user: {
      name: "Admin Assistant",
      avatar: "/stylized-letters-sj.png",
    },
    date: "May 9, 2024",
    time: "2:15 PM",
  },
  {
    id: "event-003",
    type: "punishment-assigned",
    title: "Punishment Assigned",
    description: "Academic probation assigned to Jessica Lee for Case #SDC-2024-088",
    user: {
      name: "Prof. David Wilson",
      avatar: "/abstract-dw.png",
    },
    date: "May 9, 2024",
    time: "11:45 AM",
  },
  {
    id: "event-004",
    type: "case-note-added",
    title: "Case Note Added",
    description: "New evidence submitted for Case #SDC-2024-087",
    user: {
      name: "Prof. Michael Brown",
      avatar: "/monogram-mb.png",
    },
    date: "May 8, 2024",
    time: "3:20 PM",
  },
  {
    id: "event-005",
    type: "case-status-updated",
    title: "Case Status Updated",
    description: "Case #SDC-2024-085 marked as resolved",
    user: {
      name: "Dr. Sarah Johnson",
      avatar: "/diverse-user-avatars.png",
    },
    date: "May 8, 2024",
    time: "10:15 AM",
  },
]

// Activity types and their corresponding icons
const eventIcons = {
  "case-created": FileText,
  "punishment-assigned": AlertTriangle,
  "hearing-scheduled": Calendar,
  "case-note-added": MessageSquare,
  "case-status-updated": CheckCircle2,
}

export function CaseTimeline() {
  return (
    <div className="relative">
      <div className="absolute bottom-0 left-6 top-0 w-px bg-border" />
      <ul className="space-y-6">
        {timelineEvents.map((event, index) => {
          const IconComponent = eventIcons[event.type as keyof typeof eventIcons]

          return (
            <li key={event.id} className="relative pl-12">
              <div
                className={cn(
                  "absolute left-0 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background",
                  event.type === "case-created" && "bg-blue-500",
                  event.type === "punishment-assigned" && "bg-amber-500",
                  event.type === "hearing-scheduled" && "bg-indigo-500",
                  event.type === "case-note-added" && "bg-cyan-500",
                  event.type === "case-status-updated" && "bg-emerald-500",
                )}
              >
                {IconComponent && <IconComponent className="h-5 w-5 text-white" />}
              </div>

              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-medium">{event.title}</h4>
                  <Badge variant="outline" className="font-normal">
                    {event.date} at {event.time}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">{event.description}</p>

                <div className="mt-3 flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={event.user.avatar || "/placeholder.svg"} alt={event.user.name} />
                    <AvatarFallback>
                      {event.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{event.user.name}</span>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
