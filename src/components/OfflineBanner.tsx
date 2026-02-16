import React, { useState, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import * as Network from 'expo-network';
import { WifiOff } from 'lucide-react-native';

export const OfflineBanner = () => {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const checkNetwork = async () => {
            const state = await Network.getNetworkStateAsync();
            setIsOffline(!state.isConnected);
        };

        checkNetwork();

        const interval = setInterval(checkNetwork, 3000);
        return () => clearInterval(interval);
    }, []);

    if(!isOffline) return null;

    return (
        <View className="absolute top-0 left-0 right-0 bg-red-600 pt-12 pb-2 items-center z-50 flex-row justify-center">
            <WifiOff size={16} color="white" />
            <Text className="text-white font-bold ml-2 text-xs">
                OFFLINE MODE - CHECK YOUR INTERNT
            </Text>
        </View>
    );
};