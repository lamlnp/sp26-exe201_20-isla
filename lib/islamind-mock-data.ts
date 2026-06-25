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
