import { Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/store/AuthContext';
import { useEffect } from 'react';

export default function WelcomeScreen() {
  const router = useRouter();
  const { token, isLoading } = useAuth();

  useEffect(() => {
    // If we have a token, skip this screen and go to Home
    if (!isLoading && token) {
      router.replace('/home'); 
    }
  }, [token, isLoading]);

  if (isLoading) return null;

  return (
    <View className="flex-1 bg-white p-6">
      <View className="flex-1 px-8 justify-center items-center">
        {/* Animated Brand Icon */}
        <View className="w-24 h-24 bg-blue-600 rounded-3xl items-center justify-center shadow-2xl shadow-blue-500 mb-8 rotate-12">
          <Text className="text-white text-5xl font-black -rotate-12">L</Text>
        </View>

        {/* Text Content */}
        <Text className="text-4xl font-black text-gray-900 text-center">
          Mini<Text className="text-blue-600">LMS</Text>
        </Text>
        <Text className="text-gray-500 text-center mt-4 text-lg leading-6">
          The ultimate platform to master your professional skills with native performance.
        </Text>

        {/* Action Buttons - Changed space-y-4 to gap-4 */}
        <View className="w-full mt-12 gap-4"> 
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => router.push('/login')} // Simplified Path
            className="bg-blue-600 w-full py-5 rounded-2xl items-center shadow-lg shadow-blue-300"
          >
            <Text className="text-white font-bold text-lg">Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            activeOpacity={0.6}
            onPress={() => router.push('/register')} // Simplified Path
            className="w-full py-4 items-center"
          >
            <Text className="text-gray-600 font-semibold text-base">Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}