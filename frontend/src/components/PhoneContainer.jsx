import React from 'react';

export default function PhoneContainer({ children, label = "", active = false, onClick }) {
  return (
    <div className="flex flex-col items-center">
      {label && (
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          {label}
        </span>
      )}
      
      {/* Smartphone Outer Shell */}
      <div 
        onClick={onClick}
        className={`relative w-[300px] h-[610px] sm:w-[310px] sm:h-[630px] rounded-[42px] p-[10px] bg-slate-900 shadow-2xl transition-all duration-300 ${
          active ? 'ring-4 ring-sky-500 shadow-sky-500/30 scale-[1.02]' : 'hover:shadow-xl'
        }`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.4), 0 0 0 2px #334155'
        }}
      >
        {/* Hardware details: Side buttons */}
        <div className="absolute -left-[12px] top-[110px] w-[3px] h-[34px] bg-slate-700 rounded-l-sm" />
        <div className="absolute -left-[12px] top-[155px] w-[3px] h-[48px] bg-slate-700 rounded-l-sm" />
        <div className="absolute -right-[12px] top-[130px] w-[3px] h-[44px] bg-slate-700 rounded-r-sm" />

        {/* Screen Bezel & Screen Glass */}
        <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-[#EAF6FF] flex flex-col select-none">
          
          {/* Status Bar */}
          <div className="h-7 px-5 flex items-center justify-between text-[11px] font-semibold text-slate-700 z-30 pt-1">
            <span>9:41</span>
            
            {/* Camera Punch Hole */}
            <div className="w-3.5 h-3.5 rounded-full bg-black mx-auto ring-1 ring-slate-800" />
            
            {/* Status Icons */}
            <div className="flex items-center space-x-1.5 text-slate-700">
              {/* Cellular signal */}
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 18.25A10.93 10.93 0 0 1 1 12C1 5.92 5.92 1 12 1s11 4.92 11 11c0 2.3-.7 4.44-1.9 6.22l-.62-.62A9.97 9.97 0 0 0 21 12c0-4.97-4.03-9-9-9z"/>
                <path d="M12 7a5 5 0 0 0-5 5c0 1.25.46 2.39 1.22 3.28l.71-.71A3.99 3.99 0 0 1 8 12a4 4 0 0 1 8 0c0 .99-.36 1.89-.96 2.58l.71.71c.78-.9 1.25-2.06 1.25-3.29a5 5 0 0 0-5-5z"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>

              {/* Battery */}
              <div className="w-4 h-2.5 border border-slate-700 rounded-sm p-[1px] flex items-center">
                <div className="w-2.5 h-full bg-slate-700 rounded-xs" />
              </div>
            </div>
          </div>

          {/* Screen Content Body */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
            {children}
          </div>

          {/* Android Home Navigation Bar Line */}
          <div className="h-3 w-full flex items-center justify-center pb-1">
            <div className="w-28 h-1 bg-slate-400/50 rounded-full" />
          </div>

        </div>
      </div>
    </div>
  );
}
