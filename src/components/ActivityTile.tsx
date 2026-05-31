"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export function ActivityTile() {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly">("weekly");

  const chartData = timeframe === "weekly" ? [
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 80 },
    { day: 'Wed', value: 30 },
    { day: 'Thu', value: 90 },
    { day: 'Fri', value: 65 },
    { day: 'Sat', value: 100 },
    { day: 'Sun', value: 50 },
  ] : [
    { day: 'Week 1', value: 120 },
    { day: 'Week 2', value: 250 },
    { day: 'Week 3', value: 180 },
    { day: 'Week 4', value: 290 },
  ];

  return (
    <motion.article 
      className="col-span-1 md:col-span-1 lg:col-span-2 bg-card border border-border rounded-3xl p-6 relative overflow-hidden group flex flex-col justify-between h-full min-h-[200px]"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10 flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold tracking-tight">Learning Activity</h2>
        <select 
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value as "weekly" | "monthly")}
          className="text-xs font-medium px-2 py-1 bg-white/10 rounded-lg text-gray-300 border-none outline-none cursor-pointer focus:ring-1 focus:ring-accent"
        >
          <option value="weekly" className="bg-card text-white">This Week</option>
          <option value="monthly" className="bg-card text-white">This Month</option>
        </select>
      </div>

      <div className="relative z-10 w-full h-[150px] mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
              itemStyle={{ color: '#3b82f6' }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#3b82f6" fillOpacity={0.8} className="hover:fill-opacity-100 transition-opacity duration-300" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.article>
  );
}
