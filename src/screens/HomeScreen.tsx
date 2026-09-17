import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { useAppStore } from '../store/useAppStore';
import { Mascot } from '../components/Common/Mascot';
import { Card } from '../components/Common/Card';
import { Button } from '../components/Common/Button';
import { BookOpen, Play, Upload } from 'lucide-react-native';

export const HomeScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { profile, decks, quizAttempts } = useAppStore();

  const totalCards = decks.reduce((acc, d) => acc + d.cardCount, 0);
  const recentAttempt = quizAttempts[0];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Greeting */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: theme.colors.textSecondary }]}>Welcome back,</Text>
          <Text style={[styles.userName, { color: theme.colors.text }]}>{profile.name}</Text>
        </View>

        {/* Mascot & Streak */}
        <Mascot streak={profile.currentStreak} />

        {/* Quick Action Matrix */}
        <View style={styles.quickActions}>
          <Button
            title="Continue Study"
            icon={<BookOpen color="#FFF" size={18} />}
            onPress={() => navigation.navigate('StudyTab')}
            style={{ flex: 1, marginRight: 6 }}
          />
          <Button
            title="Start Quiz"
            variant="secondary"
            icon={<Play color="#FFF" size={18} />}
            onPress={() => navigation.navigate('QuizSetup')}
            style={{ flex: 1, marginLeft: 6 }}
          />
        </View>

        {/* Dashboard Statistics Grid */}
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Study Overview</Text>
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Text style={[styles.statNumber, { color: theme.colors.primary }]}>{decks.length}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Total Decks</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={[styles.statNumber, { color: theme.colors.accent }]}>{totalCards}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Total Cards</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={[styles.statNumber, { color: theme.colors.warning }]}>
              {recentAttempt ? `${recentAttempt.percentage}%` : 'N/A'}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Recent Quiz</Text>
          </Card>
        </View>

        {/* Secondary Import & Create Options */}
        <View style={styles.actionRow}>
          <Button
            title="Import Material"
            variant="outline"
            icon={<Upload color={theme.colors.primary} size={18} />}
            onPress={() => navigation.navigate('ImportMaterial')}
            style={{ flex: 1, marginRight: 6 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 18 },
  header: { marginBottom: 12 },
  greeting: { fontSize: 14, fontWeight: '500' },
  userName: { fontSize: 24, fontWeight: '800' },
  quickActions: { flexDirection: 'row', marginVertical: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 16, marginBottom: 8 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  statCard: { flex: 1, alignItems: 'center', marginHorizontal: 4, paddingVertical: 12 },
  statNumber: { fontSize: 22, fontWeight: '800' },
  statLabel: { fontSize: 12, marginTop: 4 },
  actionRow: { flexDirection: 'row', marginTop: 12 },
});