import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Flashcard } from '../../types';

interface FlipCardProps {
  card: Flashcard;
  showHint: boolean;
  showAnswer: boolean;
}

export const FlipCard: React.FC<FlipCardProps> = ({ card, showHint, showAnswer }) => {
  const { theme } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleFlip = () => {
    Animated.timing(animatedValue, {
      toValue: isFlipped ? 0 : 180,
      duration: 400,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
  };

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <Pressable onPress={handleFlip} style={styles.container}>
      {/* Front Side */}
      <Animated.View
        style={[
          styles.cardFace,
          styles.cardFront,
          frontAnimatedStyle,
          { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
        ]}
      >
        <Text style={[styles.sideLabel, { color: theme.colors.primary }]}>QUESTION</Text>
        <Text style={[styles.contentText, { color: theme.colors.text }]}>{card.question}</Text>

        {(showHint || card.hint) && (
          <View style={[styles.hintBox, { backgroundColor: theme.colors.inputBg }]}>
            <Text style={[styles.hintText, { color: theme.colors.warning }]}>
              💡 Hint: {card.hint || 'Focus on definitions in core materials.'}
            </Text>
          </View>
        )}

        <Text style={[styles.tapNotice, { color: theme.colors.textSecondary }]}>
          Tap card to flip for answer
        </Text>
      </Animated.View>

      {/* Back Side */}
      <Animated.View
        style={[
          styles.cardFace,
          styles.cardBack,
          backAnimatedStyle,
          { backgroundColor: theme.colors.card, borderColor: theme.colors.primary },
        ]}
      >
        <Text style={[styles.sideLabel, { color: theme.colors.accent }]}>ANSWER</Text>
        <Text style={[styles.contentText, { color: theme.colors.text }]}>
          {showAnswer ? card.answer : card.answer}
        </Text>

        {card.explanation && (
          <Text style={[styles.explanationText, { color: theme.colors.textSecondary }]}>
            {card.explanation}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 360,
    marginVertical: 16,
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 24,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    backfaceVisibility: 'hidden',
  },
  cardFront: {
    zIndex: 2,
  },
  cardBack: {
    zIndex: 1,
  },
  sideLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  contentText: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    textAlign: 'center',
    marginVertical: 'auto',
  },
  hintBox: {
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  hintText: {
    fontSize: 13,
    fontWeight: '500',
  },
  explanationText: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  tapNotice: {
    fontSize: 12,
    textAlign: 'center',
  },
});