import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";
import { getPlaceBySlug } from "../../services/placeService";
import {
  getSavedPlaceIds,
  savePlace,
  unsavePlace,
} from "../../services/savedService";

import {
  getPassport,
  addVisitedPlace,
  removeVisitedPlace,
  addWantToVisitPlace,
  removeWantToVisitPlace,
} from "../../services/passportService";

export default function PlaceDetailScreen({ route, navigation }) {
  const { slug } = route.params || {};

  const [place, setPlace] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isVisited, setIsVisited] = useState(false);
  const [isWantToVisit, setIsWantToVisit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlace();
  }, [slug]);

  const loadPlace = async () => {
    try {
      setLoading(true);

      const placeData = await getPlaceBySlug(slug);
      setPlace(placeData);

      try {
        const savedIds = await getSavedPlaceIds();
        setIsSaved(savedIds.includes(placeData._id));
      } catch (savedError) {
        console.log(
          "Saved IDs not loaded:",
          savedError.response?.data || savedError.message
        );
        setIsSaved(false);
      }

      try {
        const passport = await getPassport();

        const visitedIds =
          passport.visitedPlaces?.map((item) => item._id || item) || [];

        const wantToVisitIds =
          passport.wantToVisitPlaces?.map((item) => item._id || item) || [];

        setIsVisited(visitedIds.includes(placeData._id));
        setIsWantToVisit(wantToVisitIds.includes(placeData._id));
      } catch (passportError) {
        console.log(
          "Passport not loaded:",
          passportError.response?.data || passportError.message
        );
        setIsVisited(false);
        setIsWantToVisit(false);
      }
    } catch (error) {
      console.log("Failed to load place:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSavePlace = async () => {
    try {
      if (!place) return;

      if (isSaved) {
        await unsavePlace(place._id);
        setIsSaved(false);
      } else {
        await savePlace(place._id);
        setIsSaved(true);
      }
    } catch (error) {
      console.log(
        "Failed to save/unsave place:",
        error.response?.data || error.message
      );
    }
  };

  const toggleWantToVisit = async () => {
    try {
      if (!place) return;

      if (isWantToVisit) {
        await removeWantToVisitPlace(place._id);
        setIsWantToVisit(false);
      } else {
        await addWantToVisitPlace(place._id);
        setIsWantToVisit(true);
      }
    } catch (error) {
      console.log(
        "Failed to update want to visit:",
        error.response?.data || error.message
      );
    }
  };

  const toggleVisited = async () => {
    try {
      if (!place) return;

      if (isVisited) {
        await removeVisitedPlace(place._id);
        setIsVisited(false);
      } else {
        await addVisitedPlace(place._id);
        setIsVisited(true);
        setIsWantToVisit(false);
      }
    } catch (error) {
      console.log(
        "Failed to update visited:",
        error.response?.data || error.message
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!place) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Place not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={toggleSavePlace}>
          <Ionicons
            name={isSaved ? "heart" : "heart-outline"}
            size={24}
            color={isSaved ? "#E63946" : "#fff"}
          />
        </TouchableOpacity>

        <View style={styles.heroOverlay}>
          <Text style={styles.type}>{place.category || place.type}</Text>
          <Text style={styles.title}>{place.name}</Text>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={16} color="#fff" />
            <Text style={styles.location}>
              {place.city || place.area || place.region}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.shortDescription}>{place.shortDescription}</Text>

        <View style={styles.passportActions}>
          <TouchableOpacity
            style={[
              styles.passportButton,
              isWantToVisit && styles.passportButtonActive,
            ]}
            onPress={toggleWantToVisit}
          >
            <Ionicons
              name={isWantToVisit ? "flag" : "flag-outline"}
              size={18}
              color={isWantToVisit ? "#fff" : "#556B2F"}
            />
            <Text
              style={[
                styles.passportButtonText,
                isWantToVisit && styles.passportButtonTextActive,
              ]}
            >
              Want to Visit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.passportButton,
              isVisited && styles.passportButtonActive,
            ]}
            onPress={toggleVisited}
          >
            <Ionicons
              name={isVisited ? "checkmark-circle" : "checkmark-circle-outline"}
              size={18}
              color={isVisited ? "#fff" : "#556B2F"}
            />
            <Text
              style={[
                styles.passportButtonText,
                isVisited && styles.passportButtonTextActive,
              ]}
            >
              Visited
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaCard}>
            <Ionicons name="time-outline" size={20} color="#556B2F" />
            <Text style={styles.metaLabel}>Duration</Text>
            <Text style={styles.metaValue}>
              {place.estimatedVisitDuration || "Flexible"}
            </Text>
          </View>

          <View style={styles.metaCard}>
            <Ionicons name="cash-outline" size={20} color="#556B2F" />
            <Text style={styles.metaLabel}>Budget</Text>
            <Text style={styles.metaValue}>{place.priceRange || "N/A"}</Text>
          </View>
        </View>

        {place.story ? (
          <Section title="Story">
            <Text style={styles.body}>{place.story}</Text>
          </Section>
        ) : null}

        {place.highlights?.length > 0 ? (
          <Section title="Highlights">
            {place.highlights.map((item, index) => (
              <Text key={index} style={styles.bullet}>
                • {item}
              </Text>
            ))}
          </Section>
        ) : null}

        {place.activities?.length > 0 ? (
          <Section title="Activities">
            <View style={styles.chipWrap}>
              {place.activities.map((item, index) => (
                <View key={index} style={styles.chip}>
                  <Text style={styles.chipText}>{item}</Text>
                </View>
              ))}
            </View>
          </Section>
        ) : null}

        {place.idealFor?.length > 0 ? (
          <Section title="Ideal For">
            <View style={styles.chipWrap}>
              {place.idealFor.map((item, index) => (
                <View key={index} style={styles.softChip}>
                  <Text style={styles.softChipText}>{item}</Text>
                </View>
              ))}
            </View>
          </Section>
        ) : null}

        <Section title="Best Time to Visit">
          <Text style={styles.body}>
            {place.bestTimeToVisit || "Not specified"}
          </Text>
        </Section>
      </View>
    </ScrollView>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}