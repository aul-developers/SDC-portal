"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { UpcomingHearingsList } from "./layout/upcoming-hearings-list";
import { NotificationsList } from "./layout/notifications-list";

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
];

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
];

export function SidePanel() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"hearings" | "notifications">(
    "hearings"
  );

  return (
    <div
      className={cn(
        "relative flex flex-col border-l bg-sdc-surface transition-all duration-300",
        isCollapsed ? "w-0" : "w-80"
      )}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -left-3 top-6 flex h-6 w-6 items-center justify-center rounded-full border bg-white shadow-sm"
      >
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform",
            isCollapsed && "rotate-180"
          )}
        />
      </button>

      {!isCollapsed && (
        <>
          <div className="flex border-b">
            <button
              className={cn(
                "flex-1 border-b-2 py-3 text-sm font-medium",
                activeTab === "hearings"
                  ? "border-sdc-primary text-sdc-primary"
                  : "border-transparent text-sdc-muted hover:text-sdc-dark"
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
                  : "border-transparent text-sdc-muted hover:text-sdc-dark"
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
              <UpcomingHearingsList hearings={upcomingHearings} />
            )}

            {activeTab === "notifications" && (
              <NotificationsList notifications={notifications} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
