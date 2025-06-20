import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CategoriesScreen from '../screens/CategoriesScreen';
import HomeScreen from '../screens/HomeScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import NewsScreen from '../screens/NewsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SavedNewsScreen from '../screens/SavedNewsScreen';
import { RootStackParamList } from '../types/types';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const NewsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="News" 
        component={NewsScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="NewsDetail" 
        component={NewsDetailScreen} 
        options={{ title: 'News Detail' }} 
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'NewsStack') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Categories') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'SavedNews') {
            iconName = focused ? 'bookmarks' : 'bookmarks-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1e88e5',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="NewsStack" component={NewsStack} options={{ title: 'News' }} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="SavedNews" component={SavedNewsScreen} options={{ title: 'Saved' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;