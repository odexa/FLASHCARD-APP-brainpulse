import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { Button } from '../components/Common/Button';
import ConfettiCannon from 'react-native-confetti-cannon';

export const QuizResultsScreen = ({ route, navigation }: any) => {
  const { theme } = useTheme();
  const { attempt } = route.params || {};

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ConfettiCannon count={100} origin={{ x: -10, y: 0 }} fadeOut />
      <View style={styles.center}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>Quiz Completed!</Text>
        <Text style={[styles.score, { color: theme.colors.primary }]}>{attempt?.percentage || 85}%</Text>
        <Text style={{ color: theme.colors.textSecondary }}>
          {attempt?.correctAnswers || 4} / {attempt?.questionDetails?.length || 5} Correct Answers
        </Text>

        <Button
          title="Back to Dashboard"
          onPress={() => navigation.navigate('MainTabs')}
          style={{ marginTop: 30, width: '80%' }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emoji: { fontSize: 64 },
  title: { fontSize: 26, fontWeight: '800', marginTop: 12 },
  score: { fontSize: 48, fontWeight: '900', marginVertical: 8 },
});