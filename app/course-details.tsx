import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, AlertCircle, RotateCw } from 'lucide-react-native';
import { useAuth } from '../src/store/AuthContext';

export default function CourseDetails() {
  const { title, instructor, id } = useLocalSearchParams();
  const router = useRouter();
  const { token } = useAuth(); 
  const [loading, setLoading] = useState(true);

  const localHtml = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, sans-serif; padding: 20px; line-height: 1.6; color: #333; }
          .badge { background: #2563eb; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; display: inline-block; }
          h1 { color: #1a1a1a; margin-top: 10px; }
          .content { background: #f9fafb; border-radius: 12px; padding: 15px; border: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="badge">Course ID: ${id}</div>
        <h1>${title}</h1>
        <p><strong>Instructor:</strong> ${instructor}</p>
        <div class="content">
          <h3>Course Module 1: Introduction</h3>
          <p>Welcome to this interactive course content. This page is being rendered inside a Native WebView container.</p>
          <p>The app passed your Auth Token securely via request headers.</p>
        </div>
      </body>
    </html>
  `;

  return (
    <View className="flex-1 bg-white">
      {/* Custom Header */}
      <View className="pt-14 pb-4 px-5 flex-row items-center border-b border-gray-100">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="p-2 bg-gray-50 rounded-full"
        >
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="ml-4 text-lg font-bold text-gray-900 flex-1" numberOfLines={1}>
          {title}
        </Text>
      </View>

      {/* WebView Container */}
      <View className="flex-1">
        <WebView
          originWhitelist={['*']}
          source={{ 
            html: localHtml,
            headers: {
              'Authorization': `Bearer ${token}`,
              'X-App-Platform': 'iOS-Expo'
            }
          }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}

          renderError={(errorName) => (
            <View className="flex-1 justify-center items-center p-10">
              <AlertCircle size={48} color="#ef4444" />
              <Text className="text-xl font-bold mt-4 text-center">Failed to load content</Text>
              <Text className="text-gray-500 text-center mt-2">{errorName}</Text>
              <TouchableOpacity 
                onPress={() => router.back()}
                className="mt-6 bg-blue-600 px-8 py-3 rounded-xl"
              >
                <Text className="text-white font-bold">Go Back</Text>
              </TouchableOpacity>
            </View>
          )}
          
          injectedJavaScript={`
            window.ReactNativeWebView.postMessage("Web page is ready");
          `}
        />

        {loading && (
          <View className="absolute inset-0 justify-center items-center bg-white">
            <ActivityIndicator size="large" color="#2563eb" />
            <Text className="mt-4 text-gray-500 font-medium">Loading Course Content...</Text>
          </View>
        )}
      </View>
    </View>
  );
}