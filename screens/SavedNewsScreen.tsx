import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import NewsCard from '../components/NewsCard';
import { useSavedNews } from '../context/SavedNewsContext';
import { RootStackParamList } from '../types/types';

type SavedNewsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SavedNews'>;

const SavedNewsScreen = () => {
  const { savedNews } = useSavedNews();
  const navigation = useNavigation<SavedNewsScreenNavigationProp>();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Saved News</Text>
      
      {savedNews.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't saved any news yet.</Text>
        </View>
      ) : (
        <View style={styles.newsContainer}>
          {savedNews.map((item, index) => (
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default SavedNewsScreen;