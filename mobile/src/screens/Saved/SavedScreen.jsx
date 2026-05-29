import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";
import { colors } from "../../styles/theme";
import { getSavedPlaces, unsavePlace } from "../../services/savedService";

export default function SavedScreen() {
  const navigation = useNavigation();

  const [savedPlaces, setSavedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedPlaces = async () => {
    try {
      setLoading(true);
      const data = await getSavedPlaces();
      setSavedPlaces(data);
    } catch (error) {
      console.log(
        "Error fetching saved places:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchSavedPlaces();
    }, [])
  );

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  };

  const openPlaceDetails = (place) => {
    if (!place?.slug) return;

    navigation.navigate("PlaceDetails", {
      slug: place.slug,
      from: "Saved",
    });
  };

  const confirmRemoveSaved = (placeId) => {
    Alert.alert(
      "Remove saved place",
      "Remove this place from your saved list?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => handleRemoveSaved(placeId),
        },
      ]
    );
  };

  const handleRemoveSaved = async (placeId) => {
    try {
      await unsavePlace(placeId);
      setSavedPlaces((prev) => prev.filter((item) => item._id !== placeId));
    } catch (error) {
      console.log(
        "Error removing saved place:",
        error.response?.data || error.message
      );
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.88}
      onPress={() => openPlaceDetails(item)}
    >
      {item.coverImage ? (
        <Image source={{ uri: item.coverImage }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Ionicons name="image-outline" size={34} color={colors.primary} />
        </View>
      )}

      <View style={styles.imageOverlay}>
        <View style={styles.categoryPill}>
          <Text style={styles.categoryText}>{item.category || item.type}</Text>
        </View>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => confirmRemoveSaved(item._id)}
        >
          <Ionicons name="heart-dislike-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.placeName}>{item.name}</Text>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={15} color={colors.primary} />
          <Text style={styles.location}>
            {item.city ? `${item.city}, ` : ""}
            {item.region || "Ethiopia"}
          </Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {item.shortDescription}
        </Text>

        <View style={styles.cardFooter}>
          <Text style={styles.footerText}>Saved inspiration</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.darkGray} />
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.heroContent}>
          <Text style={styles.eyebrow}>ADEY SAVED</Text>
          <Text style={styles.title}>Your Saved Places</Text>
          <Text style={styles.subtitle}>
            Keep beautiful places here before turning them into trips.
          </Text>
        </View>
      </View>

      {savedPlaces.length === 0 ? (
        <View style={styles.emptyCard}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name="bookmark-outline"
              size={32}
              color={colors.primary}
            />
          </View>

          <Text style={styles.emptyTitle}>No saved places yet</Text>

          <Text style={styles.emptyText}>
            Tap the heart on destination pages to build your Ethiopia inspiration
            board.
          </Text>
        </View>
      ) : (
        <FlatList
          data={savedPlaces}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}