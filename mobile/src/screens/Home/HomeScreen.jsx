import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import globalStyles from "../../styles/theme";
import styles from "./styles";
import { getAllPlaces } from "../../services/placeService";
import {
  getSavedPlaceIds,
  savePlace,
  unsavePlace,
} from "../../services/savedService";

export default function HomeScreen({ navigation }) {
  const [featuredPlaces, setFeaturedPlaces] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFeaturedPlaces = async () => {
    try {
      setLoading(true);

      const placesData = await getAllPlaces({ featured: true });
      setFeaturedPlaces(placesData);

      try {
        const savedData = await getSavedPlaceIds();
        setSavedIds(savedData);
      } catch (savedError) {
        console.log(
          "Saved IDs not loaded:",
          savedError.response?.data || savedError.message,
        );
        setSavedIds([]);
      }
    } catch (error) {
      console.log("Failed to load featured places:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeaturedPlaces();
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
        error.response?.data || error.message,
      );
    }
  };

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

        <Text style={styles.placeType}>{item.type}</Text>
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
      <View style={styles.heroCard}>
        <Text style={styles.header}>Welcome to Adey Travels</Text>
        <Text style={styles.body}>
          Discover Ethiopia through curated places, resorts, landscapes, and
          cultural experiences.
        </Text>
      </View>

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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity
        style={[globalStyles.buttonPrimary, { marginTop: 12 }]}
        onPress={loadFeaturedPlaces}
      >
        <Text style={globalStyles.buttonPrimaryText}>Refresh</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
