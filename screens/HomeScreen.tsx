import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NewsCard from '../components/NewsCard';
import { API_KEY, API_URL } from '../constants/config';
import { RootStackParamList } from '../types/types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [headlines, setHeadlines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get(`${API_URL}/top-headlines`, {
          params: {
            country: 'us',
            apiKey: API_KEY,
            pageSize: 5,
          },
        });
        setHeadlines(response.data.articles);
      } catch (error) {
        console.error('Error fetching headlines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeadlines();
  }, []);

  const navigateToCategory = (category: string) => {
    navigation.navigate('News', { category });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Latest News</Text>
      
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.newsContainer}>
          {headlines.map((item, index) => (
            <NewsCard 
              key={index} 
              newsItem={item} 
              onPress={() => navigation.navigate('NewsDetail', { newsItem: item })}
            />
          ))}
        </View>
      )}

      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.categoriesContainer}>
        {['business', 'entertainment', 'health', 'science', 'sports', 'technology'].map((category) => (
          <TouchableOpacity 
            key={category} 
            style={styles.categoryCard}
            onPress={() => navigateToCategory(category)}
          >
            <Ionicons name="ios-list" size={24} color="#1e88e5" />
            <Text style={styles.categoryText}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
    color: '#333',
  },
  newsContainer: {
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});

export default HomeScreen;