"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Crown, Flame, Star, Hexagon, CheckCircle2 } from "lucide-react";

export default function LeaderboardPage() {
  const topStudents = [
    { rank: 2, name: "Sarah Chen", points: 12400, avatar: "https://i.pravatar.cc/150?u=sarah", badge: "Silver", color: "from-gray-300 to-gray-500", delay: 0.3 },
    { rank: 1, name: "Student Scholar", points: 15200, avatar: "", badge: "Gold", color: "from-yellow-300 to-yellow-600", delay: 0.1, isCurrentUser: true },
    { rank: 3, name: "Alex Kumar", points: 11800, avatar: "https://i.pravatar.cc/150?u=alex", badge: "Bronze", color: "from-amber-600 to-amber-900", delay: 0.5 },
  ];

  const globalRankings = [
    { rank: 4, name: "Elena Rodriguez", points: 10500, streak: 12 },
    { rank: 5, name: "David Kim", points: 9800, streak: 5 },
    { rank: 6, name: "Marcus Johnson", points: 9200, streak: 21 },
    { rank: 7, name: "Emma Watson", points: 8900, streak: 2 },
    { rank: 8, name: "James Smith", points: 8100, streak: 7 },
  ];

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
        className="mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
          <Trophy className="w-4 h-4" />
          <span>Global Rankings</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Hall of Fame</h1>
        <p className="text-gray-400">Compete with top learners and unlock exclusive achievements.</p>
      </motion.div>

      {/* Podium Section */}
      <div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-16 h-80 px-4">
        {topStudents.map((student) => (
          <motion.div 
            key={student.rank}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: student.delay, type: "spring", stiffness: 100, damping: 20 }}
            className={`flex flex-col items-center ${student.rank === 1 ? 'w-full md:w-1/3 z-10' : 'w-full md:w-1/4'}`}
          >
            <div className="relative mb-4 group">
              <div className={`w-24 h-24 rounded-full border-4 border-background bg-card shadow-2xl relative z-10 overflow-hidden flex items-center justify-center`}>
                {student.isCurrentUser ? (
                  <div className="w-full h-full bg-accent/20 text-accent flex items-center justify-center font-bold text-2xl">
                    YOU
                  </div>
                ) : (
                  <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                )}
              </div>
              {student.rank === 1 && (
                <Crown className="w-10 h-10 text-yellow-400 absolute -top-8 left-1/2 -translate-x-1/2 z-20 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
              )}
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${student.color} opacity-50 blur-xl group-hover:opacity-100 transition-opacity duration-500`} />
            </div>

            <div 
              className={`w-full bg-gradient-to-t ${student.color} rounded-t-3xl border border-white/20 p-4 text-center shadow-2xl relative overflow-hidden`}
              style={{ height: student.rank === 1 ? '160px' : student.rank === 2 ? '120px' : '100px' }}
            >
              <div className="absolute inset-0 bg-black/40" /> {/* Darken gradient slightly for text readability */}
              <div className="relative z-10">
                <h3 className="font-bold text-white text-lg truncate mb-1">{student.name}</h3>
                <div className="flex items-center justify-center gap-1 text-white/90 font-medium">
                  <Star className="w-4 h-4 fill-current" />
                  {student.points.toLocaleString()}
                </div>
                <div className="mt-2 text-6xl font-black text-white/20 absolute -bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
                  {student.rank}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Global List */}
        <motion.div 
          className="lg:col-span-2 bg-card/80 border border-border rounded-3xl p-8 relative overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <div className="absolute -left-32 -bottom-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-2xl font-bold tracking-tight text-white mb-6 relative z-10">Global Leaderboard</h2>
          
          <div className="flex flex-col gap-3 relative z-10">
            {globalRankings.map((user, i) => (
              <motion.div 
                key={user.rank}
                variants={itemVariants}
                className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 text-center text-gray-500 font-bold">#{user.rank}</span>
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-white font-medium">{user.name}</span>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="hidden sm:flex items-center gap-2 text-orange-400 font-medium text-sm bg-orange-400/10 px-3 py-1 rounded-full">
                    <Flame className="w-4 h-4" />
                    {user.streak} Days
                  </div>
                  <div className="font-bold text-white w-20 text-right">
                    {user.points.toLocaleString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Showcase */}
        <motion.div 
          className="lg:col-span-1 bg-card/80 border border-border rounded-3xl p-8 flex flex-col gap-6 relative overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="absolute -right-32 -top-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-2xl font-bold tracking-tight text-white relative z-10">Achievements</h2>
          
          <div className="grid grid-cols-2 gap-4 relative z-10">
            
            <motion.div whileHover={{ scale: 1.05 }} className="bg-background/80 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer shadow-lg group">
              <div className="w-14 h-14 relative flex items-center justify-center">
                <Hexagon className="w-14 h-14 absolute text-orange-500/20 fill-orange-500/20 group-hover:fill-orange-500/40 transition-colors" />
                <Flame className="w-6 h-6 text-orange-400 relative z-10" />
              </div>
              <span className="text-sm font-bold text-white">7-Day Streak</span>
              <span className="text-xs text-gray-500">Unlocked</span>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-background/80 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer shadow-lg group">
              <div className="w-14 h-14 relative flex items-center justify-center">
                <Hexagon className="w-14 h-14 absolute text-accent/20 fill-accent/20 group-hover:fill-accent/40 transition-colors" />
                <Medal className="w-6 h-6 text-accent relative z-10" />
              </div>
              <span className="text-sm font-bold text-white">Top 3%</span>
              <span className="text-xs text-gray-500">Unlocked</span>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-background/80 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 cursor-not-allowed opacity-50 grayscale group">
              <div className="w-14 h-14 relative flex items-center justify-center">
                <Hexagon className="w-14 h-14 absolute text-yellow-500/20 fill-yellow-500/20 transition-colors" />
                <Crown className="w-6 h-6 text-yellow-400 relative z-10" />
              </div>
              <span className="text-sm font-bold text-white">#1 Rank</span>
              <span className="text-xs text-gray-500">Locked</span>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-background/80 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 cursor-not-allowed opacity-50 grayscale group">
              <div className="w-14 h-14 relative flex items-center justify-center">
                <Hexagon className="w-14 h-14 absolute text-green-500/20 fill-green-500/20 transition-colors" />
                <CheckCircle2 className="w-6 h-6 text-green-400 relative z-10" />
              </div>
              <span className="text-sm font-bold text-white">Perfect Score</span>
              <span className="text-xs text-gray-500">Locked</span>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
