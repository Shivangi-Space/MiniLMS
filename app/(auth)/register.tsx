import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import apiClient from '../../src/api/client';

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleRegister = async () => {
    const { username, email, password } = form;
    if (!username || !email || !password) {
      return Alert.alert('Error', 'Please fill in all fields');
    }

    setLoading(true);
    try {
      await apiClient.post('/users/register', {
        username,
        email,
        password,
        role: "USER" // Required by FreeAPI
      });
      
      Alert.alert('Success', 'Account created! Please login.', [
        { text: 'OK', onPress: () => router.push('/login') }
      ]);
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Registration failed";
      Alert.alert('Error', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6 pt-20">
        <Text className="text-4xl font-black text-gray-900">Join Us</Text>
        <Text className="text-gray-500 mt-2 mb-10 text-lg">Create an account to start learning.</Text>

        <View className="gap-y-4">
          <View>
            <Text className="text-gray-700 font-semibold mb-2 ml-1">Username</Text>
            <TextInput
              placeholder="Pick a unique username"
              value={form.username}
              onChangeText={(val) => setForm({ ...form, username: val })}
              className="bg-gray-50 border border-gray-100 p-4 rounded-2xl text-base"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-gray-700 font-semibold mb-2 ml-1">Email</Text>
            <TextInput
              placeholder="your@email.com"
              value={form.email}
              onChangeText={(val) => setForm({ ...form, email: val })}
              className="bg-gray-50 border border-gray-100 p-4 rounded-2xl text-base"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-gray-700 font-semibold mb-2 ml-1">Password</Text>
            <TextInput
              placeholder="Create a strong password"
              value={form.password}
              onChangeText={(val) => setForm({ ...form, password: val })}
              className="bg-gray-50 border border-gray-100 p-4 rounded-2xl text-base"
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading}
            className="bg-blue-600 py-5 rounded-2xl items-center mt-4 shadow-lg shadow-blue-300"
          >
            {loading ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold text-lg">Create Account</Text>}
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-500">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text className="text-blue-600 font-bold">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}