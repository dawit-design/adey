import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import globalStyles from "../../styles/theme";
import styles from "./styles";
import { getAllPlaces } from "../../services/placeService";

export default function HomeScreen({ navigation }) {
  const [featuredPlaces, setFeaturedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFeaturedPlaces = async () => {
    try {
      setLoading(true);
      const data = await getAllPlaces({ featured: true });
      setFeaturedPlaces(data);
    } catch (error) {
      console.log("Failed to load featured places:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeaturedPlaces();
  }, []);

  const renderPlace = ({ item }) => (
    <TouchableOpacity
      style={styles.placeCard}
      onPress={() =>
        navigation.navigate("PlaceDetails", {
          slug: item.slug,
        })
      }
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
    <View style={styles.container}>
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
    </View>
  );
}