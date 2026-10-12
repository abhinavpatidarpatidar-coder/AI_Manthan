import React, { useState } from 'react';
import SaathiMascot from './SaathiMascot';

export default function QuizScreen({ onAnswerSubmit, onQuizComplete }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleSelect = (optionId) => {
    setSelectedOption(optionId);
    if (optionId === 'opt1') {
      setFeedback({
        isCorrect: true,
        message: "शाबाश! बिल्कुल सही जवाब! ⭐"
      });
      if (onAnswerSubmit) onAnswerSubmit(true);
    } else {
      setFeedback({
        isCorrect: false,
        message: "सोचो! पौधे दिन में धूप की तरफ क्यों झुकते हैं?"
      });
      if (onAnswerSubmit) onAnswerSubmit(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 relative font-sans">
      
      {/* Top Star Progress Bar (2/4) */}
      <div className="flex flex-col items-center pt-1">
        <div className="relative w-full max-w-[200px] flex items-center justify-between px-2">
          {/* Track line behind stars */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-amber-200" />
          
          {/* Star 1 (Earned) */}
          <div className="relative z-10 w-7 h-7 flex items-center justify-center text-amber-400 text-lg">
            ★
          </div>
          {/* Star 2 (Earned) */}
          <div className="relative z-10 w-7 h-7 flex items-center justify-center text-amber-400 text-lg">
            ★
          </div>
          {/* Star 3 (Empty) */}
          <div className="relative z-10 w-7 h-7 flex items-center justify-center text-amber-300 text-lg">
            ☆
          </div>
          {/* Star 4 (Empty) */}
          <div className="relative z-10 w-7 h-7 flex items-center justify-center text-amber-300 text-lg">
            ☆
          </div>
        </div>

        {/* 2/4 Badge */}
        <div className="mt-0.5 bg-sky-100/80 px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-600">
          2/4
        </div>
      </div>

      {/* Quiz Question */}
      <div className="my-2 px-1 text-center">
        <h2 className="text-[17px] font-bold text-[#1F2A44] leading-snug">
          पौधे अपना खाना बनाने के लिए क्या इस्तेमाल करते हैं?
        </h2>
      </div>

      {/* 2 Visual Option Cards */}
      <div className="grid grid-cols-2 gap-3 my-auto">
        
        {/* Option 1: सूरज की रोशनी (Sunlight) */}
        <button
          onClick={() => handleSelect('opt1')}
          className={`bg-white rounded-3xl p-3 flex flex-col items-center text-center shadow-xs border-2 transition-all cursor-pointer ${
            selectedOption === 'opt1'
              ? 'border-[#2E7D32] ring-2 ring-green-300 shadow-md scale-102'
              : 'border-slate-100 hover:border-sky-300'
          }`}
        >
          {/* Graphic: Leaf with Sun */}
          <div className="w-16 h-16 flex items-center justify-center relative mb-2">
            {/* Sun */}
            <div className="absolute -top-1 -right-1 w-9 h-9 text-amber-500">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="5" fill="#FFA000" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" stroke="#FF8F00" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            {/* Green Leaf */}
            <div className="w-12 h-12 text-green-500">
              <svg viewBox="0 0 100 100">
                <path d="M50 10 C25 25 15 65 35 90 C50 95 60 95 70 90 C85 65 75 25 50 10 Z" fill="#66BB6A" stroke="#2E7D32" strokeWidth="3" />
                <path d="M50 15 L50 90" stroke="#2E7D32" strokeWidth="3" />
              </svg>
            </div>
          </div>

          <span className="text-[13px] font-bold text-[#1F2A44] leading-tight">
            सूरज की रोशनी
          </span>
          <span className="text-[10px] text-slate-500 font-medium mt-0.5">
            Sunlight
          </span>
          {selectedOption === 'opt1' && (
            <span className="mt-1 text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
              ✓ सही
            </span>
          )}
        </button>

        {/* Option 2: पानी और मिट्टी (Water & Soil) */}
        <button
          onClick={() => handleSelect('opt2')}
          className={`bg-white rounded-3xl p-3 flex flex-col items-center text-center shadow-xs border-2 transition-all cursor-pointer ${
            selectedOption === 'opt2'
              ? 'border-amber-400 ring-2 ring-amber-200'
              : 'border-slate-100 hover:border-sky-300'
          }`}
        >
          {/* Graphic: Water drop & Cloud */}
          <div className="w-16 h-16 flex items-center justify-center relative mb-2">
            {/* Rain Cloud */}
            <div className="absolute -top-1 -right-1 w-10 h-7 text-sky-300">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#B3E5FC" stroke="#0288D1" strokeWidth="1" />
              </svg>
            </div>
            {/* Big Water Drop */}
            <div className="w-10 h-12 text-blue-500 mt-2">
              <svg viewBox="0 0 24 24">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="#29B6F6" stroke="#0288D1" strokeWidth="1.5" />
                <ellipse cx="10" cy="11" rx="1.5" ry="3" fill="#E1F5FE" />
              </svg>
            </div>
          </div>

          <span className="text-[13px] font-bold text-[#1F2A44] leading-tight">
            पानी और मिट्टी
          </span>
          <span className="text-[10px] text-slate-500 font-medium mt-0.5">
            Water & Soil
          </span>
          {selectedOption === 'opt2' && (
            <span className="mt-1 text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
              एक बार और सोचें
            </span>
          )}
        </button>

      </div>

      {/* Saathi Hint Box (Amber Banner at Bottom) */}
      <div className="bg-[#FFE082] rounded-2xl p-2.5 flex items-center space-x-2.5 border border-amber-300 shadow-xs">
        <div className="shrink-0">
          <SaathiMascot mood="happy" size={44} waving={false} />
        </div>
        <div className="text-left flex-1">
          <span className="text-xs font-extrabold text-[#1F2A44]">Hint: </span>
          <p className="text-[11px] text-slate-800 font-semibold leading-tight inline">
            {feedback ? feedback.message : "सोचो! तुम्हें इसका जवाब पता है!"}
          </p>
        </div>
      </div>

    </div>
  );
}
