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
      } catch {
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
      } catch {
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
      console.log("Failed to save/unsave:", error.response?.data || error.message);
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
      console.log("Failed to update want to visit:", error.response?.data || error.message);
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
      console.log("Failed to update visited:", error.response?.data || error.message);
    }
  };

  const shouldShowHiddenGem =
    place?.tourismPriority === "hidden-gem" ||
    (place?.hiddenGemScore && place.hiddenGemScore >= 8);

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
        <Text>Place not found</Text>
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

        {place.story ? (
          <View style={styles.storyCard}>
            <Text style={styles.storyLabel}>Why it matters</Text>
            <Text style={styles.storyText}>{place.story}</Text>
          </View>
        ) : null}

        {place.ethiopiaScore ? (
          <View style={styles.scoreCard}>
            <View style={styles.scoreHeader}>
              <Text style={styles.scoreLabel}>Ethiopia Score</Text>
              <Text style={styles.scoreNumber}>{place.ethiopiaScore}/100</Text>
            </View>

            <Text style={styles.scoreReason}>
              {place.scoreReason ||
                "A meaningful Ethiopian travel experience based on culture, nature, or visitor appeal."}
            </Text>
          </View>
        ) : null}

        <View style={styles.insightGrid}>
          {place.bestForPhotography ? (
            <View style={styles.insightChip}>
              <Ionicons name="camera-outline" size={16} color="#556B2F" />
              <Text style={styles.insightText}>Great for photography</Text>
            </View>
          ) : null}

          {place.bestForFamilies ? (
            <View style={styles.insightChip}>
              <Ionicons name="people-outline" size={16} color="#556B2F" />
              <Text style={styles.insightText}>Family friendly</Text>
            </View>
          ) : null}

          {place.difficultyLevel ? (
            <View style={styles.insightChip}>
              <Ionicons name="walk-outline" size={16} color="#556B2F" />
              <Text style={styles.insightText}>
                {place.difficultyLevel} difficulty
              </Text>
            </View>
          ) : null}

          {shouldShowHiddenGem ? (
            <View style={styles.insightChip}>
              <Ionicons name="diamond-outline" size={16} color="#556B2F" />
              <Text style={styles.insightText}>
                Hidden gem {place.hiddenGemScore}/10
              </Text>
            </View>
          ) : null}
        </View>

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

        <View style={styles.metaRow}>
          <View style={styles.metaCardFull}>
            <Ionicons name="calendar-outline" size={20} color="#556B2F" />
            <Text style={styles.metaLabel}>Best time to go</Text>
            <Text style={styles.metaValue}>
              {place.bestTimeToVisit || "Not specified"}
            </Text>
          </View>
        </View>

        {place.localTips?.length > 0 ? (
          <Section title="Local tips">
            {place.localTips.map((item, index) => (
              <View key={index} style={styles.tipRow}>
                <Ionicons name="bulb-outline" size={17} color="#556B2F" />
                <Text style={styles.tipText}>{item}</Text>
              </View>
            ))}
          </Section>
        ) : null}

        {place.travelWarnings?.length > 0 ? (
          <Section title="Before you go">
            {place.travelWarnings.map((item, index) => (
              <View key={index} style={styles.warningRow}>
                <Ionicons name="alert-circle-outline" size={17} color="#9A6B00" />
                <Text style={styles.warningText}>{item}</Text>
              </View>
            ))}
          </Section>
        ) : null}

        {place.highlights?.length > 0 ? (
          <Section title="What you’ll experience">
            {place.highlights.map((item, index) => (
              <Text key={index} style={styles.bullet}>
                • {item}
              </Text>
            ))}
          </Section>
        ) : null}

        {place.activities?.length > 0 ? (
          <Section title="Things to do">
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
          <Section title="Best for">
            <View style={styles.chipWrap}>
              {place.idealFor.map((item, index) => (
                <View key={index} style={styles.softChip}>
                  <Text style={styles.softChipText}>{item}</Text>
                </View>
              ))}
            </View>
          </Section>
        ) : null}
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