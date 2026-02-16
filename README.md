# Mini LMS - React Native Expo Application

A professional, high performance mini-learning management system built with React native expo, Typescript and nativewind.

## Features
- **Secure Auth:** Login/Register with JWT management via Expo SecureStore.
- **Course Catalog:** Highly optimized list using `@legendapp/list` for 60fps scrolling.
- **Smart Search:** Debounced filtering for course discovery.
- **WebView Integration:** Secure course content viewer with native-to-web header communication.
- **Native Features:** Local notifications for bookmarks and user retention (24h inactivity).
- **Error Resilience:** Global offline detection, API retry mechanism, and state persistence.

## Technology Stack
- **Framework:** Expo SDK (Latest)
- **Language:** TypeScript (Strict Mode)
- **Styling:** NativeWind (Tailwind CSS)
- **Navigation:** Expo Router (File-based)
- **Persistence:** SecureStore (Tokens) & AsyncStorage (App Data)
- **Icons:** Lucide React Native

## Architectural Decisions
1. **State Management:** Used a hybrid approach. Context API for global UI state (Auth/Bookmarks) combined with SecureStore for sensitive tokens to ensure security-first architecture.
2. **Performance:** Implemented `LegendList` instead of standard `FlatList` to handle large datasets with minimal memory footprint. Used `expo-image` for aggressive disk caching of thumbnails.
3. **Error Handling:** Implemented an Axios Interceptor with **Exponential Backoff** retry logic to handle flaky network conditions typical in mobile environments.

## 📦 Installation & Setup
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Create a `.env` file: `EXPO_PUBLIC_API_URL=https://api.freeapi.app/api/v1`.
4. Start the app: `npx expo start`.

## 📱 APK Build Instructions
This project uses EAS Build for production-ready binaries.
1. Install EAS CLI: `npm install -g eas-cli`.
2. Login: `eas login`.
3. Configure: `eas build:configure`.
4. Build APK (Android): `eas build --platform android --profile preview`.

## 🎥 Demo Video
[Link to your 3-5 min video here]