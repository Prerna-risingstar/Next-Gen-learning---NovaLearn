import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { HeroTile } from "@/components/HeroTile";
import { ActivityTile } from "@/components/ActivityTile";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import { CourseCard } from "@/components/CourseCard";
import { DashboardGrid, GridItem } from "@/components/DashboardGrid";
import { DashboardSkeleton, CourseSkeleton } from "@/components/Skeletons";

// Force dynamic rendering since we are reading from the database
export const dynamic = 'force-dynamic';

async function CourseList() {
  const supabase = await createClient();
  
  // The user must configure their Supabase RLS policies to allow public reads
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="col-span-full bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-3xl">
        <h3 className="font-bold text-lg mb-2">Database Connection Failed</h3>
        <p className="text-sm opacity-80">{error.message}</p>
        <p className="text-xs opacity-60 mt-2">Ensure Supabase RLS policies allow public reads for the 'courses' table.</p>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="col-span-full bg-card/50 border border-border p-6 rounded-3xl text-center text-gray-500">
        No courses found. Add some data to your Supabase table!
      </div>
    );
  }

  return (
    <>
      {courses.map((course) => (
        <GridItem key={course.id}>
          <CourseCard course={course} />
        </GridItem>
      ))}
    </>
  );
}

export default async function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <DashboardGrid>
        <GridItem className="col-span-1 md:col-span-2 lg:col-span-3">
          <HeroTile userName="Student" />
        </GridItem>
        
        <GridItem className="col-span-1 md:col-span-1 lg:col-span-2">
          <ActivityTile />
        </GridItem>

        <GridItem className="col-span-1 md:col-span-1 lg:col-span-1">
          <PomodoroTimer />
        </GridItem>

        <Suspense 
          fallback={
            <>
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
            </>
          }
        >
          <CourseList />
        </Suspense>
      </DashboardGrid>
    </div>
  );
}
