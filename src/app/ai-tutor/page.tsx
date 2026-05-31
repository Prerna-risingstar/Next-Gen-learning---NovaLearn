"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User, MessageSquare, Plus, Sparkles, MoreHorizontal } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
}

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "Hello! I'm Nova, your personal AI study assistant. How can I help you with your coursework today?",
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // Mock AI Response Logic
    setTimeout(() => {
      setIsTyping(false);
      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: getMockAiResponse(newUserMsg.content),
      };
      setMessages((prev) => [...prev, newAiMsg]);
    }, 1500 + Math.random() * 1000); // 1.5s to 2.5s delay
  };

  const getMockAiResponse = (userText: string) => {
    const text = userText.toLowerCase();
    
    // Greetings
    if (text === "hi" || text === "hello" || text === "hey") {
      return "Hi there! 👋 How's your studying going today?";
    }
    if (text.includes("how are you") || text.includes("how are u")) {
      return "I'm doing great, thanks for asking! Running on 100% battery and ready to help you learn. What topic should we tackle today?";
    }

    // Specific topics
    const knowledgeBase: Record<string, string> = {
      "node": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server side, which is great for building scalable network applications and APIs!",
      "javascript": "JavaScript is the programming language of the web. It allows you to implement complex features on web pages, like interactive elements, animations, and fetching data from APIs.",
      "js": "JavaScript is the programming language of the web. It allows you to implement complex features on web pages, like interactive elements, animations, and fetching data from APIs.",
      "typescript": "TypeScript is a syntactic superset of JavaScript which adds static typing. This means you can catch errors during development instead of at runtime. Highly recommended for large projects!",
      "ts": "TypeScript is a syntactic superset of JavaScript which adds static typing. This means you can catch errors during development instead of at runtime. Highly recommended for large projects!",
      "react": "That's a great question! React is a JavaScript library for building user interfaces. React Hooks (like `useState`) allow you to use state and other React features without writing a class.",
      "hook": "React Hooks allow you to use state and other React features without writing a class. For example, `useState` lets you add state variables to functional components.",
      "next": "Next.js is a React framework that gives you building blocks to create web applications. It handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations.",
      "tailwind": "Tailwind CSS is fantastic for rapid UI development. By using utility classes directly in your markup, you can build responsive, beautiful designs without ever leaving your HTML/JSX files.",
      "css": "CSS (Cascading Style Sheets) is used to style and layout web pages. Whether you are using vanilla CSS, SCSS, or Tailwind, mastering Flexbox and CSS Grid is essential!",
      "html": "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure and meaning of web content.",
      "api": "An API (Application Programming Interface) is a way for two or more computer programs to communicate with each other. In web development, we usually build REST or GraphQL APIs to send data between the client and server.",
      "database": "A database is an organized collection of structured information or data. In modern web apps, you might use SQL databases (like PostgreSQL) or NoSQL databases (like MongoDB) to store your app's data.",
      "sql": "SQL (Structured Query Language) is used to communicate with and manipulate relational databases. It's the standard language for relational database management systems.",
      "supabase": "Supabase is an open source Firebase alternative. It provides a Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, and Storage.",
      "mongodb": "MongoDB is a popular NoSQL database program that uses JSON-like documents with optional schemas. It's highly scalable and perfect for modern web applications.",
      "php": "PHP is a popular general-purpose scripting language that is especially suited to web development. It powers a huge portion of the web, including WordPress!",
      "c++": "C++ is a powerful, high-performance programming language used for system/software development, game engines, and applications requiring complex processing.",
      "python": "Python is a high-level, interpreted programming language known for its readability. It is widely used in data science, AI/ML, web development, and automation.",
      "c": "C is a powerful general-purpose programming language. It can be used to develop software like operating systems, databases, compilers, and so on. It is the foundation for many modern languages.",
      "r": "R is a programming language for statistical computing and graphics. It is widely used among statisticians and data miners for developing statistical software and data analysis.",
      "automata": "Automata theory is the study of abstract machines and automata, as well as the computational problems that can be solved using them. It's a core concept in theoretical computer science!"
    };

    for (const key in knowledgeBase) {
      const isExactMatch = ["c", "r", "ts", "js"].includes(key);
      if (isExactMatch) {
        if (new RegExp(`\\b${key}\\b`).test(text)) {
          return knowledgeBase[key];
        }
      } else {
        if (text.includes(key)) {
          return knowledgeBase[key];
        }
      }
    }

    // Randomized fallback
    const fallbacks = [
      "I can certainly help you with that! Learning new concepts can be tricky, but breaking them down into smaller pieces usually helps. Could you provide a bit more context on exactly what you're trying to build or understand?",
      "That's an interesting point. To give you the best answer, could you clarify what specific part of that concept is causing you trouble?",
      "Hmm, I might need a bit more detail to give you a solid answer. Are you working on a specific project right now?",
      "I'm here to help! Let's dive deep into that. Where would you like to start?"
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const pastSessions = [
    { id: 1, title: "Understanding React Context API", date: "Today" },
    { id: 2, title: "Help with CSS Grid Layouts", date: "Yesterday" },
    { id: 3, title: "Framer Motion Animations", date: "May 28" },
    { id: 4, title: "Database Schema Design", date: "May 25" },
  ];

  return (
    <div className="max-w-[1600px] mx-auto h-[calc(100vh-8rem)] flex gap-6 p-4 md:p-8 pt-0">
      
      {/* Sidebar: Chat History */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex w-80 flex-col gap-6"
      >
        <div className="mb-2">
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Bot className="w-8 h-8 text-accent" />
            Nova AI
          </h1>
          <p className="text-gray-400 mt-1">Your 24/7 study companion</p>
        </div>

        <button className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-accent/20 group">
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          New Conversation
        </button>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-2">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">Recent Sessions</h3>
          {pastSessions.map((session) => (
            <button 
              key={session.id}
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
            >
              <MessageSquare className="w-5 h-5 text-gray-500 group-hover:text-accent transition-colors shrink-0" />
              <div className="flex flex-col flex-1 truncate">
                <span className="text-sm font-medium text-gray-300 truncate group-hover:text-white transition-colors">{session.title}</span>
                <span className="text-xs text-gray-600">{session.date}</span>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex-1 bg-card/80 border border-border rounded-3xl overflow-hidden flex flex-col relative shadow-2xl"
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
        
        {/* Header (Mobile mostly) */}
        <div className="lg:hidden p-4 border-b border-border flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-white">Nova AI</h2>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Online
            </p>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative z-10 flex flex-col gap-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
                  msg.role === "user" ? "bg-white/10 text-white" : "bg-accent text-white"
                }`}>
                  {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-6 h-6" />}
                </div>
                
                <div className={`p-4 rounded-2xl ${
                  msg.role === "user" 
                    ? "bg-white/10 text-white rounded-tr-sm" 
                    : "bg-background/80 border border-border text-gray-200 rounded-tl-sm shadow-xl"
                }`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex gap-4 max-w-[85%] mr-auto"
            >
              <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0 shadow-lg">
                <Bot className="w-6 h-6" />
              </div>
              <div className="p-4 rounded-2xl bg-background/80 border border-border rounded-tl-sm shadow-xl flex items-center gap-2">
                <motion.div 
                  animate={{ y: [0, -5, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0 }}
                  className="w-2 h-2 bg-gray-400 rounded-full" 
                />
                <motion.div 
                  animate={{ y: [0, -5, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.2 }}
                  className="w-2 h-2 bg-gray-400 rounded-full" 
                />
                <motion.div 
                  animate={{ y: [0, -5, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.4 }}
                  className="w-2 h-2 bg-gray-400 rounded-full" 
                />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 border-t border-border bg-card/50 backdrop-blur-md relative z-10">
          <form 
            onSubmit={handleSendMessage}
            className="flex items-center gap-3 bg-background/50 border border-white/10 rounded-2xl p-2 focus-within:border-accent/50 focus-within:bg-background/80 transition-all shadow-inner"
          >
            <div className="p-2 text-gray-500 hover:text-white transition-colors cursor-pointer rounded-xl hover:bg-white/5">
              <Sparkles className="w-5 h-5" />
            </div>
            
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Nova a question..."
              className="flex-1 bg-transparent border-none text-white focus:outline-none focus:ring-0 placeholder-gray-600"
              disabled={isTyping}
            />
            
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-3 bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:hover:bg-accent text-white rounded-xl transition-colors shadow-lg shadow-accent/20"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="text-center mt-3 text-xs text-gray-600">
            Nova AI can make mistakes. Consider verifying important educational information.
          </div>
        </div>

      </motion.div>
    </div>
  );
}
