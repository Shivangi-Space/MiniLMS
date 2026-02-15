import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Bookmark, Star } from 'lucide-react-native';
import { Course } from '../types';
import { useRouter } from 'expo-router';
import { cssInterop } from 'nativewind';

cssInterop(Image, { className: 'style' });

export const CourseCard = memo(({ item }: { item: Course }) => {
    const router = useRouter();

    // console.log('Thumbnail URL:', item.thumbnail);

    const imageSource =
        item.thumbnail?.startsWith('https')
            ? item.thumbnail
            : 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80';

    return (

        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push({
                pathname: "/course-details",
                params: {
                    id: item.id,
                    title: item.title,
                    instructor: item.instructor,
                    image: item.thumbnail
                },
            })}
            className="mb-5"
        >
            <View className="bg-white rounded-3xl overflow-hidden mb-5 border border-gray-100 shadow-sm">
                <Image
                    source={{ uri: imageSource }}
                    contentFit="cover"
                    transition={500}
                    className="w-full h-48 bg-gray-200" 
                />


                <View className="p-4">
                    <Text className="text-xl font-bold text-gray-900 mb-1" numberOfLines={1}>
                        {item.title}
                    </Text>

                    <Text className="text-gray-500 text-sm mb-4" numberOfLines={2}>
                        {item.description}
                    </Text>

                    <View className="flex-row items-center justify-between border-t border-gray-50 pt-4">
                        <View className="flex-row items-center">
                            <Image
                                source={{ uri: item.instructorImage }}
                                className="w-8 h-8 rounded-full bg-gray-200"
                            />
                            <Text className="text-gray-700 ml-2 font-medium">{item.instructor}</Text>
                        </View>

                        <TouchableOpacity className="p-2 bg-gray-50 rounded-full">
                            <Bookmark size={20} color="#4b5563" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
});