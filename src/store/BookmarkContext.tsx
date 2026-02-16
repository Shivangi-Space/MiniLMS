import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotifications } from '../hooks/useNotifications';

interface BookmarkContextType {
  bookmarks: number[];
  toggleBookmark: (courseId: number) => void;
  isBookmarked: (courseId: number) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const { notifyBookmarkGoal } = useNotifications();

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    const stored = await AsyncStorage.getItem('user_bookmarks');
    if (stored) setBookmarks(JSON.parse(stored));
  };

  const toggleBookmark = async (courseId: number) => {
    let newBookmarks = [...bookmarks];
    if (newBookmarks.includes(courseId)) {
      newBookmarks = newBookmarks.filter(id => id !== courseId);
    } else {
      newBookmarks.push(courseId);
      notifyBookmarkGoal(newBookmarks.length);
    }
    setBookmarks(newBookmarks);
    await AsyncStorage.setItem('user_bookmarks', JSON.stringify(newBookmarks));
  };

  const isBookmarked = (courseId: number) => bookmarks.includes(courseId);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error('useBookmarks must be used within BookmarkProvider');
  return context;
};