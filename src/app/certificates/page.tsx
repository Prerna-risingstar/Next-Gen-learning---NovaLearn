"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Download, Share2 } from "lucide-react";

export default function CertificatesPage() {
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    const storedName = localStorage.getItem("nova_display_name");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 h-full flex flex-col items-center">
      <motion.div 
        className="mb-8 w-full text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Your Certificates</h1>
        <p className="text-gray-400">View and download your official NovaLearn course completions.</p>
      </motion.div>

      {/* Certificate Render Area */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        className="relative w-full max-w-5xl aspect-[1.414/1] bg-[#0f172a] rounded-xl shadow-2xl p-4 md:p-12 border-[16px] border-[#1e293b] flex flex-col items-center justify-center text-center overflow-hidden"
      >
        {/* Fancy Inner Border */}
        <div className="absolute inset-4 border-2 border-accent/30 rounded-lg pointer-events-none" />
        <div className="absolute inset-5 border border-accent/20 rounded-lg pointer-events-none" />

        {/* Abstract Background Vectors */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

        {/* Header Ribbon */}
        <div className="mb-8 relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6">
            <Award className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-xl md:text-2xl text-accent font-bold tracking-widest uppercase letter-spacing-[0.2em] mb-2">
            NovaLearn Academy
          </h2>
          <h1 className="text-4xl md:text-6xl font-serif text-white italic tracking-wide">
            Certificate of Completion
          </h1>
        </div>

        {/* Recipient */}
        <div className="mb-12 relative z-10">
          <p className="text-gray-400 uppercase tracking-widest text-sm mb-4">This is to certify that</p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-300 pb-2 border-b-2 border-accent/50 inline-block px-12"
          >
            {userName}
          </motion.h2>
        </div>

        {/* Course Info */}
        <div className="max-w-2xl relative z-10">
          <p className="text-gray-400 text-lg mb-2">has successfully completed the comprehensive curriculum for</p>
          <h3 className="text-3xl font-bold text-white mb-6">Advanced Full-Stack Development</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Demonstrating exceptional proficiency in React, Node.js, Database Architecture, and modern UI/UX design principles.
          </p>
        </div>

        {/* Footer Signatures */}
        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end px-8 z-10">
          <div className="text-center">
            <div className="w-48 border-b border-gray-600 mb-2 pb-2">
              <span className="font-serif text-xl italic text-gray-300">Nova AI</span>
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Lead Instructor</p>
          </div>

          {/* Gold Seal Mock */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-600 to-yellow-800 flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.2)] border-4 border-[#0f172a] transform rotate-12">
            <div className="w-20 h-20 rounded-full border border-yellow-200/50 flex flex-col items-center justify-center p-2 text-center">
              <span className="text-[10px] font-bold text-yellow-100 uppercase leading-none tracking-tighter">Official</span>
              <span className="text-[10px] font-bold text-yellow-100 uppercase leading-none tracking-tighter">Seal</span>
            </div>
          </div>

          <div className="text-center">
            <div className="w-48 border-b border-gray-600 mb-2 pb-2">
              <span className="font-serif text-xl text-gray-300">May 31, 2026</span>
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Date Issued</p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors">
          <Download className="w-5 h-5" /> Download PDF
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-medium rounded-xl transition-colors shadow-lg shadow-accent/20">
          <Share2 className="w-5 h-5" /> Share to LinkedIn
        </button>
      </div>

    </div>
  );
}
