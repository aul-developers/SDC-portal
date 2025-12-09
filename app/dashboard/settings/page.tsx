"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-sdc-navy">
          Settings
        </h1>
        <p className="text-gray-500">
          Manage your preferences and account settings.
        </p>
      </div>
      <Card>
        <CardContent className="p-8 text-center text-gray-500">
          Settings module coming soon.
        </CardContent>
      </Card>
    </div>
  );
}
