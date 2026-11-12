import React, { useMemo, useState } from "react";

import { View, Text, TouchableOpacity, Image } from "react-native";

import { Map, Camera, Marker } from "@maplibre/maplibre-react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

const ETHIOPIA_CENTER = [40.4897, 9.145];

const hasValidCoordinates = (entry) => {
  const coordinates = entry?.place?.location?.coordinates;

  if (!Array.isArray(coordinates) || coordinates.length !== 2) {
    return false;
  }

  const longitude = Number(coordinates[0]);
  const latitude = Number(coordinates[1]);

  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return false;
  }

  if (longitude === 0 && latitude === 0) {
    return false;
  }

  // ADEY currently focuses on Ethiopia.
  return (
    longitude >= 32 && longitude <= 48 && latitude >= 2.5 && latitude <= 15.5
  );
};

const getCoordinates = (entry) => {
  const coordinates = entry?.place?.location?.coordinates;

  return [Number(coordinates[0]), Number(coordinates[1])];
};

export default function PassportMap({ entries = [], onOpenEntry }) {
  const [selectedEntry, setSelectedEntry] = useState(null);

  const mapEntries = useMemo(() => {
    return entries.filter(hasValidCoordinates);
  }, [entries]);

  const visitedCount = useMemo(() => {
    return mapEntries.filter((entry) => entry.status === "visited").length;
  }, [mapEntries]);

  const wishlistCount = useMemo(() => {
    return mapEntries.filter((entry) => entry.status === "wantToVisit").length;
  }, [mapEntries]);

  const hiddenCount = entries.length - mapEntries.length;

  const formatDate = (date) => {
    if (!date) return null;

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return null;
    }

    return parsedDate.toLocaleDateString(undefined, {
      month: "short",
      year: "numeric",
    });
  };

  const handleMapPress = () => {
    setSelectedEntry(null);
  };

  const handleMarkerPress = (entry) => {
    setSelectedEntry(entry);
  };

  const handleOpenEntry = () => {
    if (!selectedEntry) return;

    onOpenEntry?.(selectedEntry);
  };

  return (
    <View style={styles.section}>
      <View style={styles.headingRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>My travel map</Text>

          <Text style={styles.subtitle}>Tap a pin to revisit the journey</Text>
        </View>

        <View style={styles.mapCount}>
          <Ionicons name="location" size={14} color="#37533C" />

          <Text style={styles.mapCountText}>{mapEntries.length}</Text>
        </View>
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendPin, styles.visitedLegend]} />

          <Text style={styles.legendText}>Visited ({visitedCount})</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendPin, styles.wishlistLegend]} />

          <Text style={styles.legendText}>Want to visit ({wishlistCount})</Text>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <Map
          style={styles.map}
          mapStyle={MAP_STYLE}
          compass
          attribution
          logo={false}
          onPress={handleMapPress}
        >
          <Camera center={ETHIOPIA_CENTER} zoom={4.6} duration={0} />

          {mapEntries.map((entry, index) => {
            const coordinates = getCoordinates(entry);

            const isVisited = entry.status === "visited";

            const markerId =
              entry._id || entry.place?._id || `passport-marker-${index}`;

            return (
                            <Marker
                key={markerId}
                id={String(markerId)}
                lngLat={coordinates}
                anchor="center"
                onPress={(event) => {
                  event?.stopPropagation?.();
                  handleMarkerPress(entry);
                }}
              >
                <View
                  accessible
                  accessibilityRole="button"
                  accessibilityLabel={`${
                    isVisited ? "Visited" : "Want to visit"
                  }: ${entry.place?.name || "destination"}`}
                  style={[
                    styles.marker,
                    isVisited ? styles.visitedMarker : styles.wishlistMarker,
                  ]}
                >
                  <Ionicons
                    name={isVisited ? "checkmark" : "heart"}
                    size={15}
                    color={isVisited ? "#263F2D" : "#FFFFFF"}
                  />
                </View>
              </Marker>
            );
          })}
        </Map>

        {mapEntries.length === 0 && (
          <View style={styles.emptyOverlay} pointerEvents="none">
            <View style={styles.emptyIcon}>
              <Ionicons name="map-outline" size={30} color="#37533C" />
            </View>

            <Text style={styles.emptyTitle}>Your map is waiting</Text>

            <Text style={styles.emptyText}>
              Destinations will appear when they have valid map coordinates.
            </Text>
          </View>
        )}

        {selectedEntry && (
          <View style={styles.previewCard}>
            {selectedEntry.place?.coverImage ? (
              <Image
                source={{
                  uri: selectedEntry.place.coverImage,
                }}
                style={styles.previewImage}
              />
            ) : (
              <View style={styles.previewImagePlaceholder}>
                <Ionicons name="image-outline" size={23} color="#526257" />
              </View>
            )}

            <View style={styles.previewContent}>
              <Text style={styles.previewStatus}>
                {selectedEntry.status === "visited"
                  ? "Visited"
                  : "Want to visit"}

                {selectedEntry.status === "visited" &&
                selectedEntry.visitedAt &&
                formatDate(selectedEntry.visitedAt)
                  ? ` · ${formatDate(selectedEntry.visitedAt)}`
                  : ""}
              </Text>

              <Text style={styles.previewName} numberOfLines={1}>
                {selectedEntry.place?.name || "Destination"}
              </Text>

              <Text style={styles.previewLocation} numberOfLines={1}>
                {[
                  selectedEntry.place?.city || selectedEntry.place?.area,
                  selectedEntry.place?.region,
                ]
                  .filter(Boolean)
                  .join(", ") || "Ethiopia"}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.previewButton}
              activeOpacity={0.85}
              onPress={handleOpenEntry}
              accessibilityRole="button"
              accessibilityLabel={`Open ${
                selectedEntry.place?.name || "destination"
              }`}
            >
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {hiddenCount > 0 && (
        <Text style={styles.coordinateNote}>
          {hiddenCount}{" "}
          {hiddenCount === 1 ? "destination is" : "destinations are"} hidden
          because map coordinates have not been added yet.
        </Text>
      )}
    </View>
  );
}
