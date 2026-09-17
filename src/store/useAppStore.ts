import { create } from 'zustand';
import { Deck, Flashcard, QuizAttempt, UserProfile } from '../types';
import { StorageService } from '../services/storage';

interface AppState {
  profile: UserProfile;
  decks: Deck[];
  flashcards: Flashcard[];
  quizAttempts: QuizAttempt[];
  isLoading: boolean;

  // Actions
  initialize: () => Promise<void>;
  createDeck: (title: string, description: string, category: string, coverColor: string) => void;
  deleteDeck: (deckId: string) => void;
  addFlashcards: (cards: Flashcard[]) => void;
  toggleBookmark: (cardId: string) => void;
  recordQuizAttempt: (attempt: QuizAttempt) => void;
  updateStreak: () => void;
}

const INITIAL_PROFILE: UserProfile = {
  id: 'usr_101',
  name: 'Alex Student',
  email: 'alex@university.edu',
  currentStreak: 7,
  longestStreak: 14,
  totalStudyDays: 22,
  lastStudyDate: new Date().toISOString().split('T')[0],
};

const INITIAL_DECKS: Deck[] = [
  {
    id: 'deck_1',
    title: 'Computer Science & OS',
    description: 'Kernel architectures, memory management, and threads.',
    category: 'Computer Science',
    coverColor: '#6366F1',
    cardCount: 5,
    createdAt: new Date().toISOString(),
    studyProgress: 0.6,
  },
  {
    id: 'deck_2',
    title: 'Human Biology 101',
    description: 'Cellular respiration, anatomy, and circulatory systems.',
    category: 'Biology',
    coverColor: '#10B981',
    cardCount: 4,
    createdAt: new Date().toISOString(),
    studyProgress: 0.2,
  },
];

const INITIAL_CARDS: Flashcard[] = [
  {
    id: 'c1',
    deckId: 'deck_1',
    question: 'What is the main difference between a Process and a Thread?',
    answer: 'A process has its own virtual address space, while threads within a process share memory space and resources.',
    hint: 'Think about memory sharing.',
    explanation: 'Threads are lightweight execution units within a parent process sharing heap and code segments.',
    isBookmarked: true,
  },
  {
    id: 'c2',
    deckId: 'deck_1',
    question: 'What is Virtual Memory?',
    answer: 'A memory management technique that creates an illusion to users of a very large main memory by using disk space.',
    hint: 'Relates RAM to hard drive disk paging.',
    explanation: 'Uses page tables to translate virtual addresses to physical RAM addresses.',
  },
  {
    id: 'c3',
    deckId: 'deck_2',
    question: 'What organelle is responsible for cellular ATP production?',
    answer: 'Mitochondrion (Mitochondria)',
    hint: 'Powerhouse of the cell.',
    explanation: 'Mitochondria produce ATP through oxidative phosphorylation.',
  },
];

export const useAppStore = create<AppState>((set, get) => ({
  profile: INITIAL_PROFILE,
  decks: INITIAL_DECKS,
  flashcards: INITIAL_CARDS,
  quizAttempts: [],
  isLoading: true,

  initialize: async () => {
    try {
      const savedDecks = await StorageService.getDecks();
      const savedCards = await StorageService.getCards();
      const savedAttempts = await StorageService.getAttempts();
      const savedProfile = await StorageService.getProfile();

      set({
        decks: savedDecks || INITIAL_DECKS,
        flashcards: savedCards || INITIAL_CARDS,
        quizAttempts: savedAttempts || [],
        profile: savedProfile || INITIAL_PROFILE,
        isLoading: false,
      });
    } catch (e) {
      console.error('Initialization error', e);
      set({ isLoading: false });
    }
  },

  createDeck: (title, description, category, coverColor) => {
    const newDeck: Deck = {
      id: `deck_${Date.now()}`,
      title,
      description,
      category,
      coverColor,
      cardCount: 0,
      createdAt: new Date().toISOString(),
      studyProgress: 0,
    };
    const updated = [newDeck, ...get().decks];
    set({ decks: updated });
    StorageService.saveDecks(updated);
  },

  deleteDeck: (deckId) => {
    const updatedDecks = get().decks.filter((d) => d.id !== deckId);
    const updatedCards = get().flashcards.filter((c) => c.deckId !== deckId);
    set({ decks: updatedDecks, flashcards: updatedCards });
    StorageService.saveDecks(updatedDecks);
    StorageService.saveCards(updatedCards);
  },

  addFlashcards: (newCards) => {
    const updatedCards = [...get().flashcards, ...newCards];
    
    // Update deck card counts
    const deckCounts: Record<string, number> = {};
    updatedCards.forEach((c) => {
      deckCounts[c.deckId] = (deckCounts[c.deckId] || 0) + 1;
    });

    const updatedDecks = get().decks.map((deck) => ({
      ...deck,
      cardCount: deckCounts[deck.id] || deck.cardCount,
    }));

    set({ flashcards: updatedCards, decks: updatedDecks });
    StorageService.saveCards(updatedCards);
    StorageService.saveDecks(updatedDecks);
  },

  toggleBookmark: (cardId) => {
    const updated = get().flashcards.map((c) =>
      c.id === cardId ? { ...c, isBookmarked: !c.isBookmarked } : c
    );
    set({ flashcards: updated });
    StorageService.saveCards(updated);
  },

  recordQuizAttempt: (attempt) => {
    const updatedAttempts = [attempt, ...get().quizAttempts];
    set({ quizAttempts: updatedAttempts });
    StorageService.saveAttempts(updatedAttempts);
    get().updateStreak();
  },

  updateStreak: () => {
    const today = new Date().toISOString().split('T')[0];
    const profile = get().profile;

    if (profile.lastStudyDate === today) return; // Already recorded today

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const isConsecutive = profile.lastStudyDate === yesterday;

    const newStreak = isConsecutive ? profile.currentStreak + 1 : 1;
    const newProfile: UserProfile = {
      ...profile,
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, profile.longestStreak),
      totalStudyDays: profile.totalStudyDays + 1,
      lastStudyDate: today,
    };

    set({ profile: newProfile });
    StorageService.saveProfile(newProfile);
  },
}));