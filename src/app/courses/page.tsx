import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { CourseCard } from "@/components/CourseCard";
import { DashboardGrid, GridItem } from "@/components/DashboardGrid";
import { CourseSkeleton } from "@/components/Skeletons";

export const dynamic = 'force-dynamic';

async function AllCoursesList() {
  const supabase = await createClient();
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-3xl">
        <h3 className="font-bold text-lg mb-2">Error Loading Courses</h3>
        <p className="text-sm opacity-80">{error.message}</p>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="bg-card/50 border border-border p-6 rounded-3xl text-center text-gray-500">
        No courses found. Add some data to your Supabase table!
      </div>
    );
  }

  return (
    <DashboardGrid>
      {courses.map((course) => (
        <GridItem key={course.id}>
          <CourseCard course={course} />
        </GridItem>
      ))}
    </DashboardGrid>
  );
}

export default function CoursesPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">All Courses</h1>
        <p className="text-gray-400">Browse and continue your learning journey.</p>
      </div>

      <Suspense 
        fallback={
          <DashboardGrid>
            <CourseSkeleton />
            <CourseSkeleton />
            <CourseSkeleton />
            <CourseSkeleton />
          </DashboardGrid>
        }
      >
        <AllCoursesList />
      </Suspense>
    </div>
  );
}
