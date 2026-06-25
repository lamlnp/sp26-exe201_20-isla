export const WEEK_DATA = [
  { day: "Mon", mood: 6 },
  { day: "Tue", mood: 5 },
  { day: "Wed", mood: 7 },
  { day: "Thu", mood: 6 },
  { day: "Fri", mood: 8 },
  { day: "Sat", mood: 7 },
  { day: "Sun", mood: 8 },
];

export const MONTH_DATA = [
  { day: "May 12", mood: 5 }, { day: "May 13", mood: 6 }, { day: "May 14", mood: 7 },
  { day: "May 15", mood: 6 }, { day: "May 16", mood: 4 }, { day: "May 17", mood: 5 },
  { day: "May 18", mood: 7 }, { day: "May 19", mood: 8 }, { day: "May 20", mood: 7 },
  { day: "May 21", mood: 6 }, { day: "May 22", mood: 8 }, { day: "May 23", mood: 7 },
  { day: "May 24", mood: 6 }, { day: "May 25", mood: 5 }, { day: "May 26", mood: 6 },
  { day: "May 27", mood: 7 }, { day: "May 28", mood: 8 }, { day: "May 29", mood: 7 },
  { day: "May 30", mood: 8 }, { day: "May 31", mood: 9 }, { day: "Jun 1", mood: 7 },
  { day: "Jun 2", mood: 6 }, { day: "Jun 3", mood: 8 }, { day: "Jun 4", mood: 7 },
  { day: "Jun 5", mood: 6 }, { day: "Jun 6", mood: 5 }, { day: "Jun 7", mood: 5 },
  { day: "Jun 8", mood: 9 }, { day: "Jun 9", mood: 4 }, { day: "Jun 10", mood: 7 },
  { day: "Jun 11", mood: 7 },
];

export const TOP_EMOTIONS = [
  { name: "Anxious", count: 12, color: "#F2B880" },
  { name: "Calm", count: 9, color: "#A7C7B7" },
  { name: "Happy", count: 8, color: "#2F7D72" },
  { name: "Tired", count: 7, color: "#6B7280" },
  { name: "Motivated", count: 6, color: "#DDEFEA" },
];

export const JOURNAL_ENTRIES = [
  {
    id: 1,
    title: "Processing exam stress",
    date: "Today, 9:14 AM",
    mood: 7,
    emotions: ["Anxious", "Motivated"],
    preview:
      "I've been feeling overwhelmed with three exams next week. I tried to break it down into smaller tasks today and it helped a bit...",
    hasReflection: true,
  },
  {
    id: 2,
    title: "After the group presentation",
    date: "Yesterday, 3:41 PM",
    mood: 8,
    emotions: ["Relieved", "Happy"],
    preview:
      "The presentation went better than I expected. I was so nervous beforehand but once I started talking I felt more grounded...",
    hasReflection: true,
  },
  {
    id: 3,
    title: "Feeling disconnected",
    date: "Jun 9, 8:02 PM",
    mood: 4,
    emotions: ["Sad", "Tired"],
    preview:
      "I don't really know why I feel this way today. Just sort of empty and disconnected from everything. Missing home a lot.",
    hasReflection: false,
  },
  {
    id: 4,
    title: "A really good day",
    date: "Jun 8, 10:30 AM",
    mood: 9,
    emotions: ["Happy", "Grateful"],
    preview:
      "Had coffee with Ana and Leo today. Laughed more than I have in weeks. We talked about our thesis ideas and I felt inspired again...",
    hasReflection: true,
  },
];

