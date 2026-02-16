import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/store/AuthContext';
import apiClient from '../../src/api/client';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth(); 
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      return Alert.alert('Error', 'Please enter username and password');
    }

    setLoading(true);
    try {
      const response = await apiClient.post('/users/login', {
        username,
        password,
      });

      const authData = response.data.data;
      
      await login(authData);

    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Login failed";
      Alert.alert('Error', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <View className="mb-10 justify-center items-center">
        <Text className="text-4xl font-black text-gray-900">Welcome</Text>
        <Text className="text-gray-500 text-lg mt-2">Sign in to your account</Text>
      </View>

      <View className="gap-y-4">
        <TextInput
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          className="bg-gray-50 border border-gray-100 p-4 rounded-2xl text-base text-gray-950"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          className="bg-gray-50 border border-gray-100 p-4 rounded-2xl text-base text-gray-950"
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          className="bg-blue-600 py-5 rounded-2xl items-center mt-2 shadow-lg shadow-blue-300"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Sign In</Text>
          )}
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center mt-10">
        <Text className="text-gray-500">Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text className="text-blue-600 font-bold">Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}