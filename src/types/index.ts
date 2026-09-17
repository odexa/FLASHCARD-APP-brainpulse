export type QuestionType = 'multiple-choice' | 'true-false' | 'identification' | 'fill-in-blanks';

export interface Flashcard {
  id: string;
  deckId: string;
  question: string;
  answer: string;
  hint?: string;
  explanation?: string;
  image?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  isBookmarked?: boolean;
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  category: string;
  coverColor: string;
  cardCount: number;
  createdAt: string;
  lastStudiedAt?: string;
  studyProgress: number; // 0 to 1
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[]; // For multiple choice
  correctAnswer: string; // Or index string for MC
  explanation?: string;
  hint?: string;
}

export interface QuizConfig {
  deckId: string;
  questionCount: number;
  questionTypes: QuestionType[];
  timeLimitPerQuestion: number; // 0 for no limit, else seconds
  passingScore: number; // Percentage, e.g. 70
}

export interface QuizAttempt {
  id: string;
  deckId: string;
  deckTitle: string;
  score: number;
  percentage: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedAnswers: number;
  hintsUsed: number;
  answersRevealed: number;
  timeTakenSeconds: number;
  completedAt: string;
  questionDetails: {
    questionId: string;
    questionText: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    usedHint: boolean;
    revealedAnswer: boolean;
  }[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  currentStreak: number;
  longestStreak: number;
  totalStudyDays: number;
  lastStudyDate?: string; // YYYY-MM-DD
}