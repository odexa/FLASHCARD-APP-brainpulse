import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { Button } from '../components/Common/Button';

export const QuizSetupScreen = ({ navigation }: any) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={{ padding: 20 }}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Quiz Settings</Text>
        <Text style={{ color: theme.colors.textSecondary, marginVertical: 8 }}>
          Configure your quiz session parameters.
        </Text>

        <Button
          title="Start Timed Quiz (30s/Q)"
          onPress={() =>
            navigation.navigate('QuizScreen', {
              deckId: 'deck_1',
              questions: [], // Default questions load inside screen
              timeLimit: 30,
            })
          }
          style={{ marginTop: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '800' },
});