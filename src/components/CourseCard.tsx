"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
}

export function CourseCard({ course }: { course: Course }) {
  // Dynamically resolve the icon
  const IconName = course.icon_name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  const IconComponent = (LucideIcons as any)[IconName] || LucideIcons.Book;

  return (
    <motion.article 
      className="col-span-1 bg-card border border-border rounded-3xl p-6 relative overflow-hidden group flex flex-col justify-between"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Subtle abstract gradient mesh texture in background */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none group-hover:bg-accent/10 transition-colors duration-500" />
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10 flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
          <IconComponent className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
        </div>
        <div className="text-xs font-bold px-2 py-1 bg-white/5 rounded-lg text-gray-400 group-hover:text-white transition-colors">
          {course.progress}%
        </div>
      </div>
      
      <div className="relative z-10">
        <h3 className="font-semibold text-lg tracking-tight mb-4 group-hover:text-accent transition-colors">{course.title}</h3>
        
        {/* Animated Progress Bar */}
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{ type: "spring", damping: 25, stiffness: 120, delay: 0.2 }}
          />
        </div>
      </div>
    </motion.article>
  );
}
