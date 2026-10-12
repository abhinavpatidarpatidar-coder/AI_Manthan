import React, { useState, useEffect } from 'react';
import PhoneContainer from './components/PhoneContainer';
import HomeScreen from './components/HomeScreen';
import AnswerScreen from './components/AnswerScreen';
import QuizScreen from './components/QuizScreen';
import TeacherScreen from './components/TeacherScreen';

export default function App() {
  const [viewMode, setViewMode] = useState('collage'); // 'collage' (all 4 phones) or 'interactive' (single active phone)
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home' | 'answer' | 'quiz' | 'teacher'
  const [stars, setStars] = useState(12);
  const [isListening, setIsListening] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [apiStatus, setApiStatus] = useState('checking');

  // Backend API URL
  const BACKEND_URL = 'http://localhost:5000';

  useEffect(() => {
    // Check if backend is alive
    fetch(`${BACKEND_URL}/api/health`)
      .then(res => res.json())
      .then(data => {
        setApiStatus('connected');
        console.log('Connected to Gyan Saathi Backend:', data);
      })
      .catch(err => {
        setApiStatus('offline');
        console.log('Running in offline/local client mode');
      });
  }, []);

  // Web Speech Synthesis (Hindi Voice)
  const speakHindi = (text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1.1;

    setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  // Trigger Voice Doubt Flow (Enabled Feature)
  const handleMicClick = () => {
    setIsListening(true);
    
    // Simulate voice listening or use Web Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'hi-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
          const speechResult = event.results[0][0].transcript;
          console.log('Speech Recognized:', speechResult);
          fetchDoubtAnswer(speechResult);
        };

        recognition.onerror = (e) => {
          console.warn('Speech error, fallback to default doubt query:', e);
          setTimeout(() => {
            fetchDoubtAnswer('पौधे अपना खाना कैसे बनाते हैं?');
          }, 1200);
        };

        recognition.start();
        return;
      } catch (e) {
        console.log('Fallback to simulated recognition');
      }
    }

    // Fallback simulation timer
    setTimeout(() => {
      fetchDoubtAnswer('पौधे अपना खाना कैसे बनाते हैं?');
    }, 1500);
  };

  // Fetch doubt resolution from backend
  const fetchDoubtAnswer = async (queryText) => {
    setIsListening(false);
    try {
      const res = await fetch(`${BACKEND_URL}/api/doubt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText, classNumber: 6, subject: 'Science' })
      });
      const data = await res.json();
      setCurrentScreen('answer');
      setStars(25); // matching Screen 2 photo
      if (data?.answer?.speech) {
        speakHindi(data.answer.speech);
      } else {
        speakHindi('पौधे सूर्य से अपना खाना बनाते हैं। इसे photosynthesis कहते हैं।');
      }
    } catch (err) {
      // Offline fallback
      setCurrentScreen('answer');
      setStars(25);
      speakHindi('पौधे सूर्य से अपना खाना बनाते हैं। इसे photosynthesis कहते हैं।');
    }
  };

  const handleAudioPlay = () => {
    speakHindi('पौधे सूर्य की रोशनी से अपना खाना बनाते हैं। इसे फोटोसिंथेसिस कहते हैं।');
  };

  const handleSamajhAaya = () => {
    setStars(prev => prev + 3);
    speakHindi('बहुत अच्छा! अब एक छोटा सा सवाल हल करते हैं!');
    setCurrentScreen('quiz');
  };

  const handlePhirSamjhao = () => {
    speakHindi('जैसे रसोई में चूल्हे की धूप और पानी से रोटी बनती है, वैसे ही पत्तियां धूप से भोजन बनाती हैं।');
  };

  const handleAurBatao = () => {
    speakHindi('पौधे अपनी हरी पत्तियों में क्लोरोफिल की मदद से धूप, हवा और पानी से ग्लूकोज बनाते हैं।');
  };

  const handleAnswerSubmit = (isCorrect) => {
    if (isCorrect) {
      setStars(prev => prev + 5);
      speakHindi('शाबाश! बिल्कुल सही जवाब!');
    } else {
      speakHindi('थोड़ा और सोचो! पौधे दिन में धूप की तरफ क्यों झुकते हैं?');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 py-3 sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center font-black text-white text-lg shadow-md shadow-sky-500/20">
            ग्य
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-2">
              Gyan Saathi (ज्ञान साथी)
              <span className="text-[10px] font-semibold bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded-full border border-sky-500/30">
                AI Manthan 2.0
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Rural Education AI Tutor • React + Node.js Prototype
            </p>
          </div>
        </div>

        {/* View Mode & Voice Controls */}
        <div className="flex items-center space-x-2">
          {/* Audio toggle */}
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 border transition-all cursor-pointer ${
              voiceEnabled
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            <span>{voiceEnabled ? '🔊 Hindi Voice ON' : '🔇 Audio Muted'}</span>
          </button>

          {/* Backend Status indicator */}
          <div className="hidden sm:flex items-center space-x-1.5 text-xs bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700">
            <span className={`w-2 h-2 rounded-full ${apiStatus === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-slate-300">
              {apiStatus === 'connected' ? 'Node.js API Connected' : 'Offline Engine Active'}
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="bg-slate-800 p-1 rounded-xl flex items-center border border-slate-700">
            <button
              onClick={() => setViewMode('collage')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'collage'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              4-Screen Photo View
            </button>
            <button
              onClick={() => setViewMode('interactive')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'interactive'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Interactive App
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 overflow-x-auto">
        
        {/* COLLAGE MODE: All 4 Phones Side-by-Side (Matching user's attachment photo) */}
        {viewMode === 'collage' && (
          <div className="w-full max-w-7xl">
            <div className="text-center mb-6">
              <span className="bg-sky-950 text-sky-400 text-xs font-bold px-3 py-1 rounded-full border border-sky-800/60 uppercase tracking-widest">
                Exact Reference Layout (4 Screens)
              </span>
              <h2 className="text-xl sm:text-2xl font-bold mt-2 text-white">
                Gyan Saathi Student & Teacher Application
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mt-1">
                Voice-first, Devanagari typography, kind feedback, and 30-second teacher visibility.
              </p>
            </div>

            {/* 4 Phones Grid */}
            <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8 pb-8">
              
              {/* Phone 1: Home */}
              <PhoneContainer label="Screen 1: Home (Child)">
                <HomeScreen
                  stars={12}
                  onMicClick={handleMicClick}
                  onNavigate={(screen) => {
                    setViewMode('interactive');
                    setCurrentScreen(screen);
                  }}
                  isListening={isListening}
                />
              </PhoneContainer>

              {/* Phone 2: Answer */}
              <PhoneContainer label="Screen 2: Spoken Answer">
                <AnswerScreen
                  stars={25}
                  onAudioPlay={handleAudioPlay}
                  onSamajhAaya={() => {
                    setViewMode('interactive');
                    handleSamajhAaya();
                  }}
                  onPhirSamjhao={handlePhirSamjhao}
                  onAurBatao={handleAurBatao}
                  isPlayingAudio={isPlayingAudio}
                />
              </PhoneContainer>

              {/* Phone 3: Quiz */}
              <PhoneContainer label="Screen 3: Quiz & Stars">
                <QuizScreen
                  onAnswerSubmit={handleAnswerSubmit}
                  onQuizComplete={() => setStars(prev => prev + 5)}
                />
              </PhoneContainer>

              {/* Phone 4: Teacher */}
              <PhoneContainer label="Screen 4: Teacher Dashboard">
                <TeacherScreen
                  stars={12}
                  onSelectStudent={(s) => console.log('Selected student:', s)}
                />
              </PhoneContainer>

            </div>

            {/* Switch to interactive button banner */}
            <div className="text-center pt-2 pb-6">
              <button
                onClick={() => setViewMode('interactive')}
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-6 py-2.5 rounded-full shadow-lg shadow-sky-500/25 cursor-pointer transition-all active:scale-95 text-sm"
              >
                🎮 Live Interactive Mode चलाएं (Test Voice & Quiz Live)
              </button>
            </div>
          </div>
        )}

        {/* INTERACTIVE MODE: Single Active Smartphone Simulator */}
        {viewMode === 'interactive' && (
          <div className="flex flex-col items-center my-auto py-2">
            
            {/* Screen Navigation Tabs */}
            <div className="flex items-center space-x-2 mb-4 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 shadow-md">
              <button
                onClick={() => setCurrentScreen('home')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentScreen === 'home'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1. Home (बोलिए)
              </button>
              <button
                onClick={() => setCurrentScreen('answer')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentScreen === 'answer'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                2. Answer (उत्तर)
              </button>
              <button
                onClick={() => setCurrentScreen('quiz')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentScreen === 'quiz'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                3. Quiz (परीक्षा)
              </button>
              <button
                onClick={() => setCurrentScreen('teacher')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentScreen === 'teacher'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                4. Teacher (शिक्षक)
              </button>
            </div>

            {/* Single Interactive Phone */}
            <PhoneContainer
              label={`Active View: ${currentScreen.toUpperCase()}`}
              active={true}
            >
              {currentScreen === 'home' && (
                <HomeScreen
                  stars={stars}
                  onMicClick={handleMicClick}
                  onNavigate={(screen) => setCurrentScreen(screen)}
                  isListening={isListening}
                />
              )}

              {currentScreen === 'answer' && (
                <AnswerScreen
                  stars={stars}
                  onAudioPlay={handleAudioPlay}
                  onSamajhAaya={handleSamajhAaya}
                  onPhirSamjhao={handlePhirSamjhao}
                  onAurBatao={handleAurBatao}
                  isPlayingAudio={isPlayingAudio}
                />
              )}

              {currentScreen === 'quiz' && (
                <QuizScreen
                  onAnswerSubmit={handleAnswerSubmit}
                  onQuizComplete={() => setStars(prev => prev + 5)}
                />
              )}

              {currentScreen === 'teacher' && (
                <TeacherScreen
                  stars={stars}
                  onSelectStudent={(s) => console.log('Student selected:', s)}
                />
              )}
            </PhoneContainer>

            {/* Interactive instructions helper */}
            <div className="mt-4 max-w-sm text-center text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-sky-400">💡 Interactive Features Enabled:</span>
              <p className="mt-1">
                • <strong>Home</strong>: Tap the big orange <strong>"बोलिए"</strong> button to ask doubt.<br/>
                • <strong>Answer</strong>: Listen to Hindi voice, click <strong>"Aur batao"</strong>, or try <strong>"Phir samjhao"</strong>.<br/>
                • <strong>Quiz</strong>: Tap options for positive reinforcement.
              </p>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 py-3 px-4 text-center text-xs text-slate-500">
        Team M.A.R.K. • AI Manthan 2.0 • Har gaon ke bachche ke liye ek AI dost, bina internet, bina tuition fees.
      </footer>
    </div>
  );
}
