import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import styles from "./AdminPlacesScreen.styles";
import { colors } from "../../styles/theme";
import { getAllPlaces, deletePlaceById } from "../../services/placeService";

export default function AdminPlacesScreen({ navigation }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPlaces = async () => {
    try {
      setLoading(true);
      const data = await getAllPlaces();
      setPlaces(data);
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadPlaces);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = (place) => {
    Alert.alert(
      "Unpublish Place",
      `Are you sure you want to unpublish ${place.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Unpublish",
          style: "destructive",
          onPress: async () => {
            try {
              await deletePlaceById(place._id);
              loadPlaces();
            } catch (error) {
              Alert.alert(
                "Failed",
                error.response?.data?.message || error.message
              );
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <FlatList
          data={places}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.content}
          ListHeaderComponent={
            <>
              <View style={styles.topBar}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="arrow-back"
                    size={22}
                    color={colors.primary}
                  />
                </TouchableOpacity>

                <View style={styles.titleBlock}>
                  <Text style={styles.title}>Manage Places</Text>
                  <Text style={styles.subtitle}>
                    Create, edit, and unpublish destinations in your travel app.
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate("PlaceForm")}
                activeOpacity={0.85}
              >
                <Ionicons name="add-circle-outline" size={21} color="#fff" />
                <Text style={styles.addButtonText}>Add New Place</Text>
              </TouchableOpacity>
            </>
          }
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Ionicons
                name="location-outline"
                size={34}
                color={colors.primary}
              />
              <Text style={styles.emptyTitle}>No places yet</Text>
              <Text style={styles.emptyText}>
                Add your first destination to start managing app content.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.placeName}>{item.name}</Text>

                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>
                    {item.status || "published"}
                  </Text>
                </View>
              </View>

              <Text style={styles.metaText}>
                {[item.city, item.area, item.region].filter(Boolean).join(", ")}
              </Text>

              <View style={styles.chipRow}>
                {item.type ? (
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>{item.type}</Text>
                  </View>
                ) : null}

                {item.category ? (
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>{item.category}</Text>
                  </View>
                ) : null}

                {item.featured ? (
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>Featured</Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate("PlaceForm", { place: item })}
                  activeOpacity={0.85}
                >
                  <Ionicons name="create-outline" size={18} color="#fff" />
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item)}
                  activeOpacity={0.85}
                >
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color={colors.error}
                  />
                  <Text style={styles.deleteButtonText}>Unpublish</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}