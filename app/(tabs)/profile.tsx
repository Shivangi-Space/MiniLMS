import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image'; // High-performance image
import { useAuth } from '../../src/store/AuthContext';
import { User, LogOut, BookOpen, BarChart3 } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import { useEffect } from 'react';

cssInterop(Image, { className: 'style' });

export default function Profile() {
  const { user, logout } = useAuth();

  const hasRealAvatar = user?.avatar?.url && !user.avatar.url.includes('placeholder');

  return (
    <View className="flex-1 bg-gray-50 p-6 pt-14">
      <View className="items-center mt-10 mb-8">
        {hasRealAvatar ? (
          <Image
            source={{ uri: user.avatar.url }}
            className="w-32 h-32 rounded-full border-4 border-white shadow-sm"
            contentFit="cover"
            cachePolicy="disk"
          />
        ) : (
          <View className="w-32 h-32 rounded-full border-4 border-white bg-blue-100 items-center justify-center shadow-md">
            <User size={60} color="#2563eb" />
          </View>
        )}
        
        <Text className="text-2xl font-bold mt-4 text-gray-900">{user?.username || 'Learner'}</Text>
        <Text className="text-gray-500">{user?.email || 'No email provided'}</Text>
      </View>

      <View className="flex-row justify-between mb-8">
        <View className="bg-white p-4 rounded-2xl flex-1 mr-2 items-center shadow-sm border border-gray-100">
          <BookOpen size={20} color="#2563eb" className="mb-1" />
          <Text className="text-xl font-bold text-gray-900">12</Text>
          <Text className="text-gray-500 text-xs uppercase tracking-widest font-bold">Enrolled</Text>
        </View>
        <View className="bg-white p-4 rounded-2xl flex-1 ml-2 items-center shadow-sm border border-gray-100">
          <BarChart3 size={20} color="#10b981" className="mb-1" />
          <Text className="text-xl font-bold text-gray-900">85%</Text>
          <Text className="text-gray-500 text-xs uppercase tracking-widest font-bold">Progress</Text>
        </View>
      </View>

      <TouchableOpacity 
        onPress={logout}
        activeOpacity={0.7}
        className="bg-red-50 py-4 rounded-2xl flex-row items-center justify-center border-red-100"
      >
        <LogOut size={20} color="#ef4444" className="mr-2" />
        <Text className="text-red-600 font-bold text-lg">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}