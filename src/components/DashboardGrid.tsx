"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function DashboardGrid({ children }: { children: ReactNode }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min"
    >
      {children}
    </motion.div>
  );
}

export function GridItem({ children, className = "" }: { children: ReactNode, className?: string }) {
  const item: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
  };

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}
