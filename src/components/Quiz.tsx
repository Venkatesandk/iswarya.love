"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    id: 1,
    question: "Where did we first meet?",
    options: ["At a coffee shop", "Through mutual friends", "At the library", "At a concert"],
    answer: 1 // index of correct option
  },
  {
    id: 2,
    question: "What is my absolute favorite thing about you?",
    options: ["Your cooking", "Your eyes", "Your beautiful smile", "Your jokes"],
    answer: 2
  },
  {
    id: 3,
    question: "Who said 'I love you' first?",
    options: ["You did!", "I did!", "We said it at the same time", "Still waiting..."],
    answer: 1
  }
];

export function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setSelectedOpt(index);
    
    if (index === questions[currentQ].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelectedOpt(null);
      if (currentQ + 1 < questions.length) {
        setCurrentQ(currentQ + 1);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowScore(false);
    setSelectedOpt(null);
  };

  return (
    <section className="relative w-full py-32 bg-midnight-900 flex flex-col items-center justify-center overflow-hidden" id="quiz">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-3xl px-6 text-center">
        <span className="text-rose-400 tracking-[0.3em] text-xs uppercase mb-4 font-sans block">
          Chapter 09
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-ivory-100 tracking-wide mb-12">
          How Well Do You Know Us?
        </h2>

        <div className="glass-card bg-midnight-950/60 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-2xl shadow-[0_0_50px_rgba(229,193,133,0.05)] min-h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {showScore ? (
              <motion.div
                key="score"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <span className="text-6xl mb-6">{score === questions.length ? '🏆' : '💖'}</span>
                <h3 className="text-3xl font-serif text-champagne-400 mb-4">
                  You scored {score} out of {questions.length}!
                </h3>
                <p className="text-ivory-100/60 font-sans mb-8">
                  {score === questions.length 
                    ? "Perfect score! You know me too well. I love you!" 
                    : "Not bad! But you still won my heart anyway."}
                </p>
                <button 
                  onClick={resetQuiz}
                  className="px-8 py-3 bg-white/5 border border-white/20 text-ivory-100 rounded-full hover:border-champagne-400 hover:text-champagne-400 transition-all text-sm tracking-widest uppercase font-sans"
                >
                  Play Again
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="flex flex-col w-full"
              >
                <div className="text-champagne-400/50 font-sans text-xs tracking-widest uppercase mb-6">
                  Question {currentQ + 1} of {questions.length}
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-ivory-100 mb-10 leading-tight">
                  {questions[currentQ].question}
                </h3>
                
                <div className="flex flex-col gap-4">
                  {questions[currentQ].options.map((opt, idx) => {
                    let btnClass = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-champagne-400/50";
                    if (selectedOpt !== null) {
                      if (idx === questions[currentQ].answer) {
                        btnClass = "bg-green-500/20 border-green-400/50 text-green-400"; // Correct
                      } else if (idx === selectedOpt) {
                        btnClass = "bg-rose-500/20 border-rose-400/50 text-rose-400"; // Wrong
                      } else {
                        btnClass = "opacity-30 border-white/5"; // Disabled
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedOpt !== null}
                        onClick={() => handleAnswer(idx)}
                        className={`w-full text-left px-6 py-4 rounded-xl border transition-all duration-300 font-sans text-ivory-100/80 ${btnClass}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
