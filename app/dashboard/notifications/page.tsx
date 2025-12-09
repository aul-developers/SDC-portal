"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-sdc-navy">
          Notifications
        </h1>
        <p className="text-gray-500">Stay updated with system activities.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" /> All Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Placeholder items */}
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
              <p className="font-semibold text-sdc-navy">System Update</p>
              <p className="text-sm text-gray-500">
                The portal has been updated to version 2.1.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
              <p className="font-semibold text-sdc-navy">New Case Assigned</p>
              <p className="text-sm text-gray-500">
                You have been assigned to Case #301.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
