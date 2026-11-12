import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

import { getAllPlaces } from "../../services/placeService";

import {
  savePassportEntry,
  uploadPassportImage,
} from "../../services/passportService";

import { colors } from "../../styles/theme";
import styles from "./styles";

const MAX_GALLERY_PHOTOS = 5;

export default function AddJourneyScreen({
  route,
  navigation,
}) {
  const initialPlace = route.params?.place || null;

  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] =
    useState(initialPlace);

  const [query, setQuery] = useState(
    initialPlace?.name || ""
  );

  const [status, setStatus] = useState("visited");
  const [visitedAt, setVisitedAt] = useState(
    new Date()
  );

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const [memory, setMemory] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const [coverImage, setCoverImage] =
    useState(null);

  const [galleryImages, setGalleryImages] =
    useState([]);

  const [loadingPlaces, setLoadingPlaces] =
    useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPlaces();
  }, []);

  const loadPlaces = async () => {
    try {
      setLoadingPlaces(true);

      const data = await getAllPlaces();

      setPlaces(Array.isArray(data) ? data : []);
    } catch (error) {
      Alert.alert(
        "Unable to load destinations",
        error.response?.data?.message ||
          error.message
      );
    } finally {
      setLoadingPlaces(false);
    }
  };

  const filteredPlaces = useMemo(() => {
    const cleanedQuery = query
      .trim()
      .toLowerCase();

    if (!cleanedQuery || selectedPlace) {
      return [];
    }

    return places
      .filter((place) => {
        const searchableText = [
          place.name,
          place.city,
          place.area,
          place.region,
          place.category,
          place.type,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(cleanedQuery);
      })
      .slice(0, 8);
  }, [places, query, selectedPlace]);

  const selectPlace = (place) => {
    setSelectedPlace(place);
    setQuery(place.name);
  };

  const clearSelectedPlace = () => {
    setSelectedPlace(null);
    setQuery("");
  };

  const requestGalleryPermission = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "ADEY needs access to your photos so you can add travel memories."
      );

      return false;
    }

    return true;
  };

  const pickCoverImage = async () => {
    const hasPermission =
      await requestGalleryPermission();

    if (!hasPermission) return;

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

    if (!result.canceled && result.assets?.[0]) {
      setCoverImage(result.assets[0]);
    }
  };

  const pickGalleryImages = async () => {
    const remaining =
      MAX_GALLERY_PHOTOS -
      galleryImages.length;

    if (remaining <= 0) {
      Alert.alert(
        "Photo limit reached",
        "You can add up to 5 additional photos."
      );

      return;
    }

    const hasPermission =
      await requestGalleryPermission();

    if (!hasPermission) return;

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: remaining,
        quality: 0.7,
      });

    if (result.canceled) return;

    const selectedImages =
      result.assets?.slice(0, remaining) || [];

    setGalleryImages((current) => [
      ...current,
      ...selectedImages,
    ]);
  };

  const removeGalleryImage = (index) => {
    setGalleryImages((current) =>
      current.filter(
        (_, imageIndex) => imageIndex !== index
      )
    );
  };

  const handleDateChange = (
    event,
    selectedDate
  ) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      setVisitedAt(selectedDate);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSave = async () => {
    if (!selectedPlace?._id) {
      Alert.alert(
        "Choose a destination",
        "Search for and select the place you want to add."
      );

      return;
    }

    try {
      setSaving(true);

      await savePassportEntry(
        selectedPlace._id,
        {
          status,

          visitedAt:
            status === "visited"
              ? visitedAt.toISOString()
              : null,

          memory:
            status === "visited"
              ? memory.trim()
              : "",

          isPublic,
        }
      );

      if (
        status === "visited" &&
        coverImage
      ) {
        await uploadPassportImage(
          selectedPlace._id,
          coverImage,
          "cover"
        );
      }

      if (status === "visited") {
        for (const image of galleryImages) {
          await uploadPassportImage(
            selectedPlace._id,
            image,
            "gallery"
          );
        }
      }

      Alert.alert(
        status === "visited"
          ? "Passport stamped"
          : "Added to your travel list",
        status === "visited"
          ? `${selectedPlace.name} is now part of your Ethiopia Passport.`
          : `${selectedPlace.name} was added to places you want to visit.`,
        [
          {
            text: "View Passport",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Unable to save journey",
        error.response?.data?.message ||
          error.message
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "left", "right"]}
    >
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="arrow-back"
                size={22}
                color={colors.primary}
              />
            </TouchableOpacity>

            <View style={styles.titleBlock}>
              <Text style={styles.kicker}>
                Ethiopia Passport
              </Text>

              <Text style={styles.title}>
                Add a journey
              </Text>

              <Text style={styles.subtitle}>
                Collect a destination and preserve
                the memories that made it special.
              </Text>
            </View>
          </View>

          <View style={styles.statusCard}>
            <Text style={styles.sectionTitle}>
              What would you like to add?
            </Text>

            <View style={styles.statusRow}>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  status === "visited" &&
                    styles.statusButtonActive,
                ]}
                onPress={() =>
                  setStatus("visited")
                }
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color={
                    status === "visited"
                      ? colors.white
                      : colors.primary
                  }
                />

                <Text
                  style={[
                    styles.statusText,
                    status === "visited" &&
                      styles.statusTextActive,
                  ]}
                >
                  I visited
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.statusButton,
                  status === "wantToVisit" &&
                    styles.statusButtonActive,
                ]}
                onPress={() =>
                  setStatus("wantToVisit")
                }
              >
                <Ionicons
                  name="heart-outline"
                  size={20}
                  color={
                    status === "wantToVisit"
                      ? colors.white
                      : colors.primary
                  }
                />

                <Text
                  style={[
                    styles.statusText,
                    status === "wantToVisit" &&
                      styles.statusTextActive,
                  ]}
                >
                  Want to visit
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>
              Choose a destination
            </Text>

            <Text style={styles.sectionDescription}>
              Select one of ADEY’s curated places.
            </Text>

            <View style={styles.searchContainer}>
              <Ionicons
                name="search-outline"
                size={20}
                color={colors.darkGray}
              />

              <TextInput
                style={styles.searchInput}
                value={query}
                onChangeText={(value) => {
                  setQuery(value);

                  if (selectedPlace) {
                    setSelectedPlace(null);
                  }
                }}
                placeholder="Search Lalibela, Wenchi, Bale..."
                placeholderTextColor="#8D928E"
              />

              {!!query && (
                <TouchableOpacity
                  onPress={clearSelectedPlace}
                >
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={colors.darkGray}
                  />
                </TouchableOpacity>
              )}
            </View>

            {loadingPlaces && (
              <ActivityIndicator
                style={styles.searchLoader}
                color={colors.primary}
              />
            )}

            {filteredPlaces.length > 0 && (
              <View style={styles.resultsContainer}>
                {filteredPlaces.map((place) => (
                  <TouchableOpacity
                    key={place._id}
                    style={styles.resultItem}
                    onPress={() =>
                      selectPlace(place)
                    }
                  >
                    <View
                      style={styles.resultIcon}
                    >
                      <Ionicons
                        name="location-outline"
                        size={19}
                        color={colors.primary}
                      />
                    </View>

                    <View style={styles.resultText}>
                      <Text
                        style={styles.resultName}
                      >
                        {place.name}
                      </Text>

                      <Text
                        style={
                          styles.resultLocation
                        }
                      >
                        {[
                          place.city || place.area,
                          place.region,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </Text>
                    </View>

                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={colors.darkGray}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {selectedPlace && (
              <View style={styles.selectedPlaceCard}>
                {selectedPlace.coverImage ? (
                  <Image
                    source={{
                      uri: selectedPlace.coverImage,
                    }}
                    style={styles.selectedPlaceImage}
                  />
                ) : (
                  <View
                    style={
                      styles.selectedPlacePlaceholder
                    }
                  >
                    <Ionicons
                      name="image-outline"
                      size={30}
                      color={colors.primary}
                    />
                  </View>
                )}

                <View
                  style={styles.selectedPlaceInfo}
                >
                  <Text
                    style={styles.selectedPlaceLabel}
                  >
                    Selected destination
                  </Text>

                  <Text
                    style={styles.selectedPlaceName}
                  >
                    {selectedPlace.name}
                  </Text>

                  <Text
                    style={
                      styles.selectedPlaceLocation
                    }
                  >
                    {[
                      selectedPlace.city ||
                        selectedPlace.area,
                      selectedPlace.region,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </Text>
                </View>

                <Ionicons
                  name="checkmark-circle"
                  size={25}
                  color={colors.accent}
                />
              </View>
            )}
          </View>

          {status === "visited" && (
            <>
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>
                  When did you visit?
                </Text>

                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() =>
                    setShowDatePicker(true)
                  }
                >
                  <Ionicons
                    name="calendar-outline"
                    size={21}
                    color={colors.primary}
                  />

                  <Text style={styles.dateText}>
                    {formatDate(visitedAt)}
                  </Text>

                  <Ionicons
                    name="chevron-down"
                    size={18}
                    color={colors.darkGray}
                  />
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    value={visitedAt}
                    mode="date"
                    display={
                      Platform.OS === "ios"
                        ? "inline"
                        : "default"
                    }
                    maximumDate={new Date()}
                    onChange={handleDateChange}
                  />
                )}
              </View>

              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>
                  Cover photo
                </Text>

                <Text
                  style={styles.sectionDescription}
                >
                  Choose the photo that will represent
                  this journey in your Passport.
                </Text>

                {coverImage ? (
                  <View
                    style={
                      styles.coverPreviewContainer
                    }
                  >
                    <Image
                      source={{
                        uri: coverImage.uri,
                      }}
                      style={styles.coverPreview}
                    />

                    <TouchableOpacity
                      style={styles.removeCoverButton}
                      onPress={() =>
                        setCoverImage(null)
                      }
                    >
                      <Ionicons
                        name="close"
                        size={20}
                        color={colors.white}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.changeCoverButton}
                      onPress={pickCoverImage}
                    >
                      <Ionicons
                        name="camera-outline"
                        size={18}
                        color={colors.white}
                      />

                      <Text
                        style={
                          styles.changeCoverText
                        }
                      >
                        Change
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.photoPicker}
                    onPress={pickCoverImage}
                  >
                    <View
                      style={
                        styles.photoPickerIcon
                      }
                    >
                      <Ionicons
                        name="camera-outline"
                        size={28}
                        color={colors.primary}
                      />
                    </View>

                    <Text
                      style={styles.photoPickerTitle}
                    >
                      Add a cover photo
                    </Text>

                    <Text
                      style={
                        styles.photoPickerSubtitle
                      }
                    >
                      One photo · Maximum 5 MB
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.sectionCard}>
                <View
                  style={styles.sectionTitleRow}
                >
                  <View>
                    <Text
                      style={styles.sectionTitle}
                    >
                      More memories
                    </Text>

                    <Text
                      style={
                        styles.sectionDescription
                      }
                    >
                      Add up to five more photos.
                    </Text>
                  </View>

                  <Text style={styles.photoCounter}>
                    {galleryImages.length}/
                    {MAX_GALLERY_PHOTOS}
                  </Text>
                </View>

                <View style={styles.galleryGrid}>
                  {galleryImages.map(
                    (image, index) => (
                      <View
                        key={`${image.uri}-${index}`}
                        style={
                          styles.galleryImageContainer
                        }
                      >
                        <Image
                          source={{
                            uri: image.uri,
                          }}
                          style={styles.galleryImage}
                        />

                        <TouchableOpacity
                          style={
                            styles.removeGalleryButton
                          }
                          onPress={() =>
                            removeGalleryImage(index)
                          }
                        >
                          <Ionicons
                            name="close"
                            size={16}
                            color={colors.white}
                          />
                        </TouchableOpacity>
                      </View>
                    )
                  )}

                  {galleryImages.length <
                    MAX_GALLERY_PHOTOS && (
                    <TouchableOpacity
                      style={styles.addGalleryButton}
                      onPress={pickGalleryImages}
                    >
                      <Ionicons
                        name="add"
                        size={28}
                        color={colors.primary}
                      />

                      <Text
                        style={
                          styles.addGalleryText
                        }
                      >
                        Add
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>
                  Your memory
                </Text>

                <Text
                  style={styles.sectionDescription}
                >
                  What made this journey meaningful?
                </Text>

                <TextInput
                  style={styles.memoryInput}
                  value={memory}
                  onChangeText={setMemory}
                  placeholder="The view, the people, a special moment..."
                  placeholderTextColor="#8D928E"
                  multiline
                  maxLength={500}
                  textAlignVertical="top"
                />

                <Text style={styles.characterCount}>
                  {memory.length}/500
                </Text>
              </View>

              <View style={styles.sectionCard}>
                <View style={styles.privacyRow}>
                  <View style={styles.privacyText}>
                    <Text
                      style={styles.sectionTitle}
                    >
                      Shareable memory
                    </Text>

                    <Text
                      style={
                        styles.sectionDescription
                      }
                    >
                      Allow this journey to appear when
                      you share your Passport.
                    </Text>
                  </View>

                  <Switch
                    value={isPublic}
                    onValueChange={setIsPublic}
                    trackColor={{
                      false: colors.borderGray,
                      true: colors.accent,
                    }}
                    thumbColor={colors.white}
                  />
                </View>
              </View>
            </>
          )}

          <TouchableOpacity
            style={[
              styles.saveButton,
              saving && styles.saveButtonDisabled,
            ]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <ActivityIndicator
                  color={colors.white}
                  size="small"
                />

                <Text style={styles.saveButtonText}>
                  Saving your journey...
                </Text>
              </>
            ) : (
              <>
                <Ionicons
                  name={
                    status === "visited"
                      ? "ribbon-outline"
                      : "heart-outline"
                  }
                  size={21}
                  color={colors.white}
                />

                <Text style={styles.saveButtonText}>
                  {status === "visited"
                    ? "Stamp my Passport"
                    : "Add to Want to Visit"}
                </Text>
              </>
            )}
          </TouchableOpacity>

          <Text style={styles.footerNote}>
            Photos are optimized before being stored
            securely.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}