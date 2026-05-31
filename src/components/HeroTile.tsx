"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export function HeroTile() {
  return (
    <motion.article 
      className="col-span-1 md:col-span-2 lg:col-span-3 bg-card border border-border rounded-3xl p-6 lg:p-10 relative overflow-hidden group"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Subtle hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight mb-2">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Prerna</span>
          </h1>
          <p className="text-gray-400 text-lg">You've learned for 4 hours this week. Keep it up!</p>
        </div>
        
        <div className="flex items-center gap-4 bg-background/50 border border-border p-4 rounded-2xl backdrop-blur-sm self-start md:self-auto shadow-inner">
          <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <div className="text-sm text-gray-400 font-medium tracking-wide uppercase">Current Streak</div>
            <div className="text-2xl font-bold">12 Days</div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
