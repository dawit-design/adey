import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./styles";
import { getAllPlaces } from "../../services/placeService";
import { SafeAreaView } from "react-native-safe-area-context";
const filters = [
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

export default function DiscoverScreen({ navigation }) {
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
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesType = activeType === "all" || place.type === activeType;

      const text = `${place.name} ${place.region} ${place.city || ""} ${
        place.area || ""
      } ${place.shortDescription || ""}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [places, activeType, search]);

  const renderPlace = ({ item }) => (
    <TouchableOpacity
      style={styles.placeCard}
      onPress={() => navigation.navigate("PlaceDetails", { slug: item.slug })}
    >
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

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>Discover Ethiopia</Text>
      <Text style={styles.subtitle}>
        Search destinations, resorts, lodges, and experiences.
      </Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search places..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filterRow}>
        {filters.map((filter) => (
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
      </View>

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
    </SafeAreaView>
  );
}
