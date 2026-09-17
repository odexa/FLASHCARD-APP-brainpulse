import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/Common/Button';
import { QuizQuestion, QuizAttempt } from '../types';
import { Clock } from 'lucide-react-native';

export const QuizScreen = ({ route, navigation }: any) => {
  const { theme } = useTheme();
  const { recordQuizAttempt } = useAppStore();
  const { deckId, questions = [], timeLimit = 0 } = route.params || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [typedAnswer, setTypedAnswer] = useState<string>('');
  const [usedHint, setUsedHint] = useState<boolean>(false);
  const [revealedAnswer, setRevealedAnswer] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(timeLimit);

  const [questionLogs, setQuestionLogs] = useState<any[]>([]);

  const defaultQuestion: QuizQuestion = {
    id: 'q1',
    type: 'multiple-choice',
    question: 'What is the primary function of memory paging in operating systems?',
    options: ['Divide physical memory into fixed-size blocks', 'Store files permanently', 'Compile source code', 'Route network packets'],
    correctAnswer: 'Divide physical memory into fixed-size blocks',
    hint: 'Relates to memory segmentation.',
  };

  const activeQuestions = questions.length > 0 ? questions : [defaultQuestion];
  const currentQ: QuizQuestion = activeQuestions[currentIndex] || defaultQuestion;

  // Timer logic
  useEffect(() => {
    if (timeLimit <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          handleNextQuestion(true); // Auto submit on timer zero
          return timeLimit;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentIndex, timeLimit]);

  const handleNextQuestion = (isTimeout = false) => {
    const userAnswer = currentQ.type === 'identification' || currentQ.type === 'fill-in-blanks' ? typedAnswer.trim() : selectedOption;
    const isCorrect = userAnswer.toLowerCase() === currentQ.correctAnswer.toLowerCase();

    const log = {
      questionId: currentQ.id,
      questionText: currentQ.question,
      userAnswer: isTimeout ? 'TIMED_OUT' : userAnswer,
      correctAnswer: currentQ.correctAnswer,
      isCorrect,
      usedHint,
      revealedAnswer,
    };

    const newLogs = [...questionLogs, log];
    setQuestionLogs(newLogs);

    // Reset step state
    setSelectedOption('');
    setTypedAnswer('');
    setUsedHint(false);
    setRevealedAnswer(false);

    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      if (timeLimit > 0) setTimerSeconds(timeLimit);
    } else {
      // Finalize Quiz
      const correctCount = newLogs.filter((l) => l.isCorrect).length;
      const percentage = Math.round((correctCount / activeQuestions.length) * 100);

      const attempt: QuizAttempt = {
        id: `att_${Date.now()}`,
        deckId: deckId || 'deck_1',
        deckTitle: 'Study Quiz',
        score: correctCount,
        percentage,
        correctAnswers: correctCount,
        incorrectAnswers: activeQuestions.length - correctCount,
        skippedAnswers: 0,
        hintsUsed: newLogs.filter((l) => l.usedHint).length,
        answersRevealed: newLogs.filter((l) => l.revealedAnswer).length,
        timeTakenSeconds: 120,
        completedAt: new Date().toISOString(),
        questionDetails: newLogs,
      };

      recordQuizAttempt(attempt);
      navigation.navigate('QuizResults', { attempt });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Top Header & Timer */}
        <View style={styles.header}>
          <Text style={[styles.progress, { color: theme.colors.textSecondary }]}>
            Question {currentIndex + 1} of {activeQuestions.length}
          </Text>
          {timeLimit > 0 && (
            <View style={[styles.timerContainer, { backgroundColor: theme.colors.inputBg }]}>
              <Clock size={16} color={timerSeconds < 10 ? theme.colors.danger : theme.colors.primary} />
              <Text
                style={[
                  styles.timerText,
                  { color: timerSeconds < 10 ? theme.colors.danger : theme.colors.text },
                ]}
              >
                {timerSeconds}s
              </Text>
            </View>
          )}
        </View>

        {/* Question Text */}
        <Text style={[styles.questionText, { color: theme.colors.text }]}>{currentQ.question}</Text>

        {/* Input Renderer Based on Question Type */}
        {currentQ.type === 'multiple-choice' && currentQ.options && (
          <View style={styles.optionsContainer}>
            {currentQ.options.map((opt, idx) => (
              <Button
                key={idx}
                title={opt}
                variant={selectedOption === opt ? 'primary' : 'outline'}
                onPress={() => setSelectedOption(opt)}
                style={styles.optionBtn}
              />
            ))}
          </View>
        )}

        {(currentQ.type === 'identification' || currentQ.type === 'fill-in-blanks') && (
          <TextInput
            style={[
              styles.input,
              { backgroundColor: theme.colors.inputBg, color: theme.colors.text, borderColor: theme.colors.border },
            ]}
            placeholder="Type your answer here..."
            placeholderTextColor={theme.colors.textSecondary}
            value={typedAnswer}
            onChangeText={setTypedAnswer}
          />
        )}

        {/* Hints and Solution Reveals */}
        {usedHint && (
          <Text style={[styles.hintText, { color: theme.colors.warning }]}>
            💡 Hint: {currentQ.hint || 'Analyze core terms.'}
          </Text>
        )}
        {revealedAnswer && (
          <Text style={[styles.revealText, { color: theme.colors.accent }]}>
            Answer: {currentQ.correctAnswer}
          </Text>
        )}

        <View style={styles.auxRow}>
          <Button
            title="Hint"
            variant="outline"
            onPress={() => setUsedHint(true)}
            style={{ flex: 1, marginRight: 6 }}
          />
          <Button
            title="Reveal Answer"
            variant="outline"
            onPress={() => setRevealedAnswer(true)}
            style={{ flex: 1, marginLeft: 6 }}
          />
        </View>

        {/* Submit Step Button */}
        <Button
          title={currentIndex === activeQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          onPress={() => handleNextQuestion(false)}
          style={{ marginTop: 20 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progress: { fontSize: 14, fontWeight: '700' },
  timerContainer: { flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: 12 },
  timerText: { marginLeft: 6, fontWeight: '700' },
  questionText: { fontSize: 20, fontWeight: '700', marginVertical: 20, lineHeight: 28 },
  optionsContainer: { marginVertical: 10 },
  optionBtn: { marginVertical: 6, justifyContent: 'flex-start' },
  input: { height: 50, borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, marginVertical: 16 },
  auxRow: { flexDirection: 'row', marginTop: 12 },
  hintText: { fontSize: 14, marginTop: 12, fontWeight: '600' },
  revealText: { fontSize: 14, marginTop: 12, fontWeight: '700' },
});