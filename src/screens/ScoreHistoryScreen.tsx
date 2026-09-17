import React from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/Common/Card';

export const ScoreHistoryScreen = () => {
  const { theme } = useTheme();
  const { quizAttempts } = useAppStore();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={quizAttempts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 18 }}
        ListEmptyComponent={
          <Text style={{ color: theme.colors.textSecondary, textAlign: 'center', marginTop: 40 }}>
            No quiz attempts recorded yet.
          </Text>
        }
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View>
              <Text style={[styles.title, { color: theme.colors.text }]}>{item.deckTitle}</Text>
              <Text style={{ color: theme.colors.textSecondary }}>{new Date(item.completedAt).toLocaleDateString()}</Text>
            </View>
            <Text style={[styles.score, { color: theme.colors.primary }]}>{item.percentage}%</Text>
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '700' },
  score: { fontSize: 20, fontWeight: '800' },
});