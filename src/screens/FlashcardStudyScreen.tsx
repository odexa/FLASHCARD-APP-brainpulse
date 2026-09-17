import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { useAppStore } from '../store/useAppStore';
import { FlipCard } from '../components/Flashcard/FlipCard';
import { Button } from '../components/Common/Button';
import { ArrowLeft, ArrowRight, Bookmark } from 'lucide-react-native';

export const FlashcardStudyScreen = () => {
  const { theme } = useTheme();
  const { flashcards, toggleBookmark } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!flashcards || flashcards.length === 0) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.text }}>No flashcards available. Create or import a deck!</Text>
      </SafeAreaView>
    );
  }

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setShowHint(false);
    setShowAnswer(false);
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    setShowHint(false);
    setShowAnswer(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Progress & Bookmark Header */}
        <View style={styles.topBar}>
          <Text style={[styles.progressText, { color: theme.colors.textSecondary }]}>
            Card {currentIndex + 1} of {flashcards.length}
          </Text>
          <Button
            title=""
            variant="outline"
            icon={
              <Bookmark
                size={20}
                color={currentCard.isBookmarked ? theme.colors.warning : theme.colors.textSecondary}
                fill={currentCard.isBookmarked ? theme.colors.warning : 'transparent'}
              />
            }
            onPress={() => toggleBookmark(currentCard.id)}
            style={styles.iconBtn}
          />
        </View>

        {/* Interactive 3D Flipcard */}
        <FlipCard card={currentCard} showHint={showHint} showAnswer={showAnswer} />

        {/* Action Controls */}
        <View style={styles.auxControls}>
          <Button
            title="Hint"
            variant="outline"
            onPress={() => setShowHint(true)}
            style={{ flex: 1, marginRight: 6 }}
          />
          <Button
            title="Reveal Answer"
            variant="outline"
            onPress={() => setShowAnswer(true)}
            style={{ flex: 1, marginLeft: 6 }}
          />
        </View>

        {/* Navigation Controls */}
        <View style={styles.navControls}>
          <Button
            title="Prev"
            variant="outline"
            icon={<ArrowLeft size={18} color={theme.colors.primary} />}
            onPress={handlePrev}
            disabled={currentIndex === 0}
            style={{ flex: 1, marginRight: 8 }}
          />
          <Button
            title="Next"
            icon={<ArrowRight size={18} color="#FFF" />}
            onPress={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            style={{ flex: 1, marginLeft: 8 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, padding: 18, justifyContent: 'space-between' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressText: { fontSize: 14, fontWeight: '700' },
  iconBtn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20 },
  auxControls: { flexDirection: 'row', marginVertical: 4 },
  navControls: { flexDirection: 'row', marginBottom: 12 },
});