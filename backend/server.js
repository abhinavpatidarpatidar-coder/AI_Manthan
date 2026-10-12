// Gyan Saathi - Backend Engine (Node.js & Express)
// Built for AI Manthan 2.0 - Team M.A.R.K.
// Handles Voice Doubt Resolution, Curriculum Grounding, Adaptive Explanations & Teacher Analytics

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Curriculum Knowledge Base (Class 6 Science NCERT)
const CURRICULUM_DATA = {
  photosynthesis: {
    id: "photosynthesis",
    topic: "Photosynthesis (प्रकाश संश्लेषण)",
    class: 6,
    subject: "Science",
    keywords: ["khana", "patti", "leaf", "plant", "paudhe", "dhoop", "photosynthesis", "roshni", "bhojan", "surya"],
    answerHindi: "पौधे सूर्य से अपना खाना बनाते हैं। इसे photosynthesis कहते हैं।",
    speechHindi: "पौधे सूर्य की रोशनी, पानी और हवा से अपना खाना बनाते हैं। इसे फोटोसिंथेसिस कहते हैं।",
    imageType: "leaf_photosynthesis",
    detailedHindi: "पौधे अपनी हरी पत्तियों में क्लोरोफिल (chlorophyll) की मदद से धूप, हवा (कार्बन डाइऑक्साइड) और मिट्टी के पानी को मिलाकर ग्लूकोज (भोजन) बनाते हैं और ऑक्सीजन छोड़ते हैं।",
    simplifiedAnalogyHindi: "जैसे रसोई में चूल्हे की गर्मी और पानी-आटे से रोटी बनती है, वैसे ही पौधे सूरज की धूप और पानी से अपनी पत्तियों में खाना बनाते हैं।",
    quiz: {
      id: "q_photo_1",
      question: "पौधे अपना खाना बनाने के लिए क्या इस्तेमाल करते हैं?",
      options: [
        { id: "opt1", label: "सूरज की रोशनी", subLabel: "Sunlight", icon: "sun_leaf", isCorrect: true },
        { id: "opt2", label: "पानी और मिट्टी", subLabel: "Water & Soil", icon: "water_soil", isCorrect: false }
      ],
      hint: "सोचो! तुम्हें इसका जवाब पता है! दिन के समय पौधे धूप में क्या लेते हैं?",
      correctEncouragement: "शाबाश! बिल्कुल सही जवाब! ⭐",
      retryEncouragement: "थोड़ा और सोचो। पौधे दिन में धूप की तरफ क्यों झुकते हैं?"
    }
  },
  water_cycle: {
    id: "water_cycle",
    topic: "Water Cycle (जल चक्र)",
    class: 6,
    subject: "Science",
    keywords: ["water", "pani", "barish", "rain", "badal", "cloud"],
    answerHindi: "सूरज की गर्मी से नदी-तालाब का पानी भाप बनकर उड़ता है और बादल बनकर बारिश करता है।",
    speechHindi: "सूरज की गर्मी से पानी भाप बनता है और ऊपर जाकर बादल बनता है, फिर बारिश के रूप में वापस आता है।",
    imageType: "water_cycle",
    detailedHindi: "वाष्पीकरण (Evaporation) से पानी भाप बनता है। ऊपर ठंड में संघनन (Condensation) से बादल बनते हैं और वर्षण (Precipitation) से बारिश होती है।",
    simplifiedAnalogyHindi: "जैसे गर्म चाय या पतीले से भाप उठती है और ढक्कन पर पानी की बूंदें बन जाती हैं, वैसे ही बादल बनते हैं।",
    quiz: {
      id: "q_water_1",
      question: "बादल कैसे बनते हैं?",
      options: [
        { id: "opt1", label: "भाप के ठंडे होने से", subLabel: "Condensation", icon: "cloud", isCorrect: true },
        { id: "opt2", label: "धुएं से", subLabel: "Smoke", icon: "smoke", isCorrect: false }
      ],
      hint: "सोचो! जब पानी गर्म होकर ऊपर जाता है तो क्या होता है?",
      correctEncouragement: "अरे वाह! बहुत अच्छा! ⭐",
      retryEncouragement: "कोई बात नहीं! सोचो भाप ऊपर जाकर ठंडी होती है तो क्या बनती है?"
    }
  }
};

// Teacher Dashboard Student Roster (Matching Screen 4)
const STUDENTS_ROSTER = [
  { id: "std_1", name: "Aman", class: 6, score: 85, status: "good", icon: "✓", color: "green", weakTopics: [] },
  { id: "std_2", name: "Riya", class: 6, score: 60, status: "nudge", icon: "!", color: "yellow", weakTopics: ["Photosynthesis"] },
  { id: "std_3", name: "Rahul", class: 6, score: 35, status: "struggling", icon: "⚠", color: "orange", weakTopics: ["Fractions", "Leaves"] },
  { id: "std_4", name: "Sanan", class: 6, score: 38, status: "struggling", icon: "⚠", color: "orange", weakTopics: ["Water Cycle"] },
  { id: "std_5", name: "Rana", class: 6, score: 92, status: "good", icon: "✓", color: "green", weakTopics: [] },
  { id: "std_6", name: "Rana", class: 6, score: 80, status: "good", icon: "✓", color: "green", weakTopics: [] },
  { id: "std_7", name: "Rahul", class: 6, score: 42, status: "struggling", icon: "⚠", color: "orange", weakTopics: ["Solar Energy"] }
];

