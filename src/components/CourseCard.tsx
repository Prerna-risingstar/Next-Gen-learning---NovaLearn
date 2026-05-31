"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
}

const COURSE_TOPICS: Record<string, string[]> = {
  "DSA": ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming"],
  "Machine Learning": ["Regression", "Neural Networks", "NLP"],
  "PHP nd MongoDB(NoSQL)": ["Backend API", "NoSQL Queries", "Auth"],
  "UI/UX Fundamentals": ["Color Theory", "Typography", "Grid Systems"],
  "React js": ["Custom Hooks", "State Management", "Next.js"],
};

export function CourseCard({ course }: { course: Course }) {
  // Dynamically resolve the icon
  const IconName = course.icon_name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  const IconComponent = (LucideIcons as any)[IconName] || LucideIcons.Book;

  return (
    <Link href={`/courses/${course.id}`} className="block h-full w-full outline-none">
      <motion.article 
        className="col-span-1 bg-card border border-border rounded-3xl p-6 relative overflow-hidden group flex flex-col justify-between h-full"
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
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-4">
          <motion.div 
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{ type: "spring", damping: 25, stiffness: 120, delay: 0.2 }}
          />
        </div>

        {/* Topics Learned */}
        <div className="flex flex-wrap gap-2 mt-4 border-t border-white/5 pt-4">
          {COURSE_TOPICS[course.title]?.map((topic, i) => (
            <span 
              key={i} 
              className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-white/5 border border-white/10 rounded-md text-gray-400 group-hover:text-gray-300 group-hover:border-white/20 transition-colors"
            >
              {topic}
            </span>
          ))}
        </div>
        </div>
      </motion.article>
    </Link>
  );
}
