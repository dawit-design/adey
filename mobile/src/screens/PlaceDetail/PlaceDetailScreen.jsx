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

export default function PlaceDetailScreen({ route, navigation }) {
  const { slug } = route.params || {};

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlace();
  }, [slug]);

  const loadPlace = async () => {
    try {
      setLoading(true);
      const data = await getPlaceBySlug(slug);
      setPlace(data);
    } catch (error) {
      console.log("Failed to load place:", error.response?.data || error.message);
    } finally {
      setLoading(false);
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
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.heroOverlay}>
          <Text style={styles.type}>{place.type}</Text>
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
              <Text key={index} style={styles.bullet}>• {item}</Text>
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
          <Text style={styles.body}>{place.bestTimeToVisit || "Not specified"}</Text>
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