import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"

const upcomingHearings = [
  {
    id: "H-2024-034",
    student: {
      name: "Emily Parker",
      id: "STU-45789",
      image: "/abstract-geometric-ep.png",
    },
    date: "May 12, 2024",
    time: "10:00 AM",
    location: "Room 203",
    status: "today",
  },
  {
    id: "H-2024-035",
    student: {
      name: "James Wilson",
      id: "STU-43456",
      image: "/intertwined-letters.png",
    },
    date: "May 13, 2024",
    time: "2:30 PM",
    location: "Room 203",
    status: "upcoming",
  },
  {
    id: "H-2024-036",
    student: {
      name: "Sophia Martinez",
      id: "STU-47890",
      image: "/stylized-sm-logo.png",
    },
    date: "May 14, 2024",
    time: "11:00 AM",
    location: "Room 205",
    status: "upcoming",
  },
]

export function UpcomingHearings() {
  return (
    <div className="space-y-6">
      {upcomingHearings.map((hearing) => (
        <div
          key={hearing.id}
          className="rounded-lg border border-gray-100 p-4 hover:shadow-card-hover transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                <AvatarImage src={hearing.student.image || "/placeholder.svg"} alt={hearing.student.name} />
                <AvatarFallback>
                  {hearing.student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sdc-navy">{hearing.student.name}</div>
                <div className="text-xs text-sdc-gray">{hearing.student.id}</div>
              </div>
            </div>
            <Badge
              className={
                hearing.status === "today" ? "bg-rose-500 hover:bg-rose-600" : "bg-sdc-blue hover:bg-sdc-blue/90"
              }
            >
              {hearing.status === "today" ? "Today" : "Upcoming"}
            </Badge>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center rounded-lg bg-gray-50 p-2">
              <Calendar className="mb-1 h-4 w-4 text-sdc-gray" />
              <span className="text-xs font-medium text-sdc-navy">{hearing.date}</span>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-gray-50 p-2">
              <Clock className="mb-1 h-4 w-4 text-sdc-gray" />
              <span className="text-xs font-medium text-sdc-navy">{hearing.time}</span>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-gray-50 p-2">
              <MapPin className="mb-1 h-4 w-4 text-sdc-gray" />
              <span className="text-xs font-medium text-sdc-navy">{hearing.location}</span>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 text-xs">
              Reschedule
            </Button>
            <Button size="sm" className="flex-1 bg-sdc-blue text-xs text-white hover:bg-sdc-blue/90">
              Prepare
            </Button>
          </div>
        </div>
      ))}

      <div className="pt-2 text-center">
        <button className="text-sm font-medium text-sdc-blue hover:text-sdc-blue/80 transition-colors">
          View All Hearings
        </button>
      </div>
    </div>
  )
}
