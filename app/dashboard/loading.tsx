import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 h-full">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-1">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Banner Skeleton */}
      <div className="w-full h-48 rounded-[30px] bg-gray-100/50" />

      {/* Metric Cards Skeleton */}
      <div className="pt-2 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="rounded-[24px] border-gray-50/50 h-36">
            <CardContent className="p-6 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <Skeleton className="h-10 w-10 rounded-xl" />
              </div>
              <Skeleton className="h-4 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Section Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Main Content Area Skeleton */}
          <div className="bg-white rounded-[30px] p-5 sm:p-8 shadow-sm space-y-6 h-96">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel Skeleton */}
        <div className="xl:col-span-1 space-y-6">
          <Skeleton className="h-64 w-full rounded-[30px]" />
          <Skeleton className="h-48 w-full rounded-[30px]" />
        </div>
      </div>
    </div>
  );
}
