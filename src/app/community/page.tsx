"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Hash, Users, MessageSquare, Send, Heart, Reply, MoreHorizontal, UserCircle2 } from "lucide-react";

export default function CommunityPage() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [message, setMessage] = useState("");

  const channels = [
    { id: "general", name: "general", unread: 0 },
    { id: "react-help", name: "react-help", unread: 3 },
    { id: "dsa-grind", name: "dsa-grind", unread: 12 },
    { id: "showcase", name: "project-showcase", unread: 0 },
  ];

  const mockMessages = [
    { id: 1, user: "AlexD", avatar: "bg-blue-500", time: "10:24 AM", text: "Has anyone figured out the third question on the DSA quiz?", likes: 2 },
    { id: 2, user: "SarahCoder", avatar: "bg-purple-500", time: "10:26 AM", text: "Yeah, you need to use a Hash Map instead of a nested loop to get O(n) time complexity.", likes: 5 },
    { id: 3, user: "AlexD", avatar: "bg-blue-500", time: "10:28 AM", text: "Ahhh that makes so much sense! Thank you! 🙏", likes: 1 },
    { id: 4, user: "DevMaster99", avatar: "bg-green-500", time: "11:05 AM", text: "Just finished the Next.js module. Server components are absolutely blowing my mind right now.", likes: 8 },
    { id: 5, user: "NovaGuide (Instructor)", avatar: "bg-accent", time: "11:10 AM", text: "Great job @DevMaster99! Wait until we get to Server Actions in Module 5. Keep up the momentum!", likes: 12 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 h-[calc(100vh-2rem)] flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Study Groups</h1>
          <p className="text-gray-400 text-sm">Connect, ask questions, and learn together.</p>
        </motion.div>
        
        <div className="flex items-center gap-2 bg-background/50 border border-border px-4 py-2 rounded-xl">
          <Users className="w-4 h-4 text-accent" />
          <span className="text-white font-medium text-sm">342 Online</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 overflow-hidden">
        
        {/* Left Column: Channels */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-1 bg-card/80 border border-border rounded-3xl p-4 flex flex-col h-full"
        >
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Text Channels</div>
          
          <div className="flex flex-col gap-1 flex-1">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                  activeChannel === channel.id 
                    ? "bg-accent/20 text-white" 
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                }`}
              >
                <div className="flex items-center gap-2 font-medium">
                  <Hash className={`w-4 h-4 ${activeChannel === channel.id ? "text-accent" : "text-gray-500"}`} />
                  {channel.name}
                </div>
                {channel.unread > 0 && (
                  <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {channel.unread}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* User Profile Snippet */}
          <div className="mt-auto p-3 bg-background/50 rounded-xl border border-white/5 flex items-center gap-3">
            <UserCircle2 className="w-8 h-8 text-gray-400" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Student</p>
              <p className="text-xs text-green-400">Online</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Chat Feed */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="col-span-1 md:col-span-3 bg-card/80 border border-border rounded-3xl flex flex-col h-full overflow-hidden"
        >
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3 bg-background/30">
            <Hash className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-bold text-white">{activeChannel}</h2>
            <div className="w-1 h-1 rounded-full bg-gray-600 mx-2" />
            <p className="text-sm text-gray-400">General discussion and support</p>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
            {mockMessages.map((msg) => (
              <div key={msg.id} className="flex gap-4 group">
                <div className={`w-10 h-10 rounded-full flex-shrink-0 ${msg.avatar} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                  {msg.user.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className={`font-bold ${msg.user.includes('Instructor') ? 'text-accent' : 'text-gray-200'}`}>
                      {msg.user}
                    </span>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed bg-white/5 p-3 rounded-2xl rounded-tl-none inline-block max-w-3xl">
                    {msg.text}
                  </p>
                  
                  {/* Mock Reactions */}
                  <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex items-center gap-1.5 px-2 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-gray-400 transition-colors">
                      <Heart className="w-3.5 h-3.5" /> {msg.likes}
                    </button>
                    <button className="flex items-center gap-1.5 px-2 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-gray-400 transition-colors">
                      <Reply className="w-3.5 h-3.5" /> Reply
                    </button>
                    <button className="p-1 hover:bg-white/10 rounded-md text-gray-500 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 bg-background/50 border-t border-white/5">
            <div className="relative flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Message #${activeChannel}`}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all"
              />
              <button className="absolute right-2 p-2 bg-accent hover:bg-accent/90 rounded-lg text-white transition-colors">
                <Send className="w-4 h-4 translate-x-0.5 -translate-y-0.5" />
              </button>
            </div>
            <p className="text-[10px] text-gray-600 mt-2 text-center">
              Pro-tip: Use markdown to format your code snippets. Keep it friendly and respectful!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
