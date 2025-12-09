"use client";

import { useState, useCallback } from "react";
import { OffenceList } from "./offence-list";
import { OffenceDetails } from "./offence-details";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AddOffenceDialog } from "./add-offence-dialog";

export function OffenceDirectory() {
  const [selectedOffence, setSelectedOffence] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isAddOffenceOpen, setIsAddOffenceOpen] = useState(false);

  const handleSelectOffence = useCallback((offenceId: string) => {
    setSelectedOffence(offenceId);
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedOffence(null);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setSeverityFilter("all");
  }, []);

  if (selectedOffence) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">
            Offence Details
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackToList}
            className="gap-2"
          >
            <X className="h-4 w-4" /> Back to List
          </Button>
        </div>
        <OffenceDetails offenceId={selectedOffence} />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Offence Directory
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          List of all offences with their severity levels and standard
          punishments.
        </p>
      </div>

      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search offences..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-[140px]">
                  <span>Severity</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="low">
                    <div className="flex items-center">
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-100 mr-2"
                      >
                        Low
                      </Badge>
                      Low
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center">
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 border-amber-100 mr-2"
                      >
                        Medium
                      </Badge>
                      Medium
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center">
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-700 border-red-100 mr-2"
                      >
                        High
                      </Badge>
                      High
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="gap-1"
              >
                <X className="h-3.5 w-3.5" />
                <span>Clear</span>
              </Button>

              <Button
                onClick={() => setIsAddOffenceOpen(true)}
                className="gap-1"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Offence</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <OffenceList
        searchQuery={searchQuery}
        severityFilter={severityFilter}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSelectOffence={handleSelectOffence}
      />

      <AddOffenceDialog
        open={isAddOffenceOpen}
        onOpenChange={setIsAddOffenceOpen}
      />
    </div>
  );
}
