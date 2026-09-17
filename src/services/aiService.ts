import { Flashcard, QuestionType, QuizQuestion } from '../types';

interface GenerateOptions {
  sourceText: string;
  cardCount: number;
  questionTypes: QuestionType[];
  difficulty: 'easy' | 'medium' | 'hard';
}

/**
 * Secure Service Abstraction for AI Generation.
 * Production implementation proxies requests through an authenticated backend server.
 */
export const AIService = {
  async generateCardsAndQuestions(
    options: GenerateOptions,
    deckId: string
  ): Promise<{ cards: Flashcard[]; questions: QuizQuestion[] }> {
    // Simulate API Network Latency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!options.sourceText || options.sourceText.trim().length === 0) {
      throw new Error('Source text cannot be empty.');
    }

    const sentences = options.sourceText.split('\n').filter((s) => s.trim().length > 0);
    const generatedCards: Flashcard[] = [];
    const generatedQuestions: QuizQuestion[] = [];

    sentences.forEach((sentence, idx) => {
      const id = `gen_${Date.now()}_${idx}`;
      
      // Generated Flashcard
      generatedCards.push({
        id: `card_${id}`,
        deckId,
        question: `What concept is defined by: "${sentence.substring(0, 40)}..."?`,
        answer: sentence,
        hint: 'Review key terms in the concept statement.',
        explanation: 'Generated directly from imported material.',
        difficulty: options.difficulty,
        isBookmarked: false,
      });

      // Generated Quiz Question
      generatedQuestions.push({
        id: `q_${id}`,
        type: options.questionTypes[idx % options.questionTypes.length] || 'multiple-choice',
        question: `Regarding the imported text: ${sentence.substring(0, 50)}... Which is correct?`,
        options: [
          sentence,
          'Incorrect distractor option A',
          'Incorrect distractor option B',
          'Incorrect distractor option C',
        ].sort(() => Math.random() - 0.5),
        correctAnswer: sentence,
        explanation: 'Derived from primary study source.',
        hint: 'Focus on primary definitions.',
      });
    });

    return {
      cards: generatedCards.slice(0, options.cardCount),
      questions: generatedQuestions.slice(0, options.cardCount),
    };
  },
};