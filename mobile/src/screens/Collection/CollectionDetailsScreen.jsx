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
import styles from "./styles";
import { getCollectionBySlug } from "../../services/collectionService";

export default function CollectionDetailsScreen({ navigation, route }) {
  const { slug } = route.params;

  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCollection = async () => {
    try {
      setLoading(true);
      const data = await getCollectionBySlug(slug);
      setCollection(data);
    } catch (error) {
      console.log(
        "Failed to load collection:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCollection();
  }, [slug]);

  const renderPlace = ({ item, index }) => (
    <TouchableOpacity
      style={styles.placeCard}
      onPress={() =>
        navigation.navigate("PlaceDetails", {
          slug: item.slug,
        })
      }
    >
      <Text style={styles.placeNumber}>{index + 1}</Text>

      <View style={styles.placeContent}>
        <Text style={styles.placeType}>{item.category || item.type}</Text>
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.placeLocation}>
          {item.city || item.area || item.region}
        </Text>
        <Text style={styles.placeDescription} numberOfLines={2}>
          {item.shortDescription}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      </SafeAreaView>
    );
  }

  if (!collection) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <Text style={styles.title}>Collection not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={22} color="#556B2F" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <FlatList
        data={(collection.places || []).filter(Boolean)}
        keyExtractor={(item) => item._id}
        renderItem={renderPlace}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <Text style={styles.label}>Curated Journey</Text>
            <Text style={styles.title}>{collection.title}</Text>
            <Text style={styles.subtitle}>{collection.subtitle}</Text>

            <View style={styles.metaBox}>
              <Text style={styles.metaText}>
                {collection.estimatedDuration || "Flexible duration"}
              </Text>
              <Text style={styles.metaText}>
                {(collection.places || []).length} places
              </Text>
              <Text style={styles.metaText}>
                {collection.difficultyLevel || "easy"}
              </Text>
            </View>

            <Text style={styles.description}>{collection.description}</Text>

            <Text style={styles.sectionTitle}>Places in this journey</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
