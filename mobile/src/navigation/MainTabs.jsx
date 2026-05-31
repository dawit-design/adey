import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/Home/HomeScreen";
import DiscoverScreen from "../screens/Discover/DiscoverScreen";
import TripsScreen from "../screens/Trips/TripsScreen";
import SavedScreen from "../screens/Saved/SavedScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import EditProfileScreen from "../screens/EditProfile/EditProfileScreen";

import PlaceDetailScreen from "../screens/PlaceDetail/PlaceDetailScreen";
import CollectionDetailsScreen from "../screens/Collection/CollectionDetailsScreen";
import PassportScreen from "../screens/Passport/PassportScreen";

import AdminPlacesScreen from "../screens/Admin/AdminPlacesScreen";
import PlaceFormScreen from "../screens/Admin/PlaceFormScreen";

import { colors } from "../styles/theme";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="PlaceDetails" component={PlaceDetailScreen} />
      <Stack.Screen
        name="CollectionDetails"
        component={CollectionDetailsScreen}
      />
    </Stack.Navigator>
  );
}

function DiscoverStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DiscoverMain" component={DiscoverScreen} />
      <Stack.Screen name="PlaceDetails" component={PlaceDetailScreen} />
    </Stack.Navigator>
  );
}

function SavedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SavedMain" component={SavedScreen} />
      <Stack.Screen name="PlaceDetails" component={PlaceDetailScreen} />
    </Stack.Navigator>
  );
}

function TripsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TripsMain" component={TripsScreen} />
      <Stack.Screen name="PlaceDetails" component={PlaceDetailScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Passport" component={PassportScreen} />
      <Stack.Screen name="PlaceDetails" component={PlaceDetailScreen} />

      <Stack.Screen name="AdminPlaces" component={AdminPlacesScreen} />
      <Stack.Screen name="PlaceForm" component={PlaceFormScreen} />
    </Stack.Navigator>
  );
}

const tabIcons = {
  Home: "home-outline",
  Discover: "compass-outline",
  Trips: "map-outline",
  Saved: "bookmark-outline",
  Profile: "person-circle-outline",
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
          const iconName = tabIcons[route.name] || "ellipse-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Discover" component={DiscoverStack} />
      <Tab.Screen name="Trips" component={TripsStack} />
      <Tab.Screen name="Saved" component={SavedStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}