import React from 'react';
import SaathiMascot from './SaathiMascot';

export default function HomeScreen({ stars = 12, onMicClick, onNavigate, isListening = false }) {
  return (
    <div className="flex-1 flex flex-col justify-between p-4 relative font-sans">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pt-1">
        {/* Stars Badge */}
        <div className="flex items-center space-x-1.5 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-xs border border-amber-200">
          <span className="text-amber-500 text-sm">⭐</span>
          <span className="text-xs font-bold text-slate-800">{stars} Stars</span>
        </div>

        {/* Offline Badge */}
        <div className="flex items-center space-x-1 bg-[#DDF1FF] px-2.5 py-1 rounded-full text-slate-600 text-xs font-medium">
          <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 4.243a5 5 0 01-.707-.707m-2.122-2.122a9 9 0 010-12.728M1 1l22 22" />
          </svg>
          <span className="text-[11px] font-semibold text-slate-600">Offline</span>
        </div>
      </div>

      {/* Mascot & Greeting Bubble */}
      <div className="flex items-center space-x-3 px-2 pt-2">
        <div className="shrink-0">
          <SaathiMascot mood={isListening ? "thinking" : "happy"} size={78} waving={!isListening} />
        </div>
        <div className="flex flex-col text-left">
          <h2 className="text-[17px] font-bold text-[#1F2A44] leading-tight">
            Namaste, Riya!
          </h2>
          <p className="text-[14px] text-slate-600 font-medium leading-tight mt-0.5">
            {isListening ? "Main sun raha hoon..." : "Aaj kya seekhna hai?"}
          </p>
        </div>
      </div>

      {/* Big Orange Center Mic Button */}
      <div className="flex flex-col items-center justify-center my-auto py-2">
        <div className="relative flex items-center justify-center">
          
          {/* Subtle Sound Wave Glow Rings */}
          <div className={`absolute w-36 h-36 rounded-full bg-orange-400/20 ${isListening ? 'animate-ping' : 'animate-pulse'}`} />
          <div className="absolute w-32 h-32 rounded-full bg-orange-500/30" />

          {/* Actual 120dp Mic Button */}
          <button
            onClick={onMicClick}
            className={`relative w-28 h-28 rounded-full bg-gradient-to-b from-[#FF7043] to-[#E65100] text-white flex flex-col items-center justify-center shadow-lg shadow-orange-600/40 transform active:scale-95 transition-all duration-150 cursor-pointer ${
              isListening ? 'ring-4 ring-white animate-bounce-gentle' : 'hover:scale-105'
            }`}
            title="Boliye (Click to ask doubt)"
          >
            {/* Mic Icon */}
            <svg className="w-8 h-8 fill-current mb-0.5" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>

            {/* Hindi Label */}
            <span className="text-[17px] font-bold tracking-wide">
              बोलिए
            </span>
          </button>
        </div>

        <p className="text-[11px] text-slate-500 mt-3 font-medium">
          {isListening ? "🎤 आवाज़ रिकॉर्ड हो रही है..." : "माइक दबाकर सवाल पूछें"}
        </p>
      </div>

      {/* 3 Bottom Shortcut Cards */}
      <div className="grid grid-cols-3 gap-2.5 pb-2">
        
        {/* Card 1: Padhai */}
        <button
          onClick={() => onNavigate && onNavigate('answer')}
          className="bg-white rounded-2xl p-2.5 flex flex-col items-center text-center shadow-xs border border-sky-100 hover:border-sky-300 hover:shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center mb-1 text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-xs font-bold text-slate-800">पढ़ाई</span>
          <span className="text-[9px] text-slate-400 font-medium">Learn</span>
        </button>

        {/* Card 2: Quiz */}
        <button
          onClick={() => onNavigate && onNavigate('quiz')}
          className="bg-white rounded-2xl p-2.5 flex flex-col items-center text-center shadow-xs border border-green-100 hover:border-green-300 hover:shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center mb-1 text-green-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-xs font-bold text-slate-800">Quiz</span>
          <span className="text-[9px] text-slate-400 font-medium">Test</span>
        </button>

        {/* Card 3: Mere Sitare */}
        <button
          onClick={() => onNavigate && onNavigate('teacher')}
          className="bg-white rounded-2xl p-2.5 flex flex-col items-center text-center shadow-xs border border-amber-100 hover:border-amber-300 hover:shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center mb-1 text-amber-500">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
          <span className="text-xs font-bold text-slate-800">मेरे सितारे</span>
          <span className="text-[9px] text-slate-400 font-medium">My Stars</span>
        </button>

      </div>
    </div>
  );
}
