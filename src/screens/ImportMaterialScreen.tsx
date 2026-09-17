import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/Common/Button';
import { FileParserService } from '../services/fileParser';
import { AIService } from '../services/aiService';
import { Upload, Sparkles } from 'lucide-react-native';

export const ImportMaterialScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { decks, addFlashcards } = useAppStore();

  const [pastedText, setPastedText] = useState('');
  const [selectedDeckId, setSelectedDeckId] = useState(decks[0]?.id || '');
  const [loading, setLoading] = useState(false);

  const handlePickFile = async () => {
    try {
      const doc = await FileParserService.pickAndParseDocument();
      if (doc) {
        setPastedText(doc.rawText);
      }
    } catch (e: any) {
      Alert.alert('Import Error', e.message);
    }
  };

  const handleGenerateAI = async () => {
    if (!pastedText.trim()) {
      Alert.alert('Empty Source', 'Please paste text or import a file first.');
      return;
    }

    setLoading(true);
    try {
      const result = await AIService.generateCardsAndQuestions(
        {
          sourceText: pastedText,
          cardCount: 5,
          questionTypes: ['multiple-choice', 'identification'],
          difficulty: 'medium',
        },
        selectedDeckId
      );

      addFlashcards(result.cards);
      Alert.alert('Success', `Generated ${result.cards.length} flashcards with AI!`, [
        { text: 'OK', onPress: () => navigation.navigate('MainTabs') },
      ]);
    } catch (e: any) {
      Alert.alert('Generation Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Import Study Material</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Upload documents or paste text to generate AI flashcards and quizzes.
        </Text>

        <Button
          title="Choose File (PDF, DOCX, TXT)"
          variant="outline"
          icon={<Upload size={18} color={theme.colors.primary} />}
          onPress={handlePickFile}
          style={{ marginVertical: 12 }}
        />

        <Text style={[styles.label, { color: theme.colors.text }]}>Or Paste Study Notes:</Text>
        <TextInput
          style={[
            styles.textArea,
            { backgroundColor: theme.colors.inputBg, color: theme.colors.text, borderColor: theme.colors.border },
          ]}
          multiline
          numberOfLines={8}
          placeholder="Paste your lecture notes or definitions here..."
          placeholderTextColor={theme.colors.textSecondary}
          value={pastedText}
          onChangeText={setPastedText}
        />

        <Button
          title="Generate AI Cards & Quiz"
          icon={<Sparkles size={18} color="#FFF" />}
          onPress={handleGenerateAI}
          loading={loading}
          style={{ marginTop: 20 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: '800' },
  subtitle: { fontSize: 14, marginVertical: 8, lineHeight: 20 },
  label: { fontSize: 14, fontWeight: '700', marginTop: 16, marginBottom: 8 },
  textArea: { height: 160, borderWidth: 1, borderRadius: 12, padding: 14, textAlignVertical: 'top' },
});