"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Flame, Trophy, Target } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const weeklyData = [
  { name: 'Mon', hours: 2, score: 75 },
  { name: 'Tue', hours: 3.5, score: 82 },
  { name: 'Wed', hours: 4, score: 90 },
  { name: 'Thu', hours: 1.5, score: 85 },
  { name: 'Fri', hours: 5, score: 95 },
  { name: 'Sat', hours: 6, score: 88 },
  { name: 'Sun', hours: 4.5, score: 92 },
];

const monthlyData = [
  { name: 'Week 1', hours: 15, score: 70 },
  { name: 'Week 2', hours: 22, score: 85 },
  { name: 'Week 3', hours: 18, score: 80 },
  { name: 'Week 4', hours: 26, score: 92 },
];

export default function ActivityPage() {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly">("weekly");
  const data = timeframe === "weekly" ? weeklyData : monthlyData;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
          <Activity className="w-4 h-4" />
          <span>Your Learning Activity</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Progress Overview</h1>
        <p className="text-gray-400">Track your milestones and daily learning streaks.</p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="col-span-1 bg-card/80 border border-border rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-500 flex items-center justify-center mb-4">
            <Flame className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">12 Days</h3>
          <p className="text-gray-400 font-medium">Current Streak</p>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-1 bg-card/80 border border-border rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-500 flex items-center justify-center mb-4">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">4 Badges</h3>
          <p className="text-gray-400 font-medium">Earned This Month</p>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-1 bg-card/80 border border-border rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-500 flex items-center justify-center mb-4">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">28 Hours</h3>
          <p className="text-gray-400 font-medium">Total Focus Time</p>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-3 bg-card/80 border border-border rounded-3xl p-6 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
           <div className="absolute -right-32 -top-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
           
           <div className="w-full flex items-center justify-between mb-6 relative z-10">
             <h3 className="text-xl font-semibold text-white">Focus & Performance Analytics</h3>
             <select 
               value={timeframe}
               onChange={(e) => setTimeframe(e.target.value as "weekly" | "monthly")}
               className="bg-background/50 border border-white/10 text-white text-sm rounded-xl focus:ring-1 focus:ring-accent focus:border-accent p-2 outline-none cursor-pointer"
             >
               <option value="weekly">This Week</option>
               <option value="monthly">This Month</option>
             </select>
           </div>
           <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
             <div className="h-[250px] w-full">
               <p className="text-sm text-gray-400 mb-4 font-medium">Focus Hours</p>
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                   <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                   <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}h`} />
                   <Tooltip 
                     cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                     contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                     itemStyle={{ color: '#fff' }}
                   />
                   <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} className="fill-accent/80 hover:fill-accent transition-colors duration-300" />
                 </BarChart>
               </ResponsiveContainer>
             </div>
             
             <div className="h-[250px] w-full">
               <p className="text-sm text-gray-400 mb-4 font-medium">Average Quiz Score</p>
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                   <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                   <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                   <Tooltip 
                     contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                     itemStyle={{ color: '#fff' }}
                   />
                   <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#fff' }} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
           </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
