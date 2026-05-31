"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

const WORK_TIME = 25 * 60; // 25 minutes in seconds

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Optional: Play a sound here
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    if (timeLeft > 0) {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(WORK_TIME);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Calculate SVG Circle properties
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / WORK_TIME) * circumference;

  return (
    <div className="col-span-1 bg-card/80 border border-border rounded-3xl p-6 relative overflow-hidden h-full flex flex-col items-center justify-center">
      {/* Background glow when running */}
      <motion.div 
        className="absolute inset-0 bg-accent/5"
        animate={{ opacity: isRunning ? [0.5, 0.8, 0.5] : 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="flex items-center gap-2 self-start absolute top-6 left-6 text-gray-400">
        <Timer className="w-5 h-5" />
        <span className="font-semibold tracking-wide text-sm uppercase">Focus</span>
      </div>

      <div className="relative flex items-center justify-center my-6">
        {/* Background Track Circle */}
        <svg className="w-48 h-48 -rotate-90 transform">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-white/5"
          />
          {/* Animated Progress Circle */}
          <motion.circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            className="text-accent drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            initial={{ strokeDasharray: circumference, strokeDashoffset: 0 }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: "linear" }}
          />
        </svg>

        {/* Time Display inside circle */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-bold tracking-tighter text-white drop-shadow-md">
            {formatTime(timeLeft)}
          </span>
          <span className="text-xs text-accent mt-1 tracking-widest uppercase font-bold">
            {isRunning ? "Working" : "Paused"}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTimer}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors ${
            isRunning 
              ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30' 
              : 'bg-accent text-white hover:bg-accent/90'
          }`}
        >
          {isRunning ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current translate-x-0.5" />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetTimer}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
