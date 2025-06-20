import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSavedNews } from '../context/SavedNewsContext';
import { RootStackParamList } from '../types/types';

type NewsDetailScreenRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;

interface NewsDetailScreenProps {
  route: NewsDetailScreenRouteProp;
}

const NewsDetailScreen: React.FC<NewsDetailScreenProps> = ({ route }) => {
  const { newsItem } = route.params;
  const { isSaved, saveNews, removeNews } = useSavedNews();

  const handleSavePress = () => {
    if (isSaved(newsItem.url)) {
      removeNews(newsItem.url);
    } else {
      saveNews(newsItem);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: newsItem.urlToImage || 'https://via.placeholder.com/400x200' }} 
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>{newsItem.title}</Text>
        <TouchableOpacity onPress={handleSavePress} style={styles.saveButton}>
          <Ionicons 
            name={isSaved(newsItem.url) ? "bookmark" : "bookmark-outline"} 
            size={24} 
            color={isSaved(newsItem.url) ? "#1e88e5" : "#666"} 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.metaContainer}>
        <Text style={styles.source}>{newsItem.source.name}</Text>
        <Text style={styles.date}>{new Date(newsItem.publishedAt).toLocaleDateString()}</Text>
      </View>
      
      <Text style={styles.content}>{newsItem.content || newsItem.description}</Text>
      
      <TouchableOpacity 
        style={styles.readMoreButton}
        onPress={() => {/* Implement webview or browser opening */}}
      >
        <Text style={styles.readMoreText}>Read Full Article</Text>
      </TouchableOpacity>
      
      {newsItem.url && (
        <View style={styles.webViewContainer}>
          <WebView 
            source={{ uri: newsItem.url }}
            style={styles.webView}
            startInLoadingState={true}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    marginLeft: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  source: {
    fontSize: 14,
    color: '#1e88e5',
    fontWeight: '500',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  readMoreButton: {
    backgroundColor: '#1e88e5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  readMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  webViewContainer: {
    height: 400,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
  webView: {
    flex: 1,
  },
});

export default NewsDetailScreen;