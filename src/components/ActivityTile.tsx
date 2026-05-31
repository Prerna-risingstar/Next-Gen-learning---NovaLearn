"use client";

import { motion } from "framer-motion";

export function ActivityTile() {
  // Generate random data for the mock activity graph
  const generateActivityData = () => {
    const data = [];
    for (let i = 0; i < 7; i++) {
      data.push(Math.floor(Math.random() * 100));
    }
    return data;
  };
  
  const data = generateActivityData();
  const maxValue = Math.max(...data, 100);

  return (
    <motion.article 
      className="col-span-1 md:col-span-1 lg:col-span-2 bg-card border border-border rounded-3xl p-6 relative overflow-hidden group flex flex-col justify-between h-full min-h-[200px]"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10 flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold tracking-tight">Learning Activity</h2>
        <span className="text-xs font-medium px-2 py-1 bg-white/10 rounded-lg text-gray-300">This Week</span>
      </div>

      <div className="relative z-10 flex items-end justify-between gap-2 h-32 w-full mt-auto">
        {data.map((value, i) => {
          const heightPercentage = `${(value / maxValue) * 100}%`;
          const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
          
          return (
            <div key={i} className="flex flex-col items-center gap-2 flex-1 group/bar">
              <div className="w-full relative h-full flex items-end justify-center">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: heightPercentage }}
                  transition={{ type: "spring", damping: 20, stiffness: 100, delay: i * 0.1 }}
                  className="w-full max-w-[2rem] bg-accent/30 rounded-t-sm group-hover/bar:bg-accent transition-colors duration-300"
                />
              </div>
              <span className="text-xs text-gray-500 font-medium">{days[i]}</span>
            </div>
          );
        })}
      </div>
    </motion.article>
  );
}
