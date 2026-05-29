import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";
import { colors } from "../../styles/theme";
import { getAllPlaces } from "../../services/placeService";

const typeFilters = [
  "all",
  "destination",
  "resort",
  "lodge",
  "hotel",
  "experience",
  "park",
  "museum",
  "restaurant",
  "cafe",
  "cultural-site",
];

export default function DiscoverScreen({ navigation, route }) {
  const experienceTitle = route?.params?.experienceTitle;
  const experienceFilters = route?.params?.filters;

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPlaces();
  }, []);

  const loadPlaces = async () => {
    try {
      setLoading(true);
      const data = await getAllPlaces();
      setPlaces(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(
        "Failed to load places:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const matchesExperienceFilters = (place) => {
    if (!experienceFilters) return true;

    const placeTags = place.tags || [];
    const checks = [];

    if (experienceFilters.categories) {
      checks.push(experienceFilters.categories.includes(place.category));
    }

    if (experienceFilters.types) {
      checks.push(experienceFilters.types.includes(place.type));
    }

    if (experienceFilters.tags) {
      checks.push(
        experienceFilters.tags.some((tag) => placeTags.includes(tag))
      );
    }

    if (experienceFilters.priceRanges) {
      checks.push(experienceFilters.priceRanges.includes(place.priceRange));
    }

    if (experienceFilters.tourismPriority) {
      checks.push(place.tourismPriority === experienceFilters.tourismPriority);
    }

    return checks.some(Boolean);
  };

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesExperience = matchesExperienceFilters(place);
      const matchesType = activeType === "all" || place.type === activeType;

      const text = `${place.name || ""} ${place.region || ""} ${
        place.city || ""
      } ${place.area || ""} ${place.category || ""} ${
        place.type || ""
      } ${place.shortDescription || ""} ${(place.tags || []).join(
        " "
      )}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      return matchesExperience && matchesType && matchesSearch;
    });
  }, [places, activeType, search, experienceFilters]);

  const clearExperienceFilter = () => {
    navigation.setParams({
      experienceTitle: undefined,
      filters: undefined,
    });

    setActiveType("all");
    setSearch("");
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  };

  const renderPlace = ({ item }) => (
    <TouchableOpacity
      style={styles.placeCard}
      activeOpacity={0.88}
      onPress={() => navigation.navigate("PlaceDetails", { slug: item.slug })}
    >
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

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.hero}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.heroContent}>
          <Text style={styles.eyebrow}>ADEY DISCOVER</Text>
          <Text style={styles.title}>{experienceTitle || "Discover Ethiopia"}</Text>
          <Text style={styles.subtitle}>
            {experienceTitle
              ? `${filteredPlaces.length} curated places for this experience.`
              : "Search destinations, resorts, lodges, and experiences."}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        {experienceTitle && (
          <TouchableOpacity
            style={styles.activeExperienceBox}
            onPress={clearExperienceFilter}
          >
            <Text style={styles.activeExperienceText}>
              Viewing: {experienceTitle}
            </Text>
            <Text style={styles.clearExperienceText}>Clear</Text>
          </TouchableOpacity>
        )}

        <TextInput
          style={styles.searchInput}
          placeholder="Search places..."
          value={search}
          onChangeText={setSearch}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {typeFilters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                activeType === filter && styles.filterChipActive,
              ]}
              onPress={() => setActiveType(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeType === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 30 }} />
        ) : (
          <FlatList
            data={filteredPlaces}
            keyExtractor={(item) => item._id}
            renderItem={renderPlace}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No places found.</Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}