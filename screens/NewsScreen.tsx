import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import NewsCard from '../components/NewsCard';
import { API_KEY, API_URL } from '../constants/config';
import { RootStackParamList } from '../types/types';

type NewsScreenRouteProp = {
  params?: {
    category?: string;
  };
};

type NewsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'News'>;

const NewsScreen = () => {
  const route = useRoute<NewsScreenRouteProp>();
  const navigation = useNavigation<NewsScreenNavigationProp>();
  const category = route.params?.category || 'general';
  
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/top-headlines`, {
          params: {
            category: category,
            apiKey: API_KEY,
            pageSize: 20,
          },
        });
        setNews(response.data.articles);
        setError(null);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {category.charAt(0).toUpperCase() + category.slice(1)} News
      </Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#1e88e5" style={styles.loader} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <View style={styles.newsContainer}>
          {news.map((item, index) => (
            <NewsCard 
              key={index} 
              newsItem={item} 
              onPress={() => navigation.navigate('NewsDetail', { newsItem: item })}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  newsContainer: {
    marginBottom: 16,
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default NewsScreen;