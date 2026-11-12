import React, {
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import {
  getPassportEntry,
} from "../../services/passportService";

import AdeyStamp from "../../components/AdeyStamp/AdeyStamp";
import styles from "./styles";

export default function JourneyMemoryScreen({
  route,
  navigation,
}) {
  const placeId = route.params?.placeId;

  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadEntry = useCallback(async () => {
    if (!placeId) {
      Alert.alert(
        "Unable to open memory",
        "The destination information is missing.",
        [
          {
            text: "Go back",
            onPress: () => navigation.goBack(),
          },
        ]
      );

      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data = await getPassportEntry(placeId);

      setEntry(data);
    } catch (error) {
      Alert.alert(
        "Unable to open memory",
        error.response?.data?.message ||
          error.message,
        [
          {
            text: "Go back",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } finally {
      setLoading(false);
    }
  }, [placeId, navigation]);

  useFocusEffect(
    useCallback(() => {
      loadEntry();
    }, [loadEntry])
  );

  const personalPhotos = useMemo(() => {
    if (!entry) return [];

    const photos = [];

    if (entry.coverPhoto?.url) {
      photos.push({
        id: "cover",
        url: entry.coverPhoto.url,
        caption: "",
      });
    }

    entry.photos?.forEach((photo) => {
      if (
        photo.url &&
        photo.url !== entry.coverPhoto?.url
      ) {
        photos.push({
          id: photo._id,
          url: photo.url,
          caption: photo.caption || "",
        });
      }
    });

    return photos;
  }, [entry]);

  const formatDate = (date) => {
    if (!date) {
      return "Visit date not recorded";
    }

    return new Date(date).toLocaleDateString(
      undefined,
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  const openDestination = () => {
    if (!entry?.place?.slug) {
      Alert.alert(
        "Destination unavailable",
        "The ADEY destination page could not be found."
      );

      return;
    }

    navigation.navigate("PlaceDetails", {
      slug: entry.place.slug,
    });
  };

  if (loading) {
    return (
      <SafeAreaView
        style={styles.center}
        edges={["top"]}
      >
        <ActivityIndicator
          size="large"
          color="#37533C"
        />

        <Text style={styles.loadingText}>
          Opening your memory...
        </Text>
      </SafeAreaView>
    );
  }

  if (!entry) {
    return (
      <SafeAreaView
        style={styles.center}
        edges={["top"]}
      >
        <Ionicons
          name="alert-circle-outline"
          size={42}
          color="#526257"
        />

        <Text style={styles.noPhotoTitle}>
          Memory unavailable
        </Text>

        <TouchableOpacity
          style={styles.destinationButton}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={styles.destinationButtonText}
          >
            Go back
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const place = entry.place;
  const heroPhoto = personalPhotos[0];

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.topButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color="#263F2D"
            />
          </TouchableOpacity>

          <Text style={styles.screenTitle}>
            Journey Memory
          </Text>

          <TouchableOpacity
            style={styles.topButton}
            onPress={() =>
              Alert.alert(
                "Coming next",
                "We will create the shareable ADEY Journey card next."
              )
            }
          >
            <Ionicons
              name="share-social-outline"
              size={21}
              color="#263F2D"
            />
          </TouchableOpacity>
        </View>

        {heroPhoto ? (
          <View style={styles.heroContainer}>
            <Image
              source={{
                uri: heroPhoto.url,
              }}
              style={styles.heroImage}
            />

            <View style={styles.heroOverlay} />

            <View style={styles.heroText}>
              <Text style={styles.kicker}>
                My Ethiopia Journey
              </Text>

              <Text style={styles.placeName}>
                {place?.name ||
                  "Ethiopian Journey"}
              </Text>

              <View style={styles.locationRow}>
                <Ionicons
                  name="location-outline"
                  size={15}
                  color="#F4F1E8"
                />

                <Text style={styles.location}>
                  {[
                    place?.city || place?.area,
                    place?.region,
                  ]
                    .filter(Boolean)
                    .join(", ") || "Ethiopia"}
                </Text>
              </View>
            </View>

            <View style={styles.heroStamp}>
              <AdeyStamp
                placeName={place?.name}
                date={entry.visitedAt}
                size="small"
              />
            </View>
          </View>
        ) : (
          <View style={styles.noPhotoHero}>
            <Ionicons
              name="images-outline"
              size={42}
              color="#526257"
            />

            <Text style={styles.noPhotoTitle}>
              No personal photos yet
            </Text>

            <Text style={styles.noPhotoText}>
              This destination is in your Passport,
              but you have not added travel photographs
              yet.
            </Text>
          </View>
        )}

        <View style={styles.journeyDetails}>
          <View style={styles.dateBlock}>
            <View style={styles.dateIcon}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#37533C"
              />
            </View>

            <View>
              <Text style={styles.detailLabel}>
                Visited
              </Text>

              <Text style={styles.detailValue}>
                {formatDate(entry.visitedAt)}
              </Text>
            </View>
          </View>
        </View>

        {!!entry.memory && (
          <View style={styles.memorySection}>
            <View style={styles.sectionTitleRow}>
              <Ionicons
                name="book-outline"
                size={21}
                color="#A9643B"
              />

              <Text style={styles.sectionTitle}>
                My memory
              </Text>
            </View>

            <Text style={styles.memoryText}>
              {entry.memory}
            </Text>
          </View>
        )}

        {personalPhotos.length > 1 && (
          <View style={styles.photoSection}>
            <View
              style={[
                styles.sectionTitleRow,
                styles.photoSectionTitle,
              ]}
            >
              <Ionicons
                name="images-outline"
                size={21}
                color="#A9643B"
              />

              <Text style={styles.sectionTitle}>
                Journey photographs
              </Text>
            </View>

            <Text style={styles.photoCountText}>
              {personalPhotos.length} personal{" "}
              {personalPhotos.length === 1
                ? "photo"
                : "photos"}
            </Text>

            {personalPhotos
              .slice(1)
              .map((photo, index) => (
                <View
                  key={photo.id || index}
                  style={styles.photoContainer}
                >
                  <Image
                    source={{
                      uri: photo.url,
                    }}
                    style={styles.journeyPhoto}
                  />

                  {!!photo.caption && (
                    <Text
                      style={styles.photoCaption}
                    >
                      {photo.caption}
                    </Text>
                  )}
                </View>
              ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.destinationButton}
          onPress={openDestination}
        >
          <Ionicons
            name="compass-outline"
            size={20}
            color="#FFFFFF"
          />

          <Text
            style={styles.destinationButtonText}
          >
            Explore{" "}
            {place?.name || "this destination"}{" "}
            on ADEY
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}