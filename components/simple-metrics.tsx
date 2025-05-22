import { Card, CardContent } from "@/components/ui/card"

const metrics = [
  {
    title: "Total Cases",
    value: "247",
    description: "+12% from last semester",
  },
  {
    title: "Active Punishments",
    value: "32",
    description: "8 ending this month",
  },
  {
    title: "Cases This Month",
    value: "18",
    description: "-4% from last month",
  },
  {
    title: "Pending Review",
    value: "9",
    description: "3 high priority",
  },
]

export function SimpleMetrics() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="border-none shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500">{metric.title}</p>
            <h3 className="mt-2 text-3xl font-semibold text-gray-900">{metric.value}</h3>
            <p className="mt-2 text-xs text-gray-500">{metric.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
