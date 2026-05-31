"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowRight, CheckCircle2, XCircle, RotateCcw, Award } from "lucide-react";
import Link from "next/link";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

const BASE_QUESTIONS: Question[] = [
  // React
  { id: 1, text: "Which of the following is a key feature of React?", options: ["Two-way data binding", "Virtual DOM", "Direct DOM manipulation", "MVC architecture"], correctAnswerIndex: 1 },
  { id: 2, text: "Which hook is used to manage state in a React functional component?", options: ["useEffect", "useContext", "useReducer", "useState"], correctAnswerIndex: 3 },
  { id: 3, text: "What is the purpose of the useEffect hook?", options: ["To manage state", "To perform side effects", "To map arrays", "To style components"], correctAnswerIndex: 1 },
  { id: 4, text: "In React, what is a higher-order component (HOC)?", options: ["A component that renders other components", "A function that takes a component and returns a new component", "A class component", "A built-in hook"], correctAnswerIndex: 1 },
  { id: 5, text: "What does 'prop drilling' refer to?", options: ["Passing data through many nested components", "Using a drill tool", "Styling components", "Fetching API data"], correctAnswerIndex: 0 },
  
  // HTML/CSS/Tailwind
  { id: 6, text: "What does CSS stand for?", options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"], correctAnswerIndex: 2 },
  { id: 7, text: "In Tailwind CSS, what utility class makes an element a flexbox container?", options: ["flexbox", "flex", "box-flex", "display-flex"], correctAnswerIndex: 1 },
  { id: 8, text: "Which HTML tag is used for the largest heading?", options: ["<heading>", "<h6>", "<head>", "<h1>"], correctAnswerIndex: 3 },
  { id: 9, text: "What is the correct way to center a div using Tailwind CSS flexbox?", options: ["flex justify-center items-center", "center-all", "flex-center", "align-center justify-center"], correctAnswerIndex: 0 },
  { id: 10, text: "What does semantic HTML mean?", options: ["Using div for everything", "Using tags that convey meaning about their content", "Using HTML inside JavaScript", "Styling with CSS"], correctAnswerIndex: 1 },

  // Node & Next.js
  { id: 11, text: "What is Node.js?", options: ["A frontend framework", "A JavaScript runtime environment", "A database", "A CSS preprocessor"], correctAnswerIndex: 1 },
  { id: 12, text: "What makes Next.js different from standard React?", options: ["It uses Python", "It provides Server-Side Rendering (SSR)", "It doesn't use components", "It only works offline"], correctAnswerIndex: 1 },
  { id: 13, text: "In Next.js 13+, what is the default behavior of components in the App Router?", options: ["Client Components", "Server Components", "Static Components", "Dynamic Components"], correctAnswerIndex: 1 },
  { id: 14, text: "Which command starts a Next.js development server?", options: ["npm start", "npm run dev", "node server.js", "next init"], correctAnswerIndex: 1 },
  { id: 15, text: "What is the package manager shipped with Node.js?", options: ["pip", "gem", "npm", "cargo"], correctAnswerIndex: 2 },

  // JavaScript Fundamentals
  { id: 16, text: "Which keyword is used to declare a block-scoped variable in JS?", options: ["var", "let", "const", "Both let and const"], correctAnswerIndex: 3 },
  { id: 17, text: "What is a Promise in JavaScript?", options: ["A guarantee of no bugs", "An object representing eventual completion of an async operation", "A synchronous loop", "A strict type"], correctAnswerIndex: 1 },
  { id: 18, text: "How do you check strict equality in JavaScript?", options: ["=", "==", "===", "equals()"], correctAnswerIndex: 2 },
  { id: 19, text: "What method adds an element to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], correctAnswerIndex: 0 },
  { id: 20, text: "What is the result of typeof null?", options: ["null", "undefined", "object", "string"], correctAnswerIndex: 2 },

  // DSA & General Web Dev
  { id: 21, text: "What data structure operates on a Last In, First Out (LIFO) principle?", options: ["Queue", "Tree", "Array", "Stack"], correctAnswerIndex: 3 },
  { id: 22, text: "What does API stand for?", options: ["Application Programming Interface", "Apple Protocol Internet", "Advanced Programming Integration", "Automated Process Interface"], correctAnswerIndex: 0 },
  { id: 23, text: "In Big O notation, what is the time complexity of binary search?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], correctAnswerIndex: 2 },
  { id: 24, text: "What type of database is MongoDB?", options: ["Relational (SQL)", "Document-oriented (NoSQL)", "Graph Database", "Key-Value Store"], correctAnswerIndex: 1 },
  { id: 25, text: "What does REST stand for in web services?", options: ["Representational State Transfer", "Remote Server Transfer", "Rapid Execution System Tech", "Request Event State Tool"], correctAnswerIndex: 0 }
];

// Dynamically generate 150 questions by repeating and re-indexing the base questions
const MOCK_QUESTIONS: Question[] = Array.from({ length: 150 }).map((_, index) => {
  const base = BASE_QUESTIONS[index % BASE_QUESTIONS.length];
  return { ...base, id: index + 1 };
});

export default function MassiveQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / MOCK_QUESTIONS.length) * 100;

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < MOCK_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  // Trigger confetti when finished and passed (80% or higher = 120/150)
  useEffect(() => {
    if (isFinished && score >= 120) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);
    }
  }, [isFinished, score]);

  if (isFinished) {
    const passed = score >= 120;
    const passPercentage = Math.round((score / MOCK_QUESTIONS.length) * 100);
    
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="bg-card/80 border border-border rounded-3xl p-10 md:p-16 relative overflow-hidden shadow-2xl w-full max-w-2xl"
        >
          {passed && <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent opacity-50" />}
          {!passed && <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent opacity-50" />}
          
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-xl ${passed ? 'bg-green-500' : 'bg-red-500/20'}`}>
              {passed ? <Award className="w-12 h-12 text-white" /> : <XCircle className="w-12 h-12 text-red-500" />}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {passed ? "Congratulations!" : "Keep Practicing!"}
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              You scored <span className={`font-bold ${passed ? 'text-green-400' : 'text-white'}`}>{score}</span> out of {MOCK_QUESTIONS.length} ({passPercentage}%)
            </p>

            <div className="flex gap-4">
              <button 
                onClick={handleRestart}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" /> Retake Exam
              </button>
              <Link href="/exams">
                <button className="px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-medium transition-colors shadow-lg shadow-accent/20">
                  Back to Results Portal
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Comprehensive Exam</h1>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400 font-medium">
            Question {currentQuestionIndex + 1} of {MOCK_QUESTIONS.length}
          </span>
        </div>
        
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      <motion.div 
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-card/80 border border-border rounded-3xl p-6 md:p-10 shadow-2xl relative"
      >
        <h2 className="text-xl md:text-2xl font-medium text-white mb-8 leading-relaxed">
          {currentQuestion.text}
        </h2>

        <div className="flex flex-col gap-4">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrect = index === currentQuestion.correctAnswerIndex;
            
            let buttonStyles = "bg-background/50 border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20";
            
            if (isAnswered) {
              if (isCorrect) {
                buttonStyles = "bg-green-500/20 border-green-500/50 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.1)]";
              } else if (isSelected && !isCorrect) {
                buttonStyles = "bg-red-500/20 border-red-500/50 text-red-400";
              } else {
                buttonStyles = "bg-background/20 border-transparent text-gray-600 opacity-50";
              }
            } else if (isSelected) {
               buttonStyles = "bg-accent/20 border-accent/50 text-white";
            }

            return (
              <motion.button
                key={index}
                whileHover={!isAnswered ? { scale: 1.01 } : {}}
                whileTap={!isAnswered ? { scale: 0.99 } : {}}
                onClick={() => handleOptionClick(index)}
                disabled={isAnswered}
                className={`w-full text-left p-4 md:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${buttonStyles}`}
              >
                <span className="text-lg">{option}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-400" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-400" />}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-white/10 flex justify-end"
            >
              <button 
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-lg"
              >
                {currentQuestionIndex === MOCK_QUESTIONS.length - 1 ? "Finish Exam" : "Next Question"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
