"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Shield, Key, Check, X, Camera } from "lucide-react";

export default function ProfilePage() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState("Student Scholar");
  const [tempName, setTempName] = useState(name);

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [email, setEmail] = useState("student@novalearn.app");
  const [tempEmail, setTempEmail] = useState(email);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load avatar from localStorage on mount
  useEffect(() => {
    const savedAvatar = localStorage.getItem("novalearn_avatar");
    if (savedAvatar) {
      setAvatarUrl(savedAvatar);
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarUrl(result);
        try {
          localStorage.setItem("novalearn_avatar", result);
        } catch (err) {
          console.warn("Image too large for localStorage, it will reset on refresh.");
        }
      };
      reader.readAsDataURL(file);
    }
    // Clear input so the same file can be selected again
    e.target.value = "";
  };

  const removeImage = () => {
    setAvatarUrl(null);
    localStorage.removeItem("novalearn_avatar");
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
          <User className="w-4 h-4" />
          <span>Student Profile</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">My Profile</h1>
        <p className="text-gray-400">Manage your personal information and account security.</p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="col-span-1 lg:col-span-1 bg-card/80 border border-border rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden group text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="w-32 h-32 rounded-full bg-accent/20 border-4 border-card flex items-center justify-center mb-6 relative z-10 shadow-2xl overflow-hidden">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-16 h-16 text-accent" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-white mb-1 relative z-10">{name}</h2>
          <p className="text-accent font-medium mb-6 relative z-10">Pro Member</p>
          <div className="flex gap-2 w-full relative z-20">
            <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-colors cursor-pointer">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="sr-only"
              />
              <Camera className="w-4 h-4 shrink-0" />
              <span className="truncate">{avatarUrl ? "Change Photo" : "Upload Photo"}</span>
            </label>
            {avatarUrl && (
              <button 
                onClick={removeImage}
                className="p-2 px-4 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 font-medium transition-colors"
                title="Remove Photo"
              >
                Remove
              </button>
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-1 lg:col-span-2 bg-card/80 border border-border rounded-3xl p-8 flex flex-col gap-6 relative overflow-hidden">
          <h3 className="text-xl font-bold text-white border-b border-border pb-4">Personal Information</h3>
          
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-background/50 border border-white/5 group hover:border-accent/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400">Full Name</p>
              {isEditingName ? (
                <input 
                  type="text" 
                  value={tempName} 
                  onChange={(e) => setTempName(e.target.value)} 
                  className="mt-1 w-full bg-background/80 border border-accent/50 rounded-lg px-3 py-1 text-white focus:outline-none focus:ring-1 focus:ring-accent"
                  autoFocus
                />
              ) : (
                <p className="text-white font-medium">{name}</p>
              )}
            </div>
            {isEditingName ? (
              <div className="flex gap-2">
                <button onClick={() => { setName(tempName); setIsEditingName(false); }} className="p-1 text-green-400 hover:bg-green-400/10 rounded-lg transition-colors"><Check className="w-4 h-4" /></button>
                <button onClick={() => { setTempName(name); setIsEditingName(false); }} className="p-1 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><X className="w-4 h-4" /></button>
              </div>
            ) : (
              <button onClick={() => setIsEditingName(true)} className="text-sm font-medium text-accent hover:text-white transition-colors">Edit</button>
            )}
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-background/50 border border-white/5 group hover:border-accent/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400">Email Address</p>
              {isEditingEmail ? (
                <input 
                  type="email" 
                  value={tempEmail} 
                  onChange={(e) => setTempEmail(e.target.value)} 
                  className="mt-1 w-full bg-background/80 border border-accent/50 rounded-lg px-3 py-1 text-white focus:outline-none focus:ring-1 focus:ring-accent"
                  autoFocus
                />
              ) : (
                <p className="text-white font-medium">{email}</p>
              )}
            </div>
            {isEditingEmail ? (
              <div className="flex gap-2">
                <button onClick={() => { setEmail(tempEmail); setIsEditingEmail(false); }} className="p-1 text-green-400 hover:bg-green-400/10 rounded-lg transition-colors"><Check className="w-4 h-4" /></button>
                <button onClick={() => { setTempEmail(email); setIsEditingEmail(false); }} className="p-1 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><X className="w-4 h-4" /></button>
              </div>
            ) : (
              <button onClick={() => setIsEditingEmail(true)} className="text-sm font-medium text-accent hover:text-white transition-colors">Edit</button>
            )}
          </div>

          <h3 className="text-xl font-bold text-white border-b border-border pb-4 mt-4">Security</h3>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-background/50 border border-white/5 group hover:border-accent/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <Key className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400">Password</p>
              <p className="text-white font-medium">••••••••••••</p>
            </div>
            <button className="text-sm font-medium text-accent hover:text-white transition-colors">Change</button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
