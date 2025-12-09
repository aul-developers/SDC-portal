"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-sdc-navy">
          Profile
        </h1>
        <p className="text-gray-500">
          View and edit your personal information.
        </p>
      </div>
      <Card>
        <CardContent className="p-8 text-center text-gray-500">
          Profile module coming soon.
        </CardContent>
      </Card>
    </div>
  );
}
