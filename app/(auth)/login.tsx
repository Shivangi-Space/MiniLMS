import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../../src/store/AuthContext';
import apiClient from '../../src/api/client';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) return Alert.alert('Error', 'Please fill all fields');
    
    setLoading(true);
    try {
      const response = await apiClient.post('/users/login', {
        username,
        password,
      });
      // FreeAPI returns { data: { user, accessToken, refreshToken } }
      await login(response.data.data);
    } catch (error: any) {
      Alert.alert('Login Failed', error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <Text className="text-4xl font-bold mb-2">Welcome Back</Text>
      <Text className="text-gray-500 mb-8">Sign in to continue your learning</Text>
      
      <TextInput 
        placeholder="Username (e.g. user77)"
        value={username}
        onChangeText={setUsername}
        className="bg-gray-50 border border-gray-200 p-4 rounded-2xl mb-4"
        autoCapitalize="none"
      />
      <TextInput 
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="bg-gray-50 border border-gray-200 p-4 rounded-2xl mb-8"
      />
      
      <TouchableOpacity 
        onPress={handleLogin}
        disabled={loading}
        className="bg-blue-600 py-4 rounded-2xl items-center shadow-lg shadow-blue-300"
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-lg">Sign In</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}