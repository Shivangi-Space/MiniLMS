import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, TextInput, ActivityIndicator, RefreshControl } from 'react-native';
import { LegendList } from '@legendapp/list'; 
import { Search } from 'lucide-react-native';
import apiClient from '../../src/api/client';
import { CourseCard } from '../../src/components/CourseCard';
import { Course, Instructor } from '../../src/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchData = async () => {
        try {
            const [coursesRes, userRes] = await Promise.all([
                apiClient.get('/public/randomproducts?limit=10'),
                apiClient.get('/public/randomusers?limit=10'),
            ]);

            const products = coursesRes.data.data.data;
            const instructors = userRes.data.data.data;

            const mergedData = products.map((product: any, index: number) => {
                const teacher: Instructor = instructors[index % instructors.length];
                return {
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    thumbnail:
                        product.images?.[0] &&
                            product.images[0].includes('dummyjson')
                            ? `https://picsum.photos/seed/${product.id}/800/400`
                            : product.images?.[0],

                    price: product.price,
                    instructor: `${teacher.name.first} ${teacher.name.last}`,
                    instructorImage: teacher.picture.medium,
                };
            });
            await AsyncStorage.setItem('cached_courses', JSON.stringify(mergedData));
            setCourses(mergedData);

        } catch (error) {
            const cached = await AsyncStorage.getItem('cached_courses');
            if(cached) {
                setCourses(JSON.parse(cached));
            }
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredCourses = useMemo(() => {
        return courses.filter(c =>
            c.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, courses]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData();
    }, []);

    if (loading) {
        return (
            <View className='flex-1 justify-center items-center bg-white'>
                <ActivityIndicator size="large" color="#2563eb" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white px-5 pt-14">
            <Text className="text-3xl font-black text-gray-900 mb-1">
                Explore
            </Text>

            <Text className="text-gray-500 mb-6">
                Find the perfect course for you.
            </Text>

            <View className="flex-row items-center bg-gray-100 px-4 py-1 rounded-2xl mb-6">
                <Search size={20} color="#9ca3af" />
                <TextInput
                    placeholder='Search courses...'
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    className="flex-1 ml-3 text-base text-gray-900"
                />
            </View>

            <LegendList
                data={filteredCourses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <CourseCard item={item} />}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                estimatedItemSize={300}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>
    );
}