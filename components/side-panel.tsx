"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Calendar, Clock, ChevronLeft, CheckCircle2 } from "lucide-react"

const upcomingHearings = [
  {
    id: "H-2024-034",
    student: {
      name: "Emily Parker",
      id: "STU-45789",
      image: "/abstract-geometric-ep.png",
    },
    caseId: "SDC-2024-088",
    date: "2024-05-12",
    time: "10:00 AM",
    location: "Admin Building, Room 203",
    status: "today",
  },
  {
    id: "H-2024-035",
    student: {
      name: "James Wilson",
      id: "STU-43456",
      image: "/intertwined-letters.png",
    },
    caseId: "SDC-2024-089",
    date: "2024-05-13",
    time: "2:30 PM",
    location: "Admin Building, Room 203",
    status: "tomorrow",
  },
]

const notifications = [
  {
    id: "notif-001",
    title: "New Case Assigned",
    description: "You have been assigned to review Case #SDC-2024-092",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: "notif-002",
    title: "Hearing Reminder",
    description: "Upcoming hearing for Case #SDC-2024-088 in 2 hours",
    time: "30 minutes ago",
    read: false,
  },
  {
    id: "notif-003",
    title: "Document Uploaded",
    description: "New evidence has been uploaded for Case #SDC-2024-087",
    time: "2 hours ago",
    read: true,
  },
]

export function SidePanel() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState<"hearings" | "notifications">("hearings")

  return (
    <div
      className={cn(
        "relative flex flex-col border-l bg-sdc-surface transition-all duration-300",
        isCollapsed ? "w-0" : "w-80",
      )}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -left-3 top-6 flex h-6 w-6 items-center justify-center rounded-full border bg-white shadow-sm"
      >
        <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
      </button>

      {!isCollapsed && (
        <>
          <div className="flex border-b">
            <button
              className={cn(
                "flex-1 border-b-2 py-3 text-sm font-medium",
                activeTab === "hearings"
                  ? "border-sdc-primary text-sdc-primary"
                  : "border-transparent text-sdc-muted hover:text-sdc-dark",
              )}
              onClick={() => setActiveTab("hearings")}
            >
              Upcoming Hearings
            </button>
            <button
              className={cn(
                "flex-1 border-b-2 py-3 text-sm font-medium",
                activeTab === "notifications"
                  ? "border-sdc-primary text-sdc-primary"
                  : "border-transparent text-sdc-muted hover:text-sdc-dark",
              )}
              onClick={() => setActiveTab("notifications")}
            >
              Notifications
              <Badge className="ml-1.5 bg-sdc-danger px-1.5 py-0 text-[10px]">
                {notifications.filter((n) => !n.read).length}
              </Badge>
            </button>
          </div>

          <div className="flex-1 overflow-auto p-4">
            {activeTab === "hearings" && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-sdc-dark">This Week</h3>
                {upcomingHearings.map((hearing) => (
                  <div
                    key={hearing.id}
                    className="overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow"
                  >
                    <div className="p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={hearing.student.image || "/placeholder.svg"} alt={hearing.student.name} />
                            <AvatarFallback>
                              {hearing.student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-sm font-medium">{hearing.student.name}</h4>
                            <p className="text-xs text-sdc-muted">Case #{hearing.caseId}</p>
                          </div>
                        </div>
                        <Badge
                          className={cn(
                            "px-2 py-0.5 text-[10px] uppercase",
                            hearing.status === "today" && "bg-sdc-danger",
                            hearing.status === "tomorrow" && "bg-sdc-warning",
                          )}
                        >
                          {hearing.status}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-sdc-muted">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{new Date(hearing.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sdc-muted">
                          <Clock className="h-3.5 w-3.5" />
                          <span>
                            {hearing.time} - {hearing.location}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline" className="h-7 flex-1 text-xs">
                          Details
                        </Button>
                        <Button
                          size="sm"
                          className="h-7 flex-1 bg-sdc-primary text-xs text-white hover:bg-sdc-primary/90"
                        >
                          Prepare
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="mt-2 w-full text-xs">
                  View All Hearings
                </Button>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-sdc-dark">Recent</h3>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "relative rounded-lg border bg-white p-3 shadow-sm transition-all hover:shadow",
                      !notification.read && "border-l-4 border-l-sdc-primary",
                    )}
                  >
                    <h4 className="text-sm font-medium">{notification.title}</h4>
                    <p className="mt-1 text-xs text-sdc-muted">{notification.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-sdc-muted">{notification.time}</span>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 rounded-full p-0 text-xs text-sdc-primary hover:bg-sdc-primary/10"
                        >
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="mt-2 w-full text-xs">
                  View All Notifications
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
