# BrainPulse - Digital Flashcards & Quiz Mobile Application

BrainPulse is a production-grade React Native application designed for student exam preparation with modern UX, dark mode, 3D card flipping, and AI-driven question generation.

## Features
- **3D Card Flips**: Smooth flip transforms powered by React Native's native `Animated` engine (fully compatible with Expo Go).
- **Multi-Type Quiz Engine**: Supports Multiple Choice, True/False, Identification, and Fill-in-the-Blanks formats.
- **Offline Local Storage**: Full persistence via `@react-native-async-storage/async-storage`.
- **Mascot & Streak System**: Daily study activity tracking with reactive mascot states.
- **AI Material Import**: File parser and secure backend service abstraction for AI flashcard generation.

## Setup & Running Instructions

### 1. Prerequisites
- Node.js (v18 or higher)
- Expo Go App on your mobile device (Android/iOS) or an active Emulator

### 2. Installation
```bash
# Navigate to the project directory
cd "C:\Users\DELL\Documents\FLASHCARD APP brainpulse"

# Install dependencies (using legacy peer deps for Expo 57 compatibility)
npm install --legacy-peer-deps