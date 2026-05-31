"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Upload, Send, CheckCircle2, Paperclip, X } from "lucide-react";

export default function AssignmentsPage() {
  const [course, setCourse] = useState("Advanced React Patterns");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [submissions, setSubmissions] = useState<{ course: string, text: string, fileName?: string, date: string }[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text && !file) return;
    
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Add to submissions list
      setSubmissions(prev => [
        {
          course,
          text,
          fileName: file?.name,
          date: new Date().toLocaleDateString()
        },
        ...prev
      ]);

      setText("");
      setFile(null);
      
      // Reset success state after a few seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
    // Reset so same file can be selected again
    e.target.value = "";
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
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
          <FileText className="w-4 h-4" />
          <span>Assignments</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Submit Your Work</h1>
        <p className="text-gray-400">Upload your latest project files or write your answers directly.</p>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="bg-card/80 border border-border rounded-3xl p-8 flex flex-col gap-8 relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute -right-32 -top-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div variants={itemVariants} className="flex flex-col gap-3 relative z-10">
          <label className="text-sm font-medium text-gray-300">Select Course</label>
          <div className="relative">
            <select 
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all cursor-pointer"
            >
              <option value="Advanced React Patterns">Advanced React Patterns</option>
              <option value="Server Components Deep Dive">Server Components Deep Dive</option>
              <option value="Motion Design with Framer">Motion Design with Framer</option>
              <option value="UI/UX Fundamentals">UI/UX Fundamentals</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              ▼
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-3 relative z-10">
          <label className="text-sm font-medium text-gray-300">Written Response</label>
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your assignment details here or include external links..."
            rows={5}
            className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-3 relative z-10">
          <label className="text-sm font-medium text-gray-300">File Attachment</label>
          
          <div className="w-full border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-4 bg-background/20 hover:bg-background/40 hover:border-accent/30 transition-all group">
            {file ? (
              <div className="flex items-center gap-4 bg-white/5 px-6 py-4 rounded-xl border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-accent/20 text-accent flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex flex-col flex-1 truncate pr-8">
                  <span className="text-white font-medium truncate">{file.name}</span>
                  <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <button 
                  type="button"
                  onClick={() => setFile(null)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">SVG, PNG, JPG, PDF or ZIP (max. 10MB)</p>
                </div>
                <label className="mt-2 px-6 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-xl transition-colors cursor-pointer">
                  Browse Files
                  <input type="file" onChange={handleFileChange} className="sr-only" />
                </label>
              </>
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-4 relative z-10">
          <button 
            type="submit"
            disabled={(!text && !file) || isSubmitting}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden relative"
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.div 
                  key="submitting"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </motion.div>
              ) : isSubmitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 text-green-300"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Assignment Submitted!
                </motion.div>
              ) : (
                <motion.div 
                  key="default"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Submit Assignment
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </motion.form>

      {submissions.length > 0 && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-12 bg-card/80 border border-border rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="absolute -left-32 -bottom-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-2xl font-bold tracking-tight text-white mb-6 relative z-10">Recent Submissions</h2>
          
          <div className="flex flex-col gap-4 relative z-10">
            {submissions.map((sub, i) => (
              <motion.div key={i} variants={itemVariants} className="bg-background/50 border border-white/5 hover:border-white/10 transition-colors rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-bold uppercase tracking-wider rounded-lg">{sub.course}</span>
                  <span className="text-xs text-gray-500 font-medium">{sub.date}</span>
                </div>
                {sub.text && <p className="text-gray-300 text-sm mb-4 line-clamp-3">{sub.text}</p>}
                {sub.fileName && (
                  <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 w-fit px-3 py-2 rounded-lg border border-white/5">
                    <Paperclip className="w-4 h-4" />
                    <span className="truncate max-w-[200px]">{sub.fileName}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
