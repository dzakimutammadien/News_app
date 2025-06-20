import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { NewsItem } from '../types/types';

interface SavedNewsContextType {
  savedNews: NewsItem[];
  saveNews: (news: NewsItem) => Promise<void>;
  removeNews: (url: string) => Promise<void>;
  isSaved: (url: string) => boolean;
}

const SavedNewsContext = createContext<SavedNewsContextType>({
  savedNews: [],
  saveNews: async () => {},
  removeNews: async () => {},
  isSaved: () => false,
});

export const useSavedNews = () => useContext(SavedNewsContext);

export const SavedNewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedNews, setSavedNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const loadSavedNews = async () => {
      try {
        const saved = await AsyncStorage.getItem('savedNews');
        if (saved) {
          setSavedNews(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Failed to load saved news', error);
      }
    };

    loadSavedNews();
  }, []);

  const saveNews = async (news: NewsItem) => {
    try {
      const updatedSavedNews = [...savedNews, news];
      setSavedNews(updatedSavedNews);
      await AsyncStorage.setItem('savedNews', JSON.stringify(updatedSavedNews));
    } catch (error) {
      console.error('Failed to save news', error);
    }
  };

  const removeNews = async (url: string) => {
    try {
      const updatedSavedNews = savedNews.filter(item => item.url !== url);
      setSavedNews(updatedSavedNews);
      await AsyncStorage.setItem('savedNews', JSON.stringify(updatedSavedNews));
    } catch (error) {
      console.error('Failed to remove news', error);
    }
  };

  const isSaved = (url: string) => {
    return savedNews.some(item => item.url === url);
  };

  return (
    <SavedNewsContext.Provider value={{ savedNews, saveNews, removeNews, isSaved }}>
      {children}
    </SavedNewsContext.Provider>
  );
};