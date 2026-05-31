export function CourseSkeleton() {
  return (
    <div className="col-span-1 bg-card/50 border border-border/50 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[200px]">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      <div className="relative z-10 flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10" />
        <div className="w-10 h-6 bg-white/5 rounded-lg" />
      </div>
      <div className="relative z-10 space-y-4">
        <div className="h-6 w-3/4 bg-white/5 rounded-md" />
        <div className="h-1.5 w-full bg-white/5 rounded-full" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <>
      <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-card/50 border border-border/50 rounded-3xl p-6 lg:p-10 relative overflow-hidden h-[180px]">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>
      <div className="col-span-1 md:col-span-1 lg:col-span-2 bg-card/50 border border-border/50 rounded-3xl p-6 relative overflow-hidden h-[240px]">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>
      <CourseSkeleton />
      <CourseSkeleton />
      <CourseSkeleton />
    </>
  );
}
