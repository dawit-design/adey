import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import globalStyles from "../../styles/theme";
import styles from "./styles";

import { getAllPlaces } from "../../services/placeService";
import { getFeaturedCollections } from "../../services/collectionService";

import {
  getSavedPlaceIds,
  savePlace,
  unsavePlace,
} from "../../services/savedService";

const EXPERIENCES = [
  {
    id: "ancient",
    title: "Ancient Ethiopia",
    subtitle: "Kingdoms, empires, and living history",
    icon: "business-outline",
    filters: {
      categories: ["historical", "heritage"],
      tags: ["history", "heritage", "unesco"],
    },
  },
  {
    id: "nature",
    title: "Nature & Wildlife",
    subtitle: "Mountains, forests, lakes, and wildlife",
    icon: "leaf-outline",
    filters: {
      categories: ["nature", "wildlife", "mountain", "lake", "eco"],
    },
  },
  {
    id: "spiritual",
    title: "Spiritual Ethiopia",
    subtitle: "Churches, monasteries, mosques, and sacred places",
    icon: "sparkles-outline",
    filters: {
      categories: ["religious"],
    },
  },
  {
    id: "weekend",
    title: "Weekend Escapes",
    subtitle: "Perfect short trips from Addis",
    icon: "car-outline",
    filters: {
      tags: ["weekend", "addis escape"],
    },
  },
  {
    id: "adventure",
    title: "Adventure",
    subtitle: "Treks, caves, cliffs, deserts, and expeditions",
    icon: "trail-sign-outline",
    filters: {
      categories: ["adventure"],
      tags: ["trekking", "hiking", "cave", "desert", "volcano"],
    },
  },
  {
    id: "coffee",
    title: "Coffee Origins",
    subtitle: "The birthplace of Arabica coffee",
    icon: "cafe-outline",
    filters: {
      tags: ["coffee"],
    },
  },
  {
    id: "luxury",
    title: "Luxury Retreats",
    subtitle: "Resorts, eco-lodges, and premium escapes",
    icon: "bed-outline",
    filters: {
      types: ["resort", "lodge", "hotel"],
      priceRanges: ["premium", "luxury"],
    },
  },
  {
    id: "hidden",
    title: "Hidden Gems",
    subtitle: "Less crowded places worth discovering",
    icon: "compass-outline",
    filters: {
      tourismPriority: "hidden-gem",
    },
  },
];

export default function HomeScreen({ navigation }) {
  const [featuredPlaces, setFeaturedPlaces] = useState([]);
  const [collections, setCollections] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHomeData = async () => {
    try {
      setLoading(true);

      const placesData = await getAllPlaces({ featured: true });
      setFeaturedPlaces(Array.isArray(placesData) ? placesData : []);

      const collectionsData = await getFeaturedCollections();
      setCollections(Array.isArray(collectionsData) ? collectionsData : []);

      try {
        const savedData = await getSavedPlaceIds();
        setSavedIds(savedData);
      } catch (savedError) {
        console.log(
          "Saved IDs not loaded:",
          savedError.response?.data || savedError.message
        );
        setSavedIds([]);
      }
    } catch (error) {
      console.log("Failed to load home data:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  const toggleSavePlace = async (placeId) => {
    try {
      const isSaved = savedIds.includes(placeId);

      if (isSaved) {
        await unsavePlace(placeId);
        setSavedIds((prev) => prev.filter((id) => id !== placeId));
      } else {
        await savePlace(placeId);
        setSavedIds((prev) => [...prev, placeId]);
      }
    } catch (error) {
      console.log(
        "Failed to save/unsave place:",
        error.response?.data || error.message
      );
    }
  };

  const renderExperience = ({ item }) => (
    <TouchableOpacity
      style={styles.experienceCard}
      onPress={() =>
        navigation.navigate("Discover", {
          experienceTitle: item.title,
          filters: item.filters,
        })
      }
    >
      <View style={styles.experienceIcon}>
        <Ionicons name={item.icon} size={22} color="#556B2F" />
      </View>

      <Text style={styles.experienceTitle}>{item.title}</Text>
      <Text style={styles.experienceSubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );

  const renderCollection = ({ item }) => (
    <TouchableOpacity
      style={styles.collectionCard}
      onPress={() =>
        navigation.navigate("CollectionDetails", {
          slug: item.slug,
        })
      }
    >
      <Text style={styles.collectionLabel}>Curated Journey</Text>

      <Text style={styles.collectionTitle}>{item.title}</Text>

      <Text style={styles.collectionSubtitle} numberOfLines={2}>
        {item.subtitle}
      </Text>

      <Text style={styles.collectionMeta}>
        {item.estimatedDuration} · {item.places?.length || 0} places
      </Text>
    </TouchableOpacity>
  );

  const renderPlace = ({ item }) => {
    const isSaved = savedIds.includes(item._id);

    return (
      <TouchableOpacity
        style={styles.placeCard}
        onPress={() =>
          navigation.navigate("PlaceDetails", {
            slug: item.slug,
          })
        }
      >
        <TouchableOpacity
          style={styles.heartButton}
          onPress={(e) => {
            e.stopPropagation();
            toggleSavePlace(item._id);
          }}
        >
          <Ionicons
            name={isSaved ? "heart" : "heart-outline"}
            size={24}
            color={isSaved ? "#E63946" : "#556B2F"}
          />
        </TouchableOpacity>

        <Text style={styles.placeType}>{item.category || item.type}</Text>
        <Text style={styles.placeName}>{item.name}</Text>

        <Text style={styles.placeLocation}>
          {item.city || item.area || item.region}
        </Text>

        <Text style={styles.placeDescription} numberOfLines={2}>
          {item.shortDescription}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Text style={styles.kicker}>Discover Ethiopia beautifully</Text>

          <Text style={styles.header}>
            What kind of Ethiopia do you want to experience?
          </Text>

          <Text style={styles.body}>
            Explore curated places, stories, landscapes, culture, heritage, and
            weekend escapes.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Choose your experience</Text>
        </View>

        <FlatList
          data={EXPERIENCES}
          keyExtractor={(item) => item.id}
          renderItem={renderExperience}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.experienceList}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Curated Journeys</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 24 }} />
        ) : (
          <FlatList
            data={collections}
            keyExtractor={(item) => item._id}
            renderItem={renderCollection}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.collectionList}
          />
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Places</Text>

          <TouchableOpacity onPress={() => navigation.navigate("Discover")}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 30 }} />
        ) : (
          <FlatList
            data={featuredPlaces}
            keyExtractor={(item) => item._id}
            renderItem={renderPlace}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}

        <TouchableOpacity
          style={[
            globalStyles.buttonPrimary,
            { marginTop: 12, marginBottom: 24 },
          ]}
          onPress={loadHomeData}
        >
          <Text style={globalStyles.buttonPrimaryText}>Refresh</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}