"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, FileText, ChevronRight, CheckCircle2, Circle, Clock, MessageSquare } from "lucide-react";

export default function CourseViewerPage() {
  const params = useParams();
  const id = params?.id as string || "";
  const [activeTab, setActiveTab] = useState<"modules" | "notes">("modules");
  const [notes, setNotes] = useState("");

  const modules = [
    { id: 1, title: "Introduction & Fundamentals", duration: "12:45", completed: true },
    { id: 2, title: "Deep Dive: Core Concepts", duration: "45:20", completed: true },
    { id: 3, title: "Advanced Patterns & Architecture", duration: "32:10", completed: false, active: true },
    { id: 4, title: "Performance Optimization", duration: "28:15", completed: false },
    { id: 5, title: "Real-world Project Build", duration: "55:00", completed: false },
  ];

  const courseTitle = id ? id.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : "Course Overview";

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 h-full flex flex-col">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <span>Courses</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-accent">{courseTitle}</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">{courseTitle}</h1>
        <p className="text-gray-400">Master the concepts and build production-ready applications.</p>
      </motion.div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Video Area */}
        <motion.div 
          className="lg:col-span-2 flex flex-col gap-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Video Player Placeholder */}
          <div className="w-full aspect-video bg-black rounded-3xl border border-white/10 relative overflow-hidden group cursor-pointer shadow-2xl">
            {/* Cinematic Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            
            {/* Mock Thumbnail Image (gradient mesh) */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-purple-900/20" />
            
            {/* Center Play Button */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 bg-accent/90 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)] border border-white/20 backdrop-blur-md transition-colors group-hover:bg-accent"
              >
                <PlayCircle className="w-10 h-10 text-white translate-x-0.5" />
              </motion.div>
            </div>

            {/* Video Controls / Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-30 flex items-end justify-between">
              <div>
                <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full mb-3 inline-block shadow-lg">NOW PLAYING</span>
                <h2 className="text-2xl font-bold text-white">Advanced Patterns & Architecture</h2>
              </div>
              <div className="flex items-center gap-2 text-white/80 bg-black/50 px-3 py-1.5 rounded-lg backdrop-blur-md">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">14:20 / 32:10</span>
              </div>
            </div>
          </div>
          
          <div className="bg-card/80 border border-border rounded-3xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Lesson Overview</h3>
            <p className="text-gray-400 leading-relaxed">
              In this module, we will dive deep into the architectural decisions that separate junior developers from seniors. 
              We'll cover render optimization, custom hooks, and state management strategies for scale.
            </p>
          </div>
        </motion.div>

        {/* Sidebar Panel */}
        <motion.div 
          className="lg:col-span-1 bg-card/80 border border-border rounded-3xl flex flex-col overflow-hidden h-[800px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Tabs */}
          <div className="flex items-center border-b border-border">
            <button 
              onClick={() => setActiveTab("modules")}
              className={`flex-1 py-4 font-medium transition-colors ${activeTab === "modules" ? "text-accent border-b-2 border-accent" : "text-gray-400 hover:text-white"}`}
            >
              Curriculum
            </button>
            <button 
              onClick={() => setActiveTab("notes")}
              className={`flex-1 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${activeTab === "notes" ? "text-accent border-b-2 border-accent" : "text-gray-400 hover:text-white"}`}
            >
              <MessageSquare className="w-4 h-4" />
              My Notes
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar relative">
            <AnimatePresence mode="wait">
              {activeTab === "modules" ? (
                <motion.div 
                  key="modules"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex flex-col gap-3"
                >
                  {modules.map((mod) => (
                    <div 
                      key={mod.id} 
                      className={`p-4 rounded-2xl flex items-start gap-4 transition-all cursor-pointer ${
                        mod.active 
                          ? "bg-accent/10 border border-accent/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
                          : "bg-background/50 border border-white/5 hover:border-white/10"
                      }`}
                    >
                      <div className="pt-1">
                        {mod.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        ) : mod.active ? (
                          <div className="w-5 h-5 relative flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-ping" />
                            <Circle className="w-4 h-4 text-accent fill-accent" />
                          </div>
                        ) : (
                          <Circle className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold mb-1 ${mod.active ? "text-accent" : "text-white"}`}>{mod.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <PlayCircle className="w-3 h-3" />
                          {mod.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="notes"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="h-full flex flex-col"
                >
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Take notes while you watch... (They are saved automatically)"
                    className="flex-1 w-full bg-background/50 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
