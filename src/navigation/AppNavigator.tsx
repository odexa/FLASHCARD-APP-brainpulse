import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Layers, BookOpen, History, Settings as SettingsIcon } from 'lucide-react-native';

import { useTheme } from '../theme/ThemeContext';

// Screens
import { HomeScreen } from '../screens/HomeScreen';
import { DecksScreen } from '../screens/DecksScreen';
import { FlashcardStudyScreen } from '../screens/FlashcardStudyScreen';
import { QuizSetupScreen } from '../screens/QuizSetupScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { QuizResultsScreen } from '../screens/QuizResultsScreen';
import { ScoreHistoryScreen } from '../screens/ScoreHistoryScreen';
import { ImportMaterialScreen } from '../screens/ImportMaterialScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }}
      />
      <Tab.Screen
        name="DecksTab"
        component={DecksScreen}
        options={{ tabBarLabel: 'Decks', tabBarIcon: ({ color, size }) => <Layers color={color} size={size} /> }}
      />
      <Tab.Screen
        name="StudyTab"
        component={FlashcardStudyScreen}
        options={{ tabBarLabel: 'Study', tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} /> }}
      />
      <Tab.Screen
        name="HistoryTab"
        component={ScoreHistoryScreen}
        options={{ tabBarLabel: 'History', tabBarIcon: ({ color, size }) => <History color={color} size={size} /> }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Settings', tabBarIcon: ({ color, size }) => <SettingsIcon color={color} size={size} /> }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.card },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="QuizSetup" component={QuizSetupScreen} options={{ title: 'Quiz Configuration' }} />
        <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ title: 'Quiz Mode', headerLeft: () => null }} />
        <Stack.Screen name="QuizResults" component={QuizResultsScreen} options={{ title: 'Quiz Results', headerLeft: () => null }} />
        <Stack.Screen name="ImportMaterial" component={ImportMaterialScreen} options={{ title: 'Import Study Material' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}