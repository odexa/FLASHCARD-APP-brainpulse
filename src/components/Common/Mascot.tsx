import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flame, Award, Zap, Smile } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';

interface MascotProps {
  streak: number;
}

export const Mascot: React.FC<MascotProps> = ({ streak }) => {
  const { theme } = useTheme();

  const getMascotState = () => {
    if (streak >= 30) return { icon: Award, label: 'Crown Scholar!', color: '#F59E0B' };
    if (streak >= 7) return { icon: Flame, label: 'On Fire!', color: '#EF4444' };
    if (streak >= 3) return { icon: Zap, label: 'Gaining Speed!', color: '#6366F1' };
    return { icon: Smile, label: 'Ready to Learn', color: '#10B981' };
  };

  const state = getMascotState();
  const IconComponent = state.icon;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={[styles.iconCircle, { backgroundColor: `${state.color}20` }]}>
        <IconComponent size={32} color={state.color} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.statusLabel, { color: theme.colors.text }]}>{state.label}</Text>
        <Text style={[styles.subtext, { color: theme.colors.textSecondary }]}>
          {streak} Day Study Streak Active
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginVertical: 12,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtext: {
    fontSize: 14,
    marginTop: 2,
  },
});