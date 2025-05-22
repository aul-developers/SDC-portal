import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data for recent activities
const recentActivities = [
  {
    id: "act-001",
    title: "New Case Created",
    description: "Case #SDC-2024-091 has been created for student Robert Chen",
    user: {
      name: "Dr. Sarah Johnson",
      avatar: "/diverse-user-avatars.png",
    },
    timestamp: "10 minutes ago",
  },
  {
    id: "act-002",
    title: "Punishment Assigned",
    description: "Academic probation assigned to Jessica Lee for Case #SDC-2024-088",
    user: {
      name: "Prof. David Wilson",
      avatar: "/abstract-dw.png",
    },
    timestamp: "1 hour ago",
  },
  {
    id: "act-003",
    title: "Hearing Scheduled",
    description: "Hearing for Case #SDC-2024-090 scheduled for May 15, 2024",
    user: {
      name: "Admin Assistant",
      avatar: "/stylized-letters-sj.png",
    },
    timestamp: "2 hours ago",
  },
  {
    id: "act-004",
    title: "Case Note Added",
    description: "New evidence submitted for Case #SDC-2024-087",
    user: {
      name: "Prof. Michael Brown",
      avatar: "/monogram-mb.png",
    },
    timestamp: "3 hours ago",
  },
]

export function SimpleActivities() {
  return (
    <div className="space-y-6">
      {recentActivities.map((activity) => (
        <div key={activity.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-900">{activity.title}</p>
            <span className="text-xs text-gray-500">{activity.timestamp}</span>
          </div>
          <p className="mt-1 text-sm text-gray-600">{activity.description}</p>

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
            <span className="text-xs text-gray-500">{activity.user.name}</span>
          </div>
        </div>
      ))}

      <div className="pt-2 text-center">
        <button className="text-sm font-medium text-gray-900 hover:underline">View All Activities</button>
      </div>
    </div>
  )
}
