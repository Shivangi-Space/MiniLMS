import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';
import { AppState, Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export const useNotifications = () => {
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        registerForPushNotificationsAsync();

        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.current.match(/active/) && nextAppState === 'background') {
                scheduleInactivityReminder();
            }
            if (nextAppState === 'active') {
                Notifications.cancelAllScheduledNotificationsAsync();
            }
            appState.current = nextAppState;
        });

        return () => subscription.remove();
    }, []);

    const registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') return;
    };

    const scheduleInactivityReminder = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "We miss you! 📚",
                body: "You haven't studied in 24 hours. Ready to continue your course?",
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: 24 * 60 * 60,
                repeats: false,
            }
        });
    };


    // Requirement: Notify when user bookmarks 5+ courses
    const notifyBookmarkGoal = async (count: number) => {
        if (count === 5) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Course Enthusiast! 🌟",
                    body: "You have bookmarked 5 courses. Time to start learning one?",
                },
                trigger: null, // Send immediately
            });
        }
    };

    return { notifyBookmarkGoal };
};