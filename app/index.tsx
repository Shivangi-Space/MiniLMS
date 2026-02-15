import { Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <View className="w-20 h-20 bg-blue-600 rounded-2xl items-center justify-center mb-6">
        <Text className="text-white text-4xl font-bold">L</Text>
      </View>
      <Text className="text-3xl font-bold text-gray-900 mb-2">Mini LMS</Text>
      <Text className="text-gray-500 text-center mb-10">
        Master your skills with our professional courses.
      </Text>
      
      <TouchableOpacity 
        onPress={() => router.push('/(auth)/login')}
        className="bg-blue-600 w-full py-4 rounded-xl items-center"
      >
        <Text className="text-white font-bold text-lg">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}