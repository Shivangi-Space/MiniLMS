import "../global.css";
import { Stack } from "expo-router";
import { AuthProvider } from "@/store/AuthContext";
import { BookmarkProvider } from "@/store/BookmarkContext";
import { OfflineBanner } from '@/components/OfflineBanner';

export default function RootLayout() {
  return (
    <AuthProvider>
      <BookmarkProvider>
        <OfflineBanner />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </BookmarkProvider>
    </AuthProvider>
  );
}