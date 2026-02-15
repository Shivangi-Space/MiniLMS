import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../../src/store/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <View className="flex-1 bg-gray-50 p-6">
      <View className="items-center mt-10 mb-8">
        <Image 
          source={{ uri: user?.avatar?.url || 'https://via.placeholder.com/150' }} 
          className="w-32 h-32 rounded-full border-4 border-white shadow-sm"
        />
        <Text className="text-2xl font-bold mt-4">{user?.username}</Text>
        <Text className="text-gray-500">{user?.email}</Text>
      </View>

      <View className="flex-row justify-between mb-8">
        <View className="bg-white p-4 rounded-2xl flex-1 mr-2 items-center shadow-sm">
          <Text className="text-xl font-bold text-blue-600">12</Text>
          <Text className="text-gray-500 text-xs">Enrolled</Text>
        </View>
        <View className="bg-white p-4 rounded-2xl flex-1 ml-2 items-center shadow-sm">
          <Text className="text-xl font-bold text-green-600">85%</Text>
          <Text className="text-gray-500 text-xs">Progress</Text>
        </View>
      </View>

      <TouchableOpacity 
        onPress={logout}
        className="bg-red-50 py-4 rounded-2xl items-center"
      >
        <Text className="text-red-600 font-bold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}