export const REFLECTION_CARDS = [
  {
    id: 1,
    name: "The Still Water",
    gradient: "linear-gradient(135deg, #2F7D72 0%, #DDEFEA 100%)",
    symbol: "◉",
    meaning:
      "A moment of unexpected stillness. This card invites you to notice what happens when external pressure pauses — even briefly.",
    prompt:
      "When was the last time you felt genuinely at ease? What were you doing, and what made that moment different?",
    theme: "Rest & Presence",
  },
  {
    id: 2,
    name: "The Crossing",
    gradient: "linear-gradient(135deg, #F2B880 0%, #FDDCB0 100%)",
    symbol: "✕",
    meaning:
      "Two paths meeting. This card appears when something is changing — perhaps a decision is approaching, or an old way of thinking is shifting.",
    prompt:
      "What is currently in transition in your life? Is there a part of you that wants to hold on, and a part that is ready to move forward?",
    theme: "Transition & Choice",
  },
  {
    id: 3,
    name: "The Inner Echo",
    gradient: "linear-gradient(135deg, #A7C7B7 0%, #F0F9F6 100%)",
    symbol: "))))",
    meaning:
      "A ripple moving outward from within. This card invites you to notice how your inner state is reflected in how you see the world.",
    prompt:
      "How does your current emotional state color the way you're interpreting what's happening around you today?",
    theme: "Self-awareness",
  },
  {
    id: 4,
    name: "The Weight",
    gradient: "linear-gradient(135deg, #263238 0%, #6B7280 100%)",
    symbol: "▲",
    meaning:
      "Something that feels heavy right now. Not a bad sign — it often means you are carrying something important that deserves acknowledgment.",
    prompt:
      "What feels heavy to you lately? Have you allowed yourself to acknowledge that weight, or have you been trying to push through it?",
    theme: "Acknowledgment",
  },
  {
    id: 5,
    name: "The Open Field",
    gradient: "linear-gradient(135deg, #DDEFEA 0%, #F7F4ED 100%)",
    symbol: "○",
    meaning:
      "Openness and spaciousness. This card appears when you might benefit from letting go of rigid expectations and exploring what's possible.",
    prompt:
      "What would you explore if you weren't afraid of getting it wrong? What does 'open' feel like in your body right now?",
    theme: "Freedom & Curiosity",
  },
];

export const CBT_STEPS = [
  {
    id: 0,
    label: "Situation",
    emoji: "📍",
    title: "What happened?",
    desc: "Briefly describe the situation that triggered your emotional reaction. Stick to the facts — what, where, when.",
    placeholder: "e.g. I got a lower grade than expected on my midterm exam this morning.",
  },
  {
    id: 1,
    label: "Emotion",
    emoji: "💛",
    title: "What did you feel?",
    desc: "Name the emotions you experienced. Try to rate how intense each emotion was (0–100%).",
    placeholder: "e.g. Anxious (80%), Disappointed (70%), Ashamed (50%)",
  },
  {
    id: 2,
    label: "Auto-thought",
    emoji: "⚡",
    title: "What thought crossed your mind?",
    desc: "What was the first thought that popped into your head right after? This is called an automatic thought.",
    placeholder: "e.g. \"I'm going to fail this semester. I'm not smart enough for this course.\"",
  },
  {
    id: 3,
    label: "Evidence for",
    emoji: "✅",
    title: "Evidence supporting this thought",
    desc: "List the facts that seem to support that automatic thought. Be specific.",
    placeholder: "e.g. I scored 58/100. I also missed two lectures. I struggled with the last assignment.",
  },
  {
    id: 4,
    label: "Evidence against",
    emoji: "🔄",
    title: "Evidence against this thought",
    desc: "Now list facts that challenge or contradict the automatic thought. Be as thorough as you can.",
    placeholder: "e.g. I passed all previous exams. My professor said I ask good questions. I've handled hard semesters before.",
  },
  {
    id: 5,
    label: "Balanced thought",
    emoji: "⚖️",
    title: "A more balanced perspective",
    desc: "Based on all the evidence, write a more balanced thought that acknowledges both sides.",
    placeholder: "e.g. \"This exam result is disappointing, but it doesn't define my intelligence or my semester. I can learn from it and adjust my study approach.\"",
    isLast: false,
  },
  {
    id: 6,
    label: "After reframe",
    emoji: "🌿",
    title: "Mood after reframing",
    desc: "How do you feel now, after going through this exercise? Rate the same emotions again (0–100%).",
    placeholder: "e.g. Anxious (45%), Disappointed (40%), Motivated (60%) — I feel more in control now.",
    isLast: true,
  },
];

export const ONBOARDING_STEPS = [
  {
    emoji: "🌿",
    title: "Your private space",
    desc: "Everything you write here stays with you. No sharing, no social feeds, no ads.",
    bg: "#F0F9F6",
    important: false,
  },
  {
    emoji: "📝",
    title: "Track how you feel",
    desc: "A quick mood check-in each day helps you notice patterns and understand yourself better.",
    bg: "#FFF8F0",
    important: false,
  },
  {
    emoji: "✨",
    title: "Gentle AI reflections",
    desc: "After journaling, you can ask for an AI-generated reflection — not advice, just a thoughtful mirror.",
    bg: "#F0F4F9",
    important: false,
  },
  {
    emoji: "🧠",
    title: "CBT-inspired tools",
    desc: "Optional exercises based on Cognitive Behavioral Therapy help you examine thoughts with curiosity.",
    bg: "#F9F0F9",
    important: false,
  },
  {
    emoji: "🛡️",
    title: "Not therapy",
    desc: "IslaMind is a self-reflection aid only. Please reach out to a professional or emergency services if you need real support.",
    bg: "#FFF5F5",
    important: true,
  },
];
