import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";
import { colors } from "../../styles/theme";
import {
  getMyTrips,
  createTrip,
  deleteTrip,
  removePlaceFromTrip,
} from "../../services/tripService";

export default function TripsScreen({ navigation, route }) {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [lastSelectedTripId, setLastSelectedTripId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTripTitle, setNewTripTitle] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadTrips);
    return unsubscribe;
  }, [navigation, selectedTrip, lastSelectedTripId]);

  const loadTrips = async () => {
    try {
      setLoading(true);
      const data = await getMyTrips();
      setTrips(data);

      const tripToRestoreId = selectedTrip?._id || lastSelectedTripId;

      if (tripToRestoreId) {
        const updatedSelected = data.find((trip) => trip._id === tripToRestoreId);
        setSelectedTrip(updatedSelected || null);
      }
    } catch (error) {
      console.log("Failed to load trips:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const goBackFromTripDetails = () => {
    setSelectedTrip(null);
    setLastSelectedTripId(null);
  };

  const goBackFromMainTrips = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleCreateTrip = async () => {
    try {
      if (!newTripTitle.trim()) return;

      setCreating(true);

      const trip = await createTrip({
        title: newTripTitle.trim(),
      });

      setTrips((prev) => [trip, ...prev]);
      setNewTripTitle("");
      setModalVisible(false);
    } catch (error) {
      console.log("Failed to create trip:", error.response?.data || error.message);
    } finally {
      setCreating(false);
    }
  };

  const confirmDeleteTrip = (tripId) => {
    Alert.alert("Delete trip", "Are you sure you want to delete this trip?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => handleDeleteTrip(tripId),
      },
    ]);
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      await deleteTrip(tripId);

      setTrips((prev) => prev.filter((trip) => trip._id !== tripId));

      if (selectedTrip?._id === tripId) {
        setSelectedTrip(null);
        setLastSelectedTripId(null);
      }
    } catch (error) {
      console.log("Failed to delete trip:", error.response?.data || error.message);
    }
  };

  const confirmRemovePlace = (placeId) => {
    Alert.alert("Remove place", "Remove this place from your trip?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => handleRemovePlace(placeId),
      },
    ]);
  };

  const handleRemovePlace = async (placeId) => {
    try {
      if (!selectedTrip) return;

      const updatedTrip = await removePlaceFromTrip(selectedTrip._id, placeId);

      setSelectedTrip(updatedTrip);
      setLastSelectedTripId(updatedTrip._id);

      setTrips((prev) =>
        prev.map((trip) => (trip._id === updatedTrip._id ? updatedTrip : trip))
      );
    } catch (error) {
      console.log("Failed to remove place:", error.response?.data || error.message);
    }
  };

  const openTripDetails = (trip) => {
    setSelectedTrip(trip);
    setLastSelectedTripId(trip._id);
  };

  const openPlaceDetail = (place) => {
    if (!place?.slug) return;

    navigation.navigate("PlaceDetails", {
      slug: place.slug,
      fromTrip: true,
      tripId: selectedTrip?._id,
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (selectedTrip) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.detailHero}>
            <TouchableOpacity style={styles.backButton} onPress={goBackFromTripDetails}>
              <Ionicons name="arrow-back" size={22} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => confirmDeleteTrip(selectedTrip._id)}
            >
              <Ionicons name="trash-outline" size={21} color="#fff" />
            </TouchableOpacity>

            <View style={styles.detailHeroContent}>
              <Text style={styles.detailEyebrow}>ADEY TRIP</Text>
              <Text style={styles.detailTitle}>{selectedTrip.title}</Text>

              <View style={styles.detailMetaRow}>
                <Ionicons name="location-outline" size={16} color="#fff" />
                <Text style={styles.detailMetaText}>
                  {selectedTrip.places?.length || 0} places
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.detailContent}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Trip overview</Text>
              <Text style={styles.summaryText}>
                {selectedTrip.description ||
                  "A simple collection of places you want to explore across Ethiopia."}
              </Text>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Places in this trip</Text>
              <Text style={styles.sectionCount}>
                {selectedTrip.places?.length || 0}
              </Text>
            </View>

            {selectedTrip.places?.length > 0 ? (
              selectedTrip.places.map((item) => {
                const place = item.place;

                if (!place) return null;

                return (
                  <TouchableOpacity
                    key={place._id}
                    style={styles.placeCard}
                    activeOpacity={0.85}
                    onPress={() => openPlaceDetail(place)}
                  >
                    <View style={styles.placeIcon}>
                      <Ionicons name="map-outline" size={22} color={colors.primary} />
                    </View>

                    <View style={styles.placeInfo}>
                      <Text style={styles.placeName}>{place.name}</Text>
                      <Text style={styles.placeLocation}>
                        {place.city || place.area || place.region || "Ethiopia"}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.removePlaceButton}
                      onPress={() => confirmRemovePlace(place._id)}
                    >
                      <Ionicons name="close" size={18} color="#A54B4B" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })
            ) : (
              <View style={styles.emptyPlacesCard}>
                <Ionicons name="map-outline" size={30} color={colors.primary} />
                <Text style={styles.emptyPlacesTitle}>No places yet</Text>
                <Text style={styles.emptyPlacesText}>
                  Open a destination page and tap Add to Trip.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.mainBackButton}
            onPress={goBackFromMainTrips}
          >
            <Ionicons name="arrow-back" size={20} color={colors.white} />
            <Text style={styles.mainBackText}>Back</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.eyebrow}>ADEY TRIPS</Text>
            <Text style={styles.title}>Your Ethiopia Journeys</Text>
            <Text style={styles.subtitle}>
              Collect places into simple trips you want to explore.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={26} color={colors.white} />
          </TouchableOpacity>
        </View>

        {trips.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Ionicons name="map-outline" size={32} color={colors.primary} />
            </View>

            <Text style={styles.emptyTitle}>Start Planning Your Journey</Text>
            <Text style={styles.emptyText}>
              Create collections of places you want to visit across Ethiopia.
            </Text>

            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.emptyButtonText}>Create Your First Trip</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.tripList}>
            {trips.map((trip) => (
              <TouchableOpacity
                key={trip._id}
                style={styles.tripCard}
                activeOpacity={0.85}
                onPress={() => openTripDetails(trip)}
              >
                <View style={styles.tripCardTop}>
                  <View style={styles.tripBadge}>
                    <Ionicons name="compass-outline" size={15} color={colors.primary} />
                    <Text style={styles.tripBadgeText}>
                      {trip.status || "planning"}
                    </Text>
                  </View>

                  <TouchableOpacity onPress={() => confirmDeleteTrip(trip._id)}>
                    <Ionicons name="trash-outline" size={20} color="#A54B4B" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.tripTitle}>{trip.title}</Text>

                <Text style={styles.tripDescription}>
                  {trip.description ||
                    "A simple collection of places for this journey."}
                </Text>

                <View style={styles.tripMetaRow}>
                  <View style={styles.tripMeta}>
                    <Ionicons name="location-outline" size={16} color={colors.primary} />
                    <Text style={styles.tripMetaText}>
                      {trip.places?.length || 0} places
                    </Text>
                  </View>

                  <Ionicons name="chevron-forward" size={20} color={colors.darkGray} />
                </View>

                {trip.places?.length > 0 ? (
                  <Text style={styles.tripPlacesPreview} numberOfLines={1}>
                    {trip.places
                      .map((item) => item.place?.name)
                      .filter(Boolean)
                      .slice(0, 3)
                      .join(" • ")}
                  </Text>
                ) : (
                  <Text style={styles.tripPlacesPreview}>
                    Add places from destination pages.
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.createModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Trip</Text>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Trip name</Text>

            <TextInput
              style={styles.input}
              placeholder="Example: Weekend Addis"
              value={newTripTitle}
              onChangeText={setNewTripTitle}
            />

            <TouchableOpacity
              style={[
                styles.createButton,
                (!newTripTitle.trim() || creating) && styles.createButtonDisabled,
              ]}
              onPress={handleCreateTrip}
              disabled={!newTripTitle.trim() || creating}
            >
              {creating ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.createButtonText}>Create Trip</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}