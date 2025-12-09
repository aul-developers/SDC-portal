"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { PunishmentStatusList } from "./punishment-status-list";

interface PunishmentStatusTabsProps {
  onViewDetails: (punishmentId: string) => void;
}

export function PunishmentStatusTabs({
  onViewDetails,
}: PunishmentStatusTabsProps) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-4">
      <Card className="border-none shadow-sm">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by ID, student name, or matric number..."
              className="pl-9 h-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4">
          <PunishmentStatusList
            status="Active"
            searchTerm={searchTerm}
            onViewDetails={onViewDetails}
          />
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          <PunishmentStatusList
            status="Pending"
            searchTerm={searchTerm}
            onViewDetails={onViewDetails}
          />
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <PunishmentStatusList
            status="Completed"
            searchTerm={searchTerm}
            onViewDetails={onViewDetails}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
