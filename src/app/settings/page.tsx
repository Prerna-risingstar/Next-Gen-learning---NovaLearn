"use client";

import { motion } from "framer-motion";
import { Settings, Bell, Shield, Moon, Monitor, Smartphone } from "lucide-react";

export default function SettingsPage() {
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
          <Settings className="w-4 h-4" />
          <span>Preferences</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Settings</h1>
        <p className="text-gray-400">Customize your NovaLearn experience.</p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Appearance Settings */}
        <motion.div variants={itemVariants} className="col-span-1 bg-card/80 border border-border rounded-3xl p-8 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
            <Moon className="w-6 h-6 text-accent" />
            <h3 className="text-xl font-bold text-white">Appearance</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-white/5">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-gray-400" />
                <span className="text-white font-medium">Dark Mode</span>
              </div>
              <div className="w-12 h-6 bg-accent rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-white/5 opacity-50 cursor-not-allowed">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 font-medium">System Default</span>
              </div>
              <div className="w-12 h-6 bg-white/10 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-gray-400 rounded-full" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">NovaLearn is designed exclusively for Dark Mode.</p>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div variants={itemVariants} className="col-span-1 bg-card/80 border border-border rounded-3xl p-8 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
            <Bell className="w-6 h-6 text-accent" />
            <h3 className="text-xl font-bold text-white">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-white/5">
              <div className="flex flex-col">
                <span className="text-white font-medium">Email Alerts</span>
                <span className="text-xs text-gray-400">Weekly progress summaries</span>
              </div>
              <div className="w-12 h-6 bg-accent rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-white/5">
              <div className="flex flex-col">
                <span className="text-white font-medium">Push Notifications</span>
                <span className="text-xs text-gray-400">Daily streak reminders</span>
              </div>
              <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-gray-400 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Privacy Settings */}
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 bg-card/80 border border-border rounded-3xl p-8 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
            <Shield className="w-6 h-6 text-accent" />
            <h3 className="text-xl font-bold text-white">Privacy & Data</h3>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 p-4 rounded-2xl bg-background/50 border border-white/5">
              <h4 className="text-white font-medium mb-1">Public Profile</h4>
              <p className="text-sm text-gray-400 mb-4">Allow other students to see your course progress and badges.</p>
              <div className="w-12 h-6 bg-accent rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex-1 p-4 rounded-2xl bg-background/50 border border-white/5 border-red-500/20 group hover:border-red-500/50 transition-colors">
              <h4 className="text-red-400 font-medium mb-1">Danger Zone</h4>
              <p className="text-sm text-gray-400 mb-4">Permanently delete your account and all associated data.</p>
              <button className="px-4 py-2 bg-red-500/10 text-red-500 text-sm font-medium rounded-xl hover:bg-red-500/20 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
