import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/Common/Card';

export const DecksScreen = () => {
  const { theme } = useTheme();
  const { decks } = useAppStore();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={decks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 18 }}
        renderItem={({ item }) => (
          <Card style={{ borderLeftWidth: 6, borderLeftColor: item.coverColor }}>
            <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
            <Text style={{ color: theme.colors.textSecondary, marginVertical: 4 }}>{item.description}</Text>
            <Text style={[styles.badge, { color: theme.colors.primary }]}>{item.cardCount} Cards</Text>
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 18, fontWeight: '700' },
  badge: { fontSize: 12, fontWeight: '800', marginTop: 8 },
});