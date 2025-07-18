# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**chiqingwa (吃青蛙)** is a personal goal management app focused on hierarchical goal decomposition and execution. The core feature is multi-level goal viewing: daily goals, weekly goals, monthly goals, and yearly goals. It's designed as a systematic tool to help users achieve a complete cycle from "annual big goals" to "daily small actions."

### App Concept
- **Goal Hierarchy**: Year → Month → Week → Day goal breakdown
- **Focus**: Systematic decomposition of long-term objectives into actionable daily tasks
- **Philosophy**: "Eat the frog" approach - tackle important tasks first

This is a React Native mobile application built with Expo Router, targeting iOS, Android, and web platforms. The app uses TypeScript and follows modern React Native development patterns with Expo SDK 53.

## Development Commands

- `npm start` or `npx expo start` - Start the development server
- `npm run android` - Start on Android emulator
- `npm run ios` - Start on iOS simulator  
- `npm run web` - Start web version
- `npm run lint` - Run ESLint for code quality checks
- `npm run reset-project` - Reset to blank app (removes starter code)

## Architecture

### File-based Routing (Expo Router)
- Uses Expo Router v5 with file-based routing system
- Main navigation structure in `app/` directory:
  - `app/_layout.tsx` - Root layout with theme provider and navigation stack
  - `app/(tabs)/` - Tab-based navigation group
  - `app/(tabs)/_layout.tsx` - Tab bar configuration with haptic feedback
  - `app/+not-found.tsx` - 404 error screen

### Component Structure
- **Themed Components**: `ThemedText.tsx`, `ThemedView.tsx` - Components that automatically adapt to light/dark themes
- **UI Components**: Located in `components/ui/` with platform-specific implementations:
  - `IconSymbol.tsx` / `IconSymbol.ios.tsx` - Cross-platform icon system
  - `TabBarBackground.tsx` / `TabBarBackground.ios.tsx` - Platform-specific tab bar styling
- **Utility Components**: `HapticTab.tsx`, `Collapsible.tsx`, `ParallaxScrollView.tsx`

### Theme System
- Color definitions in `constants/Colors.ts` with light/dark mode support
- Custom hooks in `hooks/`:
  - `useColorScheme.ts` / `useColorScheme.web.ts` - Platform-specific color scheme detection
  - `useThemeColor.ts` - Theme-aware color resolution

### Asset Management
- Images stored in `assets/images/` with multiple resolutions (@2x, @3x)
- Custom font (SpaceMono) in `assets/fonts/`
- App icons and splash screens configured in `app.json`

## Key Technologies
- **Expo SDK 53** with new architecture enabled
- **React 19** and **React Native 0.79.5**
- **TypeScript** with strict mode and path aliases (`@/*`)
- **React Navigation** for navigation with haptic feedback
- **React Native Reanimated** for animations
- **Expo Router** for file-based routing with typed routes

## Configuration Notes
- TypeScript paths configured with `@/*` alias pointing to root
- ESLint configured with Expo's flat config setup
- App supports portrait orientation on mobile, responsive on web
- Edge-to-edge design enabled on Android
- Adaptive icons configured for Android