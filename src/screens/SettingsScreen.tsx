import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Card } from '../components/Common/Card';

export const SettingsScreen = () => {
  const { theme, mode, setMode } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={{ padding: 20 }}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Settings</Text>
        <Card style={styles.row}>
          <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: '600' }}>Dark Mode</Text>
          <Switch
            value={mode === 'dark'}
            onValueChange={(val) => setMode(val ? 'dark' : 'light')}
          />
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});