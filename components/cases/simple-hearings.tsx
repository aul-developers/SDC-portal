import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

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

export function SimpleHearings() {
  return (
    <div className="space-y-6">
      {upcomingHearings.map((hearing) => (
        <div key={hearing.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
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
                <div className="font-medium text-gray-900">{hearing.student.name}</div>
                <div className="text-xs text-gray-500">{hearing.student.id}</div>
              </div>
            </div>
            <Badge className={hearing.status === "today" ? "bg-gray-900" : "bg-gray-500"}>
              {hearing.status === "today" ? "Today" : "Upcoming"}
            </Badge>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-sm text-gray-600">
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p>{hearing.date}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Time</p>
              <p>{hearing.time}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p>{hearing.location}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="pt-2 text-center">
        <button className="text-sm font-medium text-gray-900 hover:underline">View All Hearings</button>
      </div>
    </div>
  )
}
