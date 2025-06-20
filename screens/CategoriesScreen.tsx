import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../types/types';

type CategoriesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Categories'>;

const CategoriesScreen = () => {
  const navigation = useNavigation<CategoriesScreenNavigationProp>();

  const categories = [
    { name: 'Business', icon: 'business' },
    { name: 'Entertainment', icon: 'film' },
    { name: 'Health', icon: 'medkit' },
    { name: 'Science', icon: 'flask' },
    { name: 'Sports', icon: 'football' },
    { name: 'Technology', icon: 'laptop' },
    { name: 'General', icon: 'globe' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>News Categories</Text>
      
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.categoryCard}
            onPress={() => navigation.navigate('News', { category: category.name.toLowerCase() })}
          >
            <Ionicons name={category.icon} size={32} color="#1e88e5" />
            <Text style={styles.categoryText}>{category.name}</Text>
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
    marginBottom: 24,
    color: '#333',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
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
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});

export default CategoriesScreen;