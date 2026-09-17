import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  DECKS: '@brainpulse_decks',
  FLASHCARDS: '@brainpulse_cards',
  ATTEMPTS: '@brainpulse_attempts',
  PROFILE: '@brainpulse_profile',
};

export const StorageService = {
  async saveDecks(decks: any[]) {
    await AsyncStorage.setItem(KEYS.DECKS, JSON.stringify(decks));
  },
  async getDecks() {
    const data = await AsyncStorage.getItem(KEYS.DECKS);
    return data ? JSON.parse(data) : null;
  },
  async saveCards(cards: any[]) {
    await AsyncStorage.setItem(KEYS.FLASHCARDS, JSON.stringify(cards));
  },
  async getCards() {
    const data = await AsyncStorage.getItem(KEYS.FLASHCARDS);
    return data ? JSON.parse(data) : null;
  },
  async saveAttempts(attempts: any[]) {
    await AsyncStorage.setItem(KEYS.ATTEMPTS, JSON.stringify(attempts));
  },
  async getAttempts() {
    const data = await AsyncStorage.getItem(KEYS.ATTEMPTS);
    return data ? JSON.parse(data) : null;
  },
  async saveProfile(profile: any) {
    await AsyncStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  },
  async getProfile() {
    const data = await AsyncStorage.getItem(KEYS.PROFILE);
    return data ? JSON.parse(data) : null;
  },
};