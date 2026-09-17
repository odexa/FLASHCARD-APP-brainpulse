export const Palette = {
    primary: '#6366F1', // Indigo
    primaryDark: '#4F46E5',
    accent: '#10B981', // Emerald
    warning: '#F59E0B', // Amber
    danger: '#EF4444', // Red
    purple: '#8B5CF6',
    pink: '#EC4899',
  };
  
  export const LightTheme = {
    dark: false,
    colors: {
      background: '#F8FAFC',
      card: '#FFFFFF',
      text: '#0F172A',
      textSecondary: '#64748B',
      border: '#E2E8F0',
      primary: Palette.primary,
      accent: Palette.accent,
      warning: Palette.warning,
      danger: Palette.danger,
      inputBg: '#F1F5F9',
    },
  };
  
  export const DarkTheme = {
    dark: true,
    colors: {
      background: '#0F172A',
      card: '#1E293B',
      text: '#F8FAFC',
      textSecondary: '#94A3B8',
      border: '#334155',
      primary: '#818CF8',
      accent: '#34D399',
      warning: '#FBBF24',
      danger: '#F87171',
      inputBg: '#1E293B',
    },
  };
  
  export type ThemeColors = typeof LightTheme.colors;