// In-memory student progress state for Riya (our demo child)
let riyaProgress = {
  stars: 12,
  completedTopics: ["Food Components"],
  currentTopic: "photosynthesis",
  quizProgress: { current: 2, total: 4 }
};

// ================= API ROUTES =================

// 1. Health & Offline Status
app.get('/api/health', (req, res) => {
  res.json({
    status: "ok",
    app: "Gyan Saathi Backend",
    version: "1.0.0",
    offlineReady: true,
    localCacheActive: true
  });
});

// 2. Ask Doubt (Core Feature)
app.post('/api/doubt', (req, res) => {
  const { query, classNumber = 6, subject = "Science" } = req.body;
  const lowerQuery = (query || "").toLowerCase();

  // Keyword match in local curriculum
  let matchedTopic = CURRICULUM_DATA.photosynthesis; // default to flagship topic
  for (const key in CURRICULUM_DATA) {
    const item = CURRICULUM_DATA[key];
    if (item.keywords.some(kw => lowerQuery.includes(kw))) {
      matchedTopic = item;
      break;
    }
  }

  // Update Riya's current topic
  riyaProgress.currentTopic = matchedTopic.id;

  res.json({
    success: true,
    doubtId: `d_${Date.now()}`,
    query: query || "पौधे अपना खाना कैसे बनाते हैं?",
    topic: matchedTopic.topic,
    mascotState: "happy",
    mascotGreeting: "Namaste, Riya!",
    answer: {
      text: matchedTopic.answerHindi,
      speech: matchedTopic.speechHindi,
      imageType: matchedTopic.imageType,
      hasMoreDetails: true,
      starsCount: riyaProgress.stars
    }
  });
});

// 3. Adaptive Explanation ("Aur batao" & "Phir samjhao")
app.post('/api/explain', (req, res) => {
  const { topicId = "photosynthesis", mode = "more" } = req.body; // mode: "more" or "simpler"
  const topic = CURRICULUM_DATA[topicId] || CURRICULUM_DATA.photosynthesis;

  if (mode === "simpler") {
    // "Phir samjhao" - returns village-friendly analogy
    res.json({
      success: true,
      mode: "simpler",
      title: "आसान भाषा में समझें 💡",
      explanation: topic.simplifiedAnalogyHindi,
      speech: topic.simplifiedAnalogyHindi,
      mascotMood: "encouraging",
      nextAction: "take_quiz"
    });
  } else {
    // "Aur batao" - expands science concepts
    res.json({
      success: true,
      mode: "more",
      title: "विस्तार से जानें 🔬",
      explanation: topic.detailedHindi,
      speech: topic.detailedHindi,
      mascotMood: "thinking",
      nextAction: "take_quiz"
    });
  }
});

// 4. "Samajh aaya" feedback & Star reward
app.post('/api/feedback', (req, res) => {
  const { feedbackType } = req.body; // "understood" or "reexplain"
  if (feedbackType === "understood") {
    riyaProgress.stars += 3;
    res.json({
      success: true,
      message: "बहुत अच्छा! 3 सितारे मिले! ⭐",
      newStars: riyaProgress.stars,
      readyForQuiz: true,
      suggestedQuizId: CURRICULUM_DATA.photosynthesis.quiz.id
    });
  } else {
    res.json({
      success: true,
      message: "कोई बात नहीं! हम इसे और सरल उदाहरण से समझते हैं।",
      simplerAnalogy: CURRICULUM_DATA.photosynthesis.simplifiedAnalogyHindi
    });
  }
});

// 5. Quiz endpoint (Matches Screen 3)
app.get('/api/quiz', (req, res) => {
  const topicId = req.query.topic || riyaProgress.currentTopic || "photosynthesis";
  const topic = CURRICULUM_DATA[topicId] || CURRICULUM_DATA.photosynthesis;
  
  res.json({
    success: true,
    progress: riyaProgress.quizProgress,
    stars: riyaProgress.stars,
    quiz: topic.quiz
  });
});

// 6. Submit Quiz Answer
app.post('/api/quiz/submit', (req, res) => {
  const { quizId, selectedOptionId } = req.body;
  const topic = CURRICULUM_DATA.photosynthesis;
  const isCorrect = selectedOptionId === "opt1";

  if (isCorrect) {
    riyaProgress.stars += 5;
    riyaProgress.quizProgress.current = Math.min(riyaProgress.quizProgress.current + 1, 4);
    res.json({
      success: true,
      isCorrect: true,
      earnedStars: 5,
      totalStars: riyaProgress.stars,
      feedback: topic.quiz.correctEncouragement,
      nextStep: "completed"
    });
  } else {
    res.json({
      success: true,
      isCorrect: false,
      feedback: topic.quiz.retryEncouragement,
      hint: topic.quiz.hint
    });
  }
});

// 7. Teacher Dashboard Endpoints (Matches Screen 4)
app.get('/api/teacher/students', (req, res) => {
  const { filter = "all" } = req.query;
  let students = STUDENTS_ROSTER;
  if (filter === "need_help") {
    students = students.filter(s => s.status === "struggling" || s.status === "nudge");
  }

  res.json({
    success: true,
    className: "Class 6 - Science",
    totalStudents: STUDENTS_ROSTER.length,
    weakTopicSummary: "Fractions, Photosynthesis",
    lastSync: "2 min ago (Offline Cached)",
    students
  });
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🌾 Gyan Saathi API Server running on port ${PORT}`);
  console.log(`📖 Grounded in Class 6 NCERT Science Curriculum`);
  console.log(`🤖 Voice & Quiz Endpoints Ready!`);
  console.log(`===============================================`);
});
