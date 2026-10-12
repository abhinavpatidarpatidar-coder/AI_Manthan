import React, { useState } from 'react';
import SaathiMascot from './SaathiMascot';

export default function AnswerScreen({
  stars = 25,
  onAudioPlay,
  onSamajhAaya,
  onPhirSamjhao,
  onAurBatao,
  isPlayingAudio = false
}) {
  const [expandedText, setExpandedText] = useState(null);
  const [analogyMode, setAnalogyMode] = useState(false);

  const handleAurBataoClick = () => {
    if (onAurBatao) onAurBatao();
    setExpandedText(prev => prev ? null : "पौधे पत्तियों के क्लोरोफिल से सूरज की धूप, पानी और कार्बन डाइऑक्साइड मिलाकर खाना बनाते हैं।");
  };

  const handlePhirSamjhaoClick = () => {
    setAnalogyMode(true);
    if (onPhirSamjhao) onPhirSamjhao();
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 relative font-sans">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pt-1">
        {/* Stars Badge */}
        <div className="flex items-center space-x-1.5 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-xs border border-amber-200">
          <span className="text-amber-500 text-sm">⭐</span>
          <span className="text-xs font-bold text-slate-800">{stars} Stars</span>
        </div>

        {/* Right side: Offline & Speaker Replay */}
        <div className="flex items-center space-x-2">
          {/* Offline Badge */}
          <div className="flex items-center space-x-1 bg-[#DDF1FF] px-2.5 py-1 rounded-full text-slate-600 text-xs font-medium">
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 4.243a5 5 0 01-.707-.707m-2.122-2.122a9 9 0 010-12.728M1 1l22 22" />
            </svg>
            <span className="text-[11px] font-semibold text-slate-600">Offline</span>
          </div>

          {/* Speaker Button (Audio Replay) */}
          <button
            onClick={onAudioPlay}
            className={`w-8 h-8 rounded-full bg-[#1565C0] text-white flex items-center justify-center shadow-sm active:scale-90 transition-transform cursor-pointer ${
              isPlayingAudio ? 'animate-pulse ring-2 ring-blue-300' : ''
            }`}
            title="Suniye (Listen to explanation)"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mascot at Top Center */}
      <div className="flex justify-center -mt-1">
        <SaathiMascot mood={analogyMode ? "thinking" : "happy"} size={82} waving={true} />
      </div>

      {/* White Answer Card with Leaf Illustration */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-sky-100 flex flex-col my-auto">
        <div className="flex items-center space-x-3.5">
          {/* Leaf Vector Graphic */}
          <div className="shrink-0 w-20 h-24 flex items-center justify-center">
            <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-sm">
              {/* Leaf Blade */}
              <path
                d="M 50 10 C 20 25, 10 65, 30 100 C 45 105, 55 105, 70 100 C 90 65, 80 25, 50 10 Z"
                fill="#81C784"
                stroke="#388E3C"
                strokeWidth="3.5"
              />
              {/* Veins */}
              <path d="M 50 15 L 50 105" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" />
              <path d="M 50 40 Q 35 35 24 45" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 50 60 Q 30 55 20 68" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 50 80 Q 35 75 28 88" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 50 40 Q 65 35 76 45" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 50 60 Q 70 55 80 68" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 50 80 Q 65 75 72 88" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Stem */}
              <path d="M 50 105 Q 48 115 44 118" stroke="#2E7D32" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>

          {/* Hindi Explanation Text */}
          <div className="flex-1 text-left">
            <p className="text-[14px] font-bold text-[#1F2A44] leading-snug">
              {analogyMode ? (
                <>
                  जैसे रसोई में चूल्हे की धूप और पानी से रोटी बनती है, वैसे ही पत्तियां धूप से भोजन बनाती हैं।
                </>
              ) : (
                <>
                  पौधे सूर्य से अपना खाना बनाते हैं। इसे <span className="font-extrabold text-[#1565C0]">photosynthesis</span> कहते हैं।
                </>
              )}
            </p>
          </div>
        </div>

        {/* Optional Expanded Notes */}
        {expandedText && (
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600 bg-sky-50/50 p-2 rounded-xl">
            {expandedText}
          </div>
        )}

        {/* "Aur batao >" Action Link */}
        <div className="mt-3 flex justify-end">
          <button
            onClick={handleAurBataoClick}
            className="text-xs font-bold text-[#1565C0] hover:text-blue-800 flex items-center space-x-1 cursor-pointer"
          >
            <span>Aur batao</span>
            <span>&gt;</span>
          </button>
        </div>
      </div>

      {/* Two Feedback Action Buttons at Bottom */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {/* Left: Green "Samajh aaya" */}
        <button
          onClick={onSamajhAaya}
          className="bg-[#2E7D32] text-white rounded-2xl py-3 px-2 flex flex-col items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer hover:bg-[#1B5E20]"
        >
          <div className="text-xl mb-0.5">👍</div>
          <span className="text-xs font-bold leading-tight">Samajh aaya</span>
        </button>

        {/* Right: Amber/Yellow "Phir samjhao" */}
        <button
          onClick={handlePhirSamjhaoClick}
          className="bg-[#FFB300] text-slate-900 rounded-2xl py-3 px-2 flex flex-col items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer hover:bg-[#FFA000]"
        >
          <div className="text-xl mb-0.5">🤔</div>
          <span className="text-xs font-bold leading-tight">Phir samjhao</span>
        </button>
      </div>

    </div>
  );
}
