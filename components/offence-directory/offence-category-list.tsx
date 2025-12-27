"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Users,
  Building,
  FileText,
  ShieldAlert,
  Laptop,
  Pill,
  Gavel,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for offence categories
const offenceCategories = [
  {
    id: "academic",
    name: "Academic Integrity",
    description: "Violations related to academic honesty and integrity",
    icon: BookOpen,
    count: 12,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "behavioral",
    name: "Behavioral Misconduct",
    description: "Violations related to student behavior and conduct",
    icon: Users,
    count: 18,
    color: "bg-red-100 text-red-800",
  },
  {
    id: "residential",
    name: "Residential Violations",
    description: "Violations related to campus housing and residential areas",
    icon: Building,
    count: 15,
    color: "bg-green-100 text-green-800",
  },
  {
    id: "administrative",
    name: "Administrative Violations",
    description: "Violations related to university policies and procedures",
    icon: FileText,
    count: 9,
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "safety",
    name: "Safety & Security",
    description: "Violations related to campus safety and security",
    icon: ShieldAlert,
    count: 11,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "technology",
    name: "Technology Misuse",
    description: "Violations related to technology and digital resources",
    icon: Laptop,
    count: 7,
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    id: "substance",
    name: "Substance Violations",
    description:
      "Violations related to alcohol, drugs, and prohibited substances",
    icon: Pill,
    count: 14,
    color: "bg-orange-100 text-orange-800",
  },
  {
    id: "legal",
    name: "Legal Violations",
    description: "Violations that may also constitute legal offences",
    icon: Gavel,
    count: 8,
    color: "bg-gray-100 text-gray-800",
  },
];

interface OffenceCategoryListProps {
  searchQuery: string;
  onSelectCategory: (categoryId: string) => void;
}

export function OffenceCategoryList({
  searchQuery,
  onSelectCategory,
}: OffenceCategoryListProps) {
  // Filter categories based on search query
  const filteredCategories = offenceCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredCategories.map((category) => (
        <Card
          key={category.id}
          className="cursor-pointer border-l-4"
          onClick={() => onSelectCategory(category.id)}
        >
          <CardContent className="flex flex-col items-start p-6">
            <div className={`rounded-full p-2 ${category.color.split(" ")[0]}`}>
              <category.icon
                className={`h-6 w-6 ${category.color.split(" ")[1]}`}
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-sdc-navy">
              {category.name}
            </h3>
            <p className="mt-1 text-sm text-sdc-gray">{category.description}</p>
            <div className="mt-4 flex w-full justify-between">
              <Badge variant="outline" className="text-xs">
                {category.count} offences
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
