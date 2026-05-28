import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";

import { getSavedPlaces } from "../../services/savedService";

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
      console.log("Error fetching saved places:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchSavedPlaces();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("PlaceDetails", {
          slug: item.slug,
        })
      }
    >
      <Image
        source={{ uri: item.coverImage }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.placeName}>{item.name}</Text>

        <Text style={styles.location}>
          {item.city ? `${item.city}, ` : ""}
          {item.region}
        </Text>

        <Text
          style={styles.description}
          numberOfLines={2}
        >
          {item.shortDescription}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>Saved Places</Text>

      {savedPlaces.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No saved places yet.
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
    </SafeAreaView>
  );
}