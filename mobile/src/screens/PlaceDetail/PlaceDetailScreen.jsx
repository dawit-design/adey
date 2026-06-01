import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  Linking,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";
import { colors } from "../../styles/theme";

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

import {
  getMyTrips,
  createTrip,
  addPlaceToTrip,
} from "../../services/tripService";

export default function PlaceDetailScreen({ route, navigation }) {
  const { slug } = route.params || {};

  const [place, setPlace] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isVisited, setIsVisited] = useState(false);
  const [isWantToVisit, setIsWantToVisit] = useState(false);
  const [loading, setLoading] = useState(true);

  const [trips, setTrips] = useState([]);
  const [isAddedToTrip, setIsAddedToTrip] = useState(false);
  const [tripModalVisible, setTripModalVisible] = useState(false);
  const [newTripTitle, setNewTripTitle] = useState("");
  const [tripLoading, setTripLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    loadPlace();
  }, [slug]);

  const checkIfPlaceIsInTrips = (tripList, placeId) => {
    return tripList.some((trip) =>
      trip.places?.some((item) => {
        const tripPlaceId = item.place?._id || item.place;
        return tripPlaceId === placeId;
      })
    );
  };

  const isPlaceInTrip = (trip) => {
    if (!place) return false;

    return trip.places?.some((item) => {
      const tripPlaceId = item.place?._id || item.place;
      return tripPlaceId === place._id;
    });
  };

  const loadTripsForPlace = async (placeId) => {
    try {
      const data = await getMyTrips();
      setTrips(data);
      setIsAddedToTrip(checkIfPlaceIsInTrips(data, placeId));
    } catch {
      setTrips([]);
      setIsAddedToTrip(false);
    }
  };

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

      await loadTripsForPlace(placeData._id);
    } catch (error) {
      console.log(
        "Failed to load place:",
        error.response?.data || error.message
      );
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
      console.log(
        "Failed to save/unsave:",
        error.response?.data || error.message
      );
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
      console.log(
        "Failed to update want to visit:",
        error.response?.data || error.message
      );
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
      console.log(
        "Failed to update visited:",
        error.response?.data || error.message
      );
    }
  };

  const openTripModal = async () => {
    try {
      setTripLoading(true);
      const data = await getMyTrips();
      setTrips(data);
      setIsAddedToTrip(checkIfPlaceIsInTrips(data, place?._id));
      setTripModalVisible(true);
    } catch (error) {
      console.log("Failed to load trips:", error.response?.data || error.message);
    } finally {
      setTripLoading(false);
    }
  };

  const handleAddToTrip = async (tripId) => {
    try {
      if (!place) return;

      const selectedTrip = trips.find((trip) => trip._id === tripId);

      if (selectedTrip && isPlaceInTrip(selectedTrip)) {
        return;
      }

      const updatedTrip = await addPlaceToTrip(tripId, place._id);

      const updatedTrips = trips.map((trip) =>
        trip._id === updatedTrip._id ? updatedTrip : trip
      );

      setTrips(updatedTrips);
      setIsAddedToTrip(true);
    } catch (error) {
      console.log("Failed to add to trip:", error.response?.data || error.message);
    }
  };

  const handleCreateTripAndAddPlace = async () => {
    try {
      if (!newTripTitle.trim() || !place) return;

      const trip = await createTrip({
        title: newTripTitle.trim(),
        coverImage: place.coverImage || "",
      });

      const updatedTrip = await addPlaceToTrip(trip._id, place._id);

      setTrips((prev) => [updatedTrip, ...prev]);
      setIsAddedToTrip(true);
      setNewTripTitle("");
    } catch (error) {
      console.log("Failed to create trip:", error.response?.data || error.message);
    }
  };

  const getMapQuery = () => {
    if (!place) return "";

    return encodeURIComponent(
      [place.name, place.city, place.area, place.region, "Ethiopia"]
        .filter(Boolean)
        .join(" ")
    );
  };

  const openGoogleMapSearch = () => {
    const mapQuery = getMapQuery();
    const url = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
    Linking.openURL(url);
  };

  const openDirectionsFromAddis = () => {
    const mapQuery = getMapQuery();
    const url = `https://www.google.com/maps/dir/?api=1&origin=Addis+Ababa,Ethiopia&destination=${mapQuery}`;
    Linking.openURL(url);
  };

  const shouldShowHiddenGem =
    place?.tourismPriority === "hidden-gem" ||
    (place?.hiddenGemScore && place.hiddenGemScore >= 8);

  const galleryImages = [
    ...(place?.coverImage ? [place.coverImage] : []),
    ...(place?.images || []),
  ].filter(Boolean);

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
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          {place.coverImage ? (
            <Image
              source={{ uri: place.coverImage }}
              style={styles.heroImage}
              resizeMode="stretch"
            />
          ) : null}

          <View style={styles.heroDarkOverlay} />

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

          {galleryImages.length > 0 ? (
            <View style={styles.gallerySection}>
              <View style={styles.galleryHeader}>
                <Text style={styles.galleryTitle}>Photos</Text>
                <Text style={styles.galleryCount}>
                  {galleryImages.length} image
                  {galleryImages.length > 1 ? "s" : ""}
                </Text>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.galleryRow}>
                  {galleryImages.map((imageUrl, index) => (
                    <TouchableOpacity
                      key={`${imageUrl}-${index}`}
                      activeOpacity={0.9}
                      onPress={() => setSelectedImage(imageUrl)}
                    >
                      <Image
                        source={{ uri: imageUrl }}
                        style={[
                          styles.galleryImage,
                          index === 0 && styles.galleryImageLarge,
                        ]}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          ) : null}

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
                name={
                  isVisited ? "checkmark-circle" : "checkmark-circle-outline"
                }
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

          <TouchableOpacity
            style={[
              styles.addTripButton,
              isAddedToTrip && styles.addTripButtonActive,
            ]}
            onPress={openTripModal}
          >
            <Ionicons
              name={isAddedToTrip ? "checkmark-circle" : "map-outline"}
              size={20}
              color={isAddedToTrip ? colors.primary : "#fff"}
            />
            <Text
              style={[
                styles.addTripButtonText,
                isAddedToTrip && styles.addTripButtonTextActive,
              ]}
            >
              {isAddedToTrip ? "Added to Trip" : "Add to Trip"}
            </Text>
          </TouchableOpacity>

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

          <View style={styles.mapActionCard}>
            <View style={styles.mapActionHeader}>
              <Ionicons name="navigate-outline" size={22} color="#556B2F" />

              <View style={{ flex: 1 }}>
                <Text style={styles.mapActionTitle}>How to get there</Text>
                <Text style={styles.mapActionSubtitle}>
                  View this place on Google Maps or get directions from Addis
                  Ababa.
                </Text>
              </View>
            </View>

            <View style={styles.mapButtonRow}>
              <TouchableOpacity
                style={styles.mapSecondaryButton}
                onPress={openGoogleMapSearch}
              >
                <Ionicons name="location-outline" size={18} color="#556B2F" />
                <Text style={styles.mapSecondaryButtonText}>View on Map</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.mapPrimaryButton}
                onPress={openDirectionsFromAddis}
              >
                <Ionicons name="navigate" size={18} color="#fff" />
                <Text style={styles.mapPrimaryButtonText}>Directions</Text>
              </TouchableOpacity>
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
                  <Ionicons
                    name="alert-circle-outline"
                    size={17}
                    color="#9A6B00"
                  />
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

      <Modal
        visible={!!selectedImage}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <TouchableOpacity
          style={styles.imageModalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedImage(null)}
        >
          <Image
            source={{ uri: selectedImage }}
            style={styles.fullscreenImage}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.closeImageButton}
            onPress={() => setSelectedImage(null)}
          >
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={tripModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setTripModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.tripModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add to Trip</Text>

              <TouchableOpacity onPress={() => setTripModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>

            {tripLoading ? (
              <ActivityIndicator />
            ) : (
              <>
                {trips.length > 0 ? (
                  trips.map((trip) => {
                    const alreadyInThisTrip = isPlaceInTrip(trip);

                    return (
                      <TouchableOpacity
                        key={trip._id}
                        style={[
                          styles.tripOption,
                          alreadyInThisTrip && styles.tripOptionActive,
                        ]}
                        onPress={() => handleAddToTrip(trip._id)}
                        disabled={alreadyInThisTrip}
                      >
                        <View>
                          <Text style={styles.tripOptionTitle}>
                            {trip.title}
                          </Text>
                          <Text style={styles.tripOptionMeta}>
                            {alreadyInThisTrip
                              ? "Already added"
                              : `${trip.places?.length || 0} places`}
                          </Text>
                        </View>

                        <Ionicons
                          name={
                            alreadyInThisTrip
                              ? "checkmark-circle"
                              : "chevron-forward"
                          }
                          size={22}
                          color={
                            alreadyInThisTrip ? colors.primary : colors.darkGray
                          }
                        />
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <Text style={styles.emptyTripText}>
                    You do not have trips yet. Create one below.
                  </Text>
                )}

                <View style={styles.createTripBox}>
                  <Text style={styles.createTripLabel}>Create new trip</Text>

                  <TextInput
                    style={styles.tripInput}
                    placeholder="Example: Weekend Addis"
                    value={newTripTitle}
                    onChangeText={setNewTripTitle}
                  />

                  <TouchableOpacity
                    style={styles.createTripButton}
                    onPress={handleCreateTripAndAddPlace}
                  >
                    <Text style={styles.createTripButtonText}>
                      Create and Add Place
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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