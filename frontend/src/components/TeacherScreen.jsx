import React, { useState } from 'react';

const STUDENTS_DATA = [
  { id: 1, name: "Aman", gender: "boy", status: "good", icon: "✓", weakTopic: null },
  { id: 2, name: "Riya", gender: "girl", status: "nudge", icon: "!", weakTopic: "Photosynthesis" },
  { id: 3, name: "Rahul", gender: "boy", status: "struggling", icon: "⚠", weakTopic: "Fractions, Leaves" },
  { id: 4, name: "Sanan", gender: "girl", status: "struggling", icon: "⚠", weakTopic: "Water Cycle" },
  { id: 5, name: "Rana", gender: "boy", status: "good", icon: "✓", weakTopic: null },
  { id: 6, name: "Rana", gender: "boy", status: "good", icon: "✓", weakTopic: null },
  { id: 7, name: "Rahul", gender: "girl", status: "struggling", icon: "⚠", weakTopic: "Solar Energy" },
];

export default function TeacherScreen({ stars = 12, onSelectStudent }) {
  const [filter, setFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const displayedStudents = filter === "need_help"
    ? STUDENTS_DATA.filter(s => s.status !== "good")
    : STUDENTS_DATA;

  const handleStudentClick = (student) => {
    setSelectedStudent(student.id === selectedStudent?.id ? null : student);
    if (onSelectStudent) onSelectStudent(student);
  };

  return (
    <div className="flex-1 flex flex-col bg-white relative font-sans">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between p-3 bg-[#EAF6FF]">
        {/* Stars Badge */}
        <div className="flex items-center space-x-1.5 bg-white/90 px-3 py-1 rounded-full shadow-xs border border-amber-200">
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

      {/* Deep Navy Blue Header Banner */}
      <div className="bg-[#1F3A6E] text-white py-3.5 px-4 text-center shadow-md">
        <h1 className="text-[18px] font-extrabold tracking-wide">
          Class 6 - Science
        </h1>
        <div className="flex justify-center space-x-2 mt-2">
          <button
            onClick={() => setFilter('all')}
            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full cursor-pointer transition-all ${
              filter === 'all' ? 'bg-white text-[#1F3A6E]' : 'bg-white/20 text-white'
            }`}
          >
            Sab (All)
          </button>
          <button
            onClick={() => setFilter('need_help')}
            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full cursor-pointer transition-all ${
              filter === 'need_help' ? 'bg-amber-400 text-slate-900' : 'bg-white/20 text-white'
            }`}
          >
            Madad chahiye (Needs help)
          </button>
        </div>
      </div>

      {/* Student List */}
      <div className="flex-1 overflow-y-auto px-4 py-2 divide-y divide-slate-100">
        {displayedStudents.map((student, idx) => (
          <div
            key={idx}
            onClick={() => handleStudentClick(student)}
            className="py-2.5 flex flex-col cursor-pointer hover:bg-slate-50 transition-colors rounded-lg px-1.5"
          >
            <div className="flex items-center justify-between">
              
              {/* Left: Avatar & Name */}
              <div className="flex items-center space-x-3">
                {/* Avatar Icon */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm shadow-xs ${
                  student.gender === 'girl' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {student.gender === 'girl' ? '👧' : '👦'}
                </div>

                <span className="text-[15px] font-semibold text-slate-800">
                  {student.name}
                </span>
              </div>

              {/* Right: Status Pill & Icon */}
              <div className="flex items-center space-x-1.5">
                {student.status === 'good' && (
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                  </div>
                )}

                {student.status === 'nudge' && (
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                      !
                    </span>
                  </div>
                )}

                {student.status === 'struggling' && (
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
                    <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-bold">
                      ⚠
                    </span>
                  </div>
                )}
              </div>

            </div>

            {/* Expanded student detail */}
            {selectedStudent?.id === student.id && student.weakTopic && (
              <div className="mt-2 text-xs bg-amber-50 p-2 rounded-lg text-amber-900 border border-amber-200">
                <span className="font-bold">Kamzor vishay: </span>
                <span>{student.weakTopic}</span>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
