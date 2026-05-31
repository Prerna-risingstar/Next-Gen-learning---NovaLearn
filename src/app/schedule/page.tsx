"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Video, FileText, CheckCircle2 } from "lucide-react";

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(15);

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const startingDayOfWeek = 3; // 0 = Sun, 3 = Wed

  const events = {
    12: [{ type: "assignment", title: "React Context API Homework", time: "11:59 PM", completed: true }],
    15: [
      { type: "lecture", title: "Live Q&A: Framer Motion", time: "2:00 PM", completed: false },
      { type: "assignment", title: "Submit UI/UX Wireframes", time: "11:59 PM", completed: false }
    ],
    22: [{ type: "exam", title: "Midterm Exam: Architecture", time: "9:00 AM", completed: false }],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const getEventIcon = (type: string) => {
    switch(type) {
      case "lecture": return <Video className="w-4 h-4 text-blue-400" />;
      case "assignment": return <FileText className="w-4 h-4 text-orange-400" />;
      case "exam": return <Clock className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getEventBg = (type: string) => {
    switch(type) {
      case "lecture": return "bg-blue-400/10 border-blue-400/20";
      case "assignment": return "bg-orange-400/10 border-orange-400/20";
      case "exam": return "bg-red-400/10 border-red-400/20";
      default: return "bg-gray-400/10 border-gray-400/20";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
          <CalendarIcon className="w-4 h-4" />
          <span>Interactive Calendar</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Schedule & Deadlines</h1>
        <p className="text-gray-400">Track your upcoming lectures, exams, and project submissions.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Calendar Grid */}
        <motion.div 
          className="lg:col-span-2 bg-card/80 border border-border rounded-3xl p-6 md:p-8 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute -left-32 -bottom-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h2 className="text-2xl font-bold text-white">May 2026</h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-xl bg-background/50 border border-white/10 text-white hover:bg-white/10 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-xl bg-background/50 border border-white/10 text-white hover:bg-white/10 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-2 mb-4 relative z-10">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2 relative z-10">
            {/* Empty slots for starting day */}
            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square rounded-2xl bg-background/20 border border-transparent" />
            ))}
            
            {/* Actual Days */}
            {daysInMonth.map((day) => {
              const dayEvents = (events as any)[day] || [];
              const isSelected = selectedDay === day;
              
              return (
                <motion.button
                  key={day}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDay(day)}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative border transition-all ${
                    isSelected 
                      ? "bg-accent text-white border-accent shadow-[0_0_20px_rgba(59,130,246,0.3)]" 
                      : "bg-background/50 text-gray-300 border-white/5 hover:border-white/20"
                  }`}
                >
                  <span className={`text-lg font-bold ${isSelected ? "text-white" : ""}`}>{day}</span>
                  
                  {/* Event Dots */}
                  {dayEvents.length > 0 && (
                    <div className="flex gap-1 mt-1 absolute bottom-2">
                      {dayEvents.map((evt: any, idx: number) => (
                        <div 
                          key={idx} 
                          className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : evt.type === 'lecture' ? 'bg-blue-400' : evt.type === 'assignment' ? 'bg-orange-400' : 'bg-red-400'}`} 
                        />
                      ))}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Selected Day Details Panel */}
        <motion.div 
          className="lg:col-span-1 bg-card/80 border border-border rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden h-[600px] lg:h-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute -right-32 -top-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedDay || "empty"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col relative z-10"
            >
              {selectedDay ? (
                <>
                  <div className="flex items-end justify-between border-b border-white/10 pb-6 mb-6">
                    <div>
                      <h3 className="text-3xl font-black text-white">{selectedDay}</h3>
                      <p className="text-accent font-medium mt-1">May 2026</p>
                    </div>
                    <span className="px-3 py-1 bg-white/5 text-gray-400 rounded-lg text-sm font-medium">
                      {(events as any)[selectedDay]?.length || 0} Events
                    </span>
                  </div>

                  <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-4">
                    {((events as any)[selectedDay] || []).length > 0 ? (
                      ((events as any)[selectedDay]).map((evt: any, i: number) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className={`p-4 rounded-2xl border ${getEventBg(evt.type)} ${evt.completed ? 'opacity-50' : ''}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex flex-col gap-1">
                              <h4 className={`font-bold ${evt.completed ? 'text-gray-400 line-through' : 'text-white'}`}>{evt.title}</h4>
                              <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                                {getEventIcon(evt.type)}
                                {evt.time}
                              </div>
                            </div>
                            {evt.completed && <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />}
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 gap-4 mt-20">
                        <CalendarIcon className="w-12 h-12 opacity-20" />
                        <p>No events scheduled for this day.</p>
                        <p className="text-sm">Take a break or review past lessons!</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 gap-4">
                  <CalendarIcon className="w-12 h-12 opacity-20" />
                  <p>Select a day to view scheduled events.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
