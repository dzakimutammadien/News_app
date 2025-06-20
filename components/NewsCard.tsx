import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSavedNews } from '../context/SavedNewsContext';
import { NewsItem } from '../types/types';

interface NewsCardProps {
  newsItem: NewsItem;
  onPress: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ newsItem, onPress }) => {
  const { isSaved, saveNews, removeNews } = useSavedNews();

  const handleSavePress = () => {
    if (isSaved(newsItem.url)) {
      removeNews(newsItem.url);
    } else {
      saveNews(newsItem);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image 
        source={{ uri: newsItem.urlToImage || 'https://via.placeholder.com/150' }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{newsItem.title}</Text>
        <Text style={styles.source}>{newsItem.source.name}</Text>
        <Text style={styles.date}>{new Date(newsItem.publishedAt).toLocaleDateString()}</Text>
      </View>
      <TouchableOpacity onPress={handleSavePress} style={styles.saveButton}>
        <Ionicons 
          name={isSaved(newsItem.url) ? "bookmark" : "bookmark-outline"} 
          size={24} 
          color={isSaved(newsItem.url) ? "#1e88e5" : "#666"} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  source: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  saveButton: {
    padding: 12,
    justifyContent: 'center',
  },
});

export default NewsCard;