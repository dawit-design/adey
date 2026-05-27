import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/Home/HomeScreen';
import DiscoverScreen from '../screens/Discover/DiscoverScreen';
import PlaceDetailScreen from '../screens/PlaceDetail/PlaceDetailScreen';
import TripsScreen from '../screens/Trips/TripsScreen';
import SavedScreen from '../screens/Saved/SavedScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EditProfileScreen from '../screens/EditProfile/EditProfileScreen';
import { colors } from '../styles/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

const tabIcons = {
  Home: 'home-outline',
  Discover: 'compass-outline',
  Trips: 'map-outline',
  Saved: 'bookmark-outline',
  Profile: 'person-circle-outline',
};

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.darkGray,
        tabBarStyle: {
          height: 64,
          paddingBottom: 6,
          backgroundColor: colors.white,
          borderTopColor: colors.borderGray,
          borderTopWidth: 1,
        },
        tabBarIcon: ({ color, size }) => {
          const iconName = tabIcons[route.name] || 'ellipse-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Trips" component={TripsScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}
