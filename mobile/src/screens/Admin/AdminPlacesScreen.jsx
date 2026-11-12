import React, { useEffect, useMemo, useState } from "react";

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

import {
  getAllPlaces,
  deletePlaceById,
  backfillPlaceCoordinates,
  retryMissingPlaceCoordinates,
} from "../../services/placeService";

const hasValidCoordinates = (place) => {
  const coordinates = place?.location?.coordinates;

  if (!Array.isArray(coordinates) || coordinates.length !== 2) {
    return false;
  }

  const longitude = Number(coordinates[0]);

  const latitude = Number(coordinates[1]);

  return (
    Number.isFinite(longitude) &&
    Number.isFinite(latitude) &&
    !(longitude === 0 && latitude === 0)
  );
};

export default function AdminPlacesScreen({ navigation }) {
  const [places, setPlaces] = useState([]);

  const [loading, setLoading] = useState(true);

  const [backfillingCoordinates, setBackfillingCoordinates] = useState(false);
  const [retryingCoordinates, setRetryingCoordinates] = useState(false);
  const loadPlaces = async (showLoader = true) => {
    try {
      if (showLoader) {
        setLoading(true);
      }

      const data = await getAllPlaces();

      setPlaces(Array.isArray(data) ? data : []);
    } catch (error) {
      Alert.alert(
        "Unable to load places",
        error.response?.data?.message || error.message,
      );
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadPlaces();
    });

    return unsubscribe;
  }, [navigation]);

    const coordinateStats =
    useMemo(() => {
      let mapped = 0;
      let pending = 0;
      let needsReview = 0;

      places.forEach((place) => {
        if (
          hasValidCoordinates(place)
        ) {
          mapped += 1;
          return;
        }

        if (
          place.geocoding?.status ===
          "needs-review"
        ) {
          needsReview += 1;
          return;
        }

        pending += 1;
      });

      return {
        mapped,
        pending,
        needsReview,
        missing:
          pending + needsReview,
      };
    }, [places]);

   const runCoordinateBackfill =
    async () => {
      if (
        backfillingCoordinates ||
        retryingCoordinates
      ) {
        return;
      }

      try {
        setBackfillingCoordinates(
          true
        );

        const result =
          await backfillPlaceCoordinates(
            5
          );

        await loadPlaces(false);

        const updated =
          result?.updated || 0;

        const notFound =
          result?.notFound || 0;

        const failed =
          result?.failed || 0;

        const pending =
          result?.pending ?? 0;

        const needsReview =
          result?.needsReview ?? 0;

        const messages = [
          `${updated} ${
            updated === 1
              ? "destination was"
              : "destinations were"
          } added to the map.`,

          notFound > 0
            ? `${notFound} ${
                notFound === 1
                  ? "destination could"
                  : "destinations could"
              } not be located automatically.`
            : null,

          failed > 0
            ? `${failed} ${
                failed === 1
                  ? "request failed"
                  : "requests failed"
              }.`
            : null,

          pending > 0
            ? `${pending} ${
                pending === 1
                  ? "destination is"
                  : "destinations are"
              } waiting to be searched.`
            : null,

          needsReview > 0
            ? `${needsReview} ${
                needsReview === 1
                  ? "destination needs"
                  : "destinations need"
              } another search or manual review.`
            : null,

          pending === 0 &&
          needsReview === 0
            ? "All destinations now have coordinates."
            : null,
        ];

        Alert.alert(
          "Coordinate update completed",
          messages
            .filter(Boolean)
            .join("\n\n")
        );
      } catch (error) {
        Alert.alert(
          "Coordinate update failed",
          error.response?.data?.message ||
            error.message
        );
      } finally {
        setBackfillingCoordinates(
          false
        );
      }
    };

  const confirmCoordinateBackfill = () => {
    Alert.alert(
      "Add map coordinates",
      "ADEY will automatically locate up to five existing destinations. Travelers will not be asked to enter coordinates.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Start",
          onPress: runCoordinateBackfill,
        },
      ],
    );
  };
  const runMissingCoordinateRetry =
    async () => {
      if (
        retryingCoordinates ||
        backfillingCoordinates
      ) {
        return;
      }

      try {
        setRetryingCoordinates(true);

        const result =
          await retryMissingPlaceCoordinates();

        await loadPlaces(false);

        const reset =
          result?.reset || 0;

        Alert.alert(
          "Missing maps ready",
          reset > 0
            ? `${reset} ${
                reset === 1
                  ? "destination is"
                  : "destinations are"
              } ready to be searched again. Now press Add Map Coordinates.`
            : "There were no destinations requiring a retry."
        );
      } catch (error) {
        Alert.alert(
          "Retry failed",
          error.response?.data?.message ||
            error.message
        );
      } finally {
        setRetryingCoordinates(false);
      }
    };

  const confirmMissingCoordinateRetry =
    () => {
      Alert.alert(
        "Retry missing maps",
        `Search again for ${coordinateStats.needsReview} ${
          coordinateStats.needsReview === 1
            ? "destination"
            : "destinations"
        } that could not be located previously? Existing mapped destinations will not be changed.`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Reset for retry",
            onPress:
              runMissingCoordinateRetry,
          },
        ]
      );
    };
  const handleDelete = (place) => {
    Alert.alert(
      "Unpublish Place",
      `Are you sure you want to unpublish ${place.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Unpublish",
          style: "destructive",

          onPress: async () => {
            try {
              await deletePlaceById(place._id);

              await loadPlaces(false);
            } catch (error) {
              Alert.alert(
                "Failed",
                error.response?.data?.message || error.message,
              );
            }
          },
        },
      ],
    );
  };

  const renderPlace = ({ item }) => {
    const mapped = hasValidCoordinates(item);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.placeName}>{item.name}</Text>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{item.status || "published"}</Text>
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

          <View
            style={[
              styles.coordinateChip,

              mapped
                ? styles.coordinateChipReady
                : styles.coordinateChipMissing,
            ]}
          >
            <Ionicons
              name={mapped ? "location" : "location-outline"}
              size={12}
              color={mapped ? "#37533C" : "#A9643B"}
            />

            <Text
              style={[
                styles.coordinateChipText,

                mapped
                  ? styles.coordinateChipTextReady
                  : styles.coordinateChipTextMissing,
              ]}
            >
              {mapped ? "Mapped" : "Map missing"}
            </Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("PlaceForm", {
                place: item,
              })
            }
            activeOpacity={0.85}
          >
            <Ionicons name="create-outline" size={18} color="#FFFFFF" />

            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item)}
            activeOpacity={0.85}
          >
            <Ionicons name="trash-outline" size={18} color={colors.error} />

            <Text style={styles.deleteButtonText}>Unpublish</Text>
          </TouchableOpacity>
        </View>
      </View>
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
          showsVerticalScrollIndicator={false}
          renderItem={renderPlace}
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
                <Ionicons name="add-circle-outline" size={21} color="#FFFFFF" />

                <Text style={styles.addButtonText}>Add New Place</Text>
              </TouchableOpacity>

              <View style={styles.mapToolCard}>
                <View style={styles.mapToolHeader}>
                  <View style={styles.mapToolIcon}>
                    <Ionicons name="map-outline" size={23} color="#37533C" />
                  </View>

                  <View style={styles.mapToolHeading}>
                    <Text style={styles.mapToolTitle}>Passport Map</Text>

                    <Text style={styles.mapToolSubtitle}>
                      Automatically add map coordinates to ADEY destinations.
                    </Text>
                  </View>
                </View>

                <View style={styles.coordinateStats}>
                  <View style={styles.coordinateStat}>
                    <Text style={styles.coordinateNumber}>
                      {coordinateStats.mapped}
                    </Text>

                    <Text style={styles.coordinateLabel}>Mapped</Text>
                  </View>

                  <View style={styles.statDivider} />

                  <View style={styles.coordinateStat}>
                    <Text
                      style={[
                        styles.coordinateNumber,

                        coordinateStats.missing > 0 && styles.missingNumber,
                      ]}
                    >
                      {coordinateStats.missing}
                    </Text>

                    <Text style={styles.coordinateLabel}>Missing</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.coordinateButton,

                    backfillingCoordinates && styles.coordinateButtonDisabled,
                  ]}
                  onPress={confirmCoordinateBackfill}
                  disabled={backfillingCoordinates}
                  activeOpacity={0.85}
                >
                  {backfillingCoordinates ? (
                    <>
                      <ActivityIndicator size="small" color="#FFFFFF" />

                      <Text style={styles.coordinateButtonText}>
                        Finding locations...
                      </Text>
                    </>
                  ) : (
                    <>
                      <Ionicons
                        name="location-outline"
                        size={19}
                        color="#FFFFFF"
                      />

                      <Text style={styles.coordinateButtonText}>
                        Add Map Coordinates
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
                                {coordinateStats.needsReview >
                0 ? (
                  <TouchableOpacity
                    style={[
                      styles.coordinateButton,
                      {
                        marginTop: 12,
                        backgroundColor:
                          "#A9643B",
                      },
                      (retryingCoordinates ||
                        backfillingCoordinates) &&
                        styles.coordinateButtonDisabled,
                    ]}
                    onPress={
                      confirmMissingCoordinateRetry
                    }
                    disabled={
                      retryingCoordinates ||
                      backfillingCoordinates
                    }
                    activeOpacity={0.85}
                  >
                    {retryingCoordinates ? (
                      <>
                        <ActivityIndicator
                          size="small"
                          color="#FFFFFF"
                        />

                        <Text
                          style={
                            styles.coordinateButtonText
                          }
                        >
                          Preparing retry...
                        </Text>
                      </>
                    ) : (
                      <>
                        <Ionicons
                          name="refresh-outline"
                          size={19}
                          color="#FFFFFF"
                        />

                        <Text
                          style={
                            styles.coordinateButtonText
                          }
                        >
                          Retry Missing Maps (
                          {
                            coordinateStats.needsReview
                          }
                          )
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                ) : null}
              </View>
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
        />
      </View>
    </SafeAreaView>
  );
}
