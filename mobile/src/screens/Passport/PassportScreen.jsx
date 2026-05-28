import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";
import { getPassport } from "../../services/passportService";

export default function PassportScreen({ navigation }) {
  const [passport, setPassport] = useState(null);
  const [activeTab, setActiveTab] = useState("visited");
  const [loading, setLoading] = useState(true);

  const loadPassport = async () => {
    try {
      setLoading(true);

      const data = await getPassport();
      setPassport(data);
    } catch (error) {
      console.log(
        "Failed to load passport:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPassport();
  }, []);

  const visitedPlaces = passport?.visitedPlaces || [];
  const wantToVisitPlaces = passport?.wantToVisitPlaces || [];

  const places =
    activeTab === "visited"
      ? visitedPlaces
      : wantToVisitPlaces;

  const renderPlace = ({ item }) => (
    <TouchableOpacity
      style={styles.placeCard}
      onPress={() =>
        navigation.navigate("PlaceDetails", {
          slug: item.slug,
        })
      }
    >
      <Text style={styles.placeType}>
        {item.category || item.type}
      </Text>

      <Text style={styles.placeName}>
        {item.name}
      </Text>

      <Text style={styles.placeLocation}>
        {item.city || item.area || item.region}
      </Text>

      <Text
        style={styles.placeDescription}
        numberOfLines={2}
      >
        {item.shortDescription}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top"]}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="arrow-back"
          size={22}
          color="#556B2F"
        />
        <Text style={styles.backText}>
          Back
        </Text>
      </TouchableOpacity>

      <Text style={styles.kicker}>
        Ethiopia Passport
      </Text>

      <Text style={styles.title}>
        Track your journey across Ethiopia
      </Text>

      <Text style={styles.subtitle}>
        Mark places you have visited and
        build your personal travel story.
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {visitedPlaces.length}
          </Text>

          <Text style={styles.statLabel}>
            Visited
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {wantToVisitPlaces.length}
          </Text>

          <Text style={styles.statLabel}>
            Want to Visit
          </Text>
        </View>
      </View>

      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "visited" &&
              styles.tabButtonActive,
          ]}
          onPress={() =>
            setActiveTab("visited")
          }
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "visited" &&
                styles.tabTextActive,
            ]}
          >
            Visited
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab ===
              "wantToVisit" &&
              styles.tabButtonActive,
          ]}
          onPress={() =>
            setActiveTab("wantToVisit")
          }
        >
          <Text
            style={[
              styles.tabText,
              activeTab ===
                "wantToVisit" &&
                styles.tabTextActive,
            ]}
          >
            Want to Visit
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={places}
        keyExtractor={(item) => item._id}
        renderItem={renderPlace}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.listContent
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {activeTab === "visited"
              ? "No visited places yet."
              : "No places added yet."}
          </Text>
        }
      />
    </SafeAreaView>
  );
}