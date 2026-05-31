"use client";

import { motion } from "framer-motion";
import { FileText, CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";

export default function ExamsPortalPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 h-full flex flex-col">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Results Portal</h1>
        <p className="text-gray-400">All your graded exams, quizzes, and written assignments will be declared here.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Results List */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card/80 border border-border rounded-3xl p-8 flex flex-col gap-4"
        >
          <h2 className="text-xl font-bold text-white mb-4">Recent Results</h2>
          
          <div className="p-4 bg-background/50 border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-medium group-hover:text-accent transition-colors">Frontend Fundamentals Quiz</h3>
                <p className="text-sm text-gray-500">Graded on May 24, 2026</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-green-400">92%</span>
              <p className="text-xs text-gray-500">Passed</p>
            </div>
          </div>

          <div className="p-4 bg-background/50 border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-white font-medium group-hover:text-accent transition-colors">Midterm Written Exam</h3>
                <p className="text-sm text-gray-500">Submitted on May 28, 2026</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-yellow-500">Pending</span>
              <p className="text-xs text-gray-500">Under Review</p>
            </div>
          </div>

        </motion.div>

        {/* Action Callout */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-accent/20 to-purple-900/20 border border-accent/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden"
        >
          <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <FileText className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Ready for a challenge?</h2>
          <p className="text-gray-400 mb-8 max-w-sm">
            Take the comprehensive exam to test your knowledge across the entire curriculum.
          </p>
          <Link href="/quiz">
            <button className="px-8 py-3 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl shadow-lg shadow-accent/25 transition-all hover:scale-105 active:scale-95">
              Start Comprehensive Quiz
            </button>
          </Link>
        </motion.div>
        
      </div>
    </div>
  );
}
