import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import {
  createPlace,
  updatePlaceById,
  uploadPlaceImage,
} from "../../services/placeService";
import { colors } from "../../styles/theme";
import styles from "./PlaceFormScreen.styles";

const typeOptions = [
  "destination",
  "resort",
  "lodge",
  "hotel",
  "experience",
  "park",
  "museum",
  "restaurant",
  "cafe",
  "cultural-site",
];

const categoryOptions = [
  "historical",
  "cultural",
  "nature",
  "adventure",
  "religious",
  "wildlife",
  "lake",
  "mountain",
  "city",
  "luxury",
  "wellness",
  "family",
  "eco",
  "museum",
  "food",
  "heritage",
];

const priceRangeOptions = ["free", "budget", "mid-range", "premium", "luxury"];
const difficultyOptions = ["easy", "moderate", "hard"];
const statusOptions = ["draft", "published"];

const tourismPriorityOptions = [
  "iconic",
  "emerging",
  "government-project",
  "eco-tourism",
  "heritage",
  "luxury-growth",
  "hidden-gem",
];

const roadConditionOptions = ["excellent", "good", "mixed", "rough", "seasonal"];
const weekendTripLevelOptions = ["day-trip", "overnight", "2-3-days", "extended"];
const apiVisibilityOptions = ["public", "partner", "internal"];

const arrayToText = (value) =>
  Array.isArray(value) ? value.join(", ") : value || "";

const textToArray = (value) =>
  value
    ? value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

const toNumberOrNull = (value) => {
  if (value === "" || value === null || value === undefined) return null;
  const number = Number(value);
  return Number.isNaN(number) ? null : number;
};

export default function PlaceFormScreen({ route, navigation }) {
  const place = route.params?.place;
  const isEditing = !!place?._id;

  const [form, setForm] = useState({
    name: place?.name || "",
    slug: place?.slug || "",
    country: place?.country || "Ethiopia",
    type: place?.type || "destination",
    category: place?.category || "nature",
    region: place?.region || "",
    city: place?.city || "",
    area: place?.area || "",
    shortDescription: place?.shortDescription || "",
    story: place?.story || "",

    highlights: arrayToText(place?.highlights),
    activities: arrayToText(place?.activities),
    amenities: arrayToText(place?.amenities),
    tags: arrayToText(place?.tags),
    localTips: arrayToText(place?.localTips),
    travelWarnings: arrayToText(place?.travelWarnings),
    seasonality: arrayToText(place?.seasonality),
    idealFor: arrayToText(place?.idealFor),
    recommendedTransport: arrayToText(place?.recommendedTransport),
    sourceLinks: arrayToText(place?.sourceLinks),

    bestForPhotography: place?.bestForPhotography || false,
    bestForFamilies: place?.bestForFamilies || false,
    hiddenGemScore: String(place?.hiddenGemScore ?? 5),
    difficultyLevel: place?.difficultyLevel || "easy",
    bestTimeToVisit: place?.bestTimeToVisit || "",
    estimatedVisitDuration: place?.estimatedVisitDuration || "",
    priceRange: place?.priceRange || "mid-range",

    longitude: String(place?.location?.coordinates?.[0] ?? ""),
    latitude: String(place?.location?.coordinates?.[1] ?? ""),
    distanceFromAddisKm: String(place?.distanceFromAddisKm ?? ""),
    travelTimeFromAddisHours: String(place?.travelTimeFromAddisHours ?? ""),
    roadCondition: place?.roadCondition || "good",
    nearestAirport: place?.nearestAirport || "",
    nearestTown: place?.nearestTown || "",
    googleMapsUrl: place?.googleMapsUrl || "",

    isWeekendTrip: place?.isWeekendTrip || false,
    weekendTripLevel: place?.weekendTripLevel || "day-trip",

    adventure: String(place?.experienceScores?.adventure ?? 5),
    culture: String(place?.experienceScores?.culture ?? 5),
    nature: String(place?.experienceScores?.nature ?? 5),
    photography: String(place?.experienceScores?.photography ?? 5),
    familyFriendly: String(place?.experienceScores?.familyFriendly ?? 5),
    accessibility: String(place?.experienceScores?.accessibility ?? 5),

    coverImage: place?.coverImage || "",
    images: arrayToText(place?.images),

    featured: place?.featured || false,
    featuredOrder: String(place?.featuredOrder ?? 0),
    isNewOrGrowing: place?.isNewOrGrowing || false,
    isCurated: place?.isCurated ?? true,
    tourismPriority: place?.tourismPriority || "emerging",

    popularityScore: String(place?.popularityScore ?? 50),
    ethiopiaScore: String(place?.ethiopiaScore ?? 50),
    scoreReason: place?.scoreReason || "",
    rating: String(place?.rating ?? 4),
    apiVisibility: place?.apiVisibility || "public",
    status: place?.status || "published",
  });

  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const buildPayload = () => ({
    name: form.name.trim(),
    slug: form.slug.trim() || undefined,
    country: form.country.trim() || "Ethiopia",
    type: form.type,
    category: form.category,
    region: form.region.trim(),
    city: form.city.trim(),
    area: form.area.trim(),
    shortDescription: form.shortDescription.trim(),
    story: form.story.trim(),

    highlights: textToArray(form.highlights),
    activities: textToArray(form.activities),
    amenities: textToArray(form.amenities),
    tags: textToArray(form.tags),
    localTips: textToArray(form.localTips),
    travelWarnings: textToArray(form.travelWarnings),
    seasonality: textToArray(form.seasonality),
    idealFor: textToArray(form.idealFor),
    recommendedTransport: textToArray(form.recommendedTransport),
    sourceLinks: textToArray(form.sourceLinks),

    bestForPhotography: form.bestForPhotography,
    bestForFamilies: form.bestForFamilies,
    hiddenGemScore: toNumberOrNull(form.hiddenGemScore) || 5,
    difficultyLevel: form.difficultyLevel,
    bestTimeToVisit: form.bestTimeToVisit.trim(),
    estimatedVisitDuration: form.estimatedVisitDuration.trim(),
    priceRange: form.priceRange,

    location: {
      type: "Point",
      coordinates: [
        toNumberOrNull(form.longitude) || 0,
        toNumberOrNull(form.latitude) || 0,
      ],
    },

    distanceFromAddisKm: toNumberOrNull(form.distanceFromAddisKm),
    travelTimeFromAddisHours: toNumberOrNull(form.travelTimeFromAddisHours),
    roadCondition: form.roadCondition,
    nearestAirport: form.nearestAirport.trim(),
    nearestTown: form.nearestTown.trim(),
    googleMapsUrl: form.googleMapsUrl.trim(),

    isWeekendTrip: form.isWeekendTrip,
    weekendTripLevel: form.weekendTripLevel,

    experienceScores: {
      adventure: toNumberOrNull(form.adventure) || 5,
      culture: toNumberOrNull(form.culture) || 5,
      nature: toNumberOrNull(form.nature) || 5,
      photography: toNumberOrNull(form.photography) || 5,
      familyFriendly: toNumberOrNull(form.familyFriendly) || 5,
      accessibility: toNumberOrNull(form.accessibility) || 5,
    },

    coverImage: form.coverImage.trim(),
    images: textToArray(form.images),

    featured: form.featured,
    featuredOrder: toNumberOrNull(form.featuredOrder) || 0,
    isNewOrGrowing: form.isNewOrGrowing,
    isCurated: form.isCurated,
    tourismPriority: form.tourismPriority,

    popularityScore: toNumberOrNull(form.popularityScore) || 50,
    ethiopiaScore: toNumberOrNull(form.ethiopiaScore) || 50,
    scoreReason: form.scoreReason.trim(),
    rating: toNumberOrNull(form.rating) || 4,
    apiVisibility: form.apiVisibility,
    status: form.status,
  });

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      return Alert.alert("Missing field", "Place name is required.");
    }

    if (!form.region.trim()) {
      return Alert.alert("Missing field", "Region is required.");
    }

    if (!form.shortDescription.trim()) {
      return Alert.alert("Missing field", "Short description is required.");
    }

    try {
      setSaving(true);
      const payload = buildPayload();

      if (isEditing) {
        await updatePlaceById(place._id, payload);
        Alert.alert("Success", "Place updated successfully.");
      } else {
        await createPlace(payload);
        Alert.alert(
          "Success",
          "Place created successfully. Open it again from Manage Places to upload images."
        );
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert("Save failed", error.response?.data?.message || error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (image, imageType) => {
    if (!isEditing) {
      Alert.alert(
        "Save place first",
        "Please create the place first. Then open it again to upload cover and gallery images."
      );
      return;
    }

    try {
      setUploadingImage(true);

      const updatedPlace = await uploadPlaceImage(place._id, image, imageType);

      if (imageType === "cover") {
        updateField("coverImage", updatedPlace.coverImage || "");
      } else {
        updateField("images", arrayToText(updatedPlace.images));
      }

      Alert.alert("Success", "Image uploaded successfully.");
    } catch (error) {
      Alert.alert(
        "Upload failed",
        error.response?.data?.message || error.message
      );
    } finally {
      setUploadingImage(false);
    }
  };

  const pickImage = async (imageType = "cover") => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Gallery access is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: imageType === "cover",
      quality: 0.8,
    });

    if (!result.canceled) {
      await handleImageUpload(result.assets[0], imageType);
    }
  };

  const takePhoto = async (imageType = "cover") => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Camera access is required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: imageType === "cover",
      quality: 0.8,
    });

    if (!result.canceled) {
      await handleImageUpload(result.assets[0], imageType);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={22} color={colors.primary} />
          </TouchableOpacity>

          <View style={styles.titleBlock}>
            <Text style={styles.title}>
              {isEditing ? "Edit Place" : "Create Place"}
            </Text>
            <Text style={styles.subtitle}>
              {isEditing
                ? "Update destination content, scores, visibility, and travel details."
                : "Add a new destination to your travel app. Images can be uploaded after creating it."}
            </Text>
          </View>
        </View>

        <Section title="Basic Information" icon="information-circle-outline">
          <Input
            label="Name *"
            value={form.name}
            onChangeText={(v) => updateField("name", v)}
          />
          <Input
            label="Slug optional"
            value={form.slug}
            onChangeText={(v) => updateField("slug", v)}
          />
          <Input
            label="Country"
            value={form.country}
            onChangeText={(v) => updateField("country", v)}
          />
          <PickerRow
            label="Type *"
            value={form.type}
            options={typeOptions}
            onChange={(v) => updateField("type", v)}
          />
          <PickerRow
            label="Category"
            value={form.category}
            options={categoryOptions}
            onChange={(v) => updateField("category", v)}
          />
          <Input
            label="Region *"
            value={form.region}
            onChangeText={(v) => updateField("region", v)}
          />
          <Input
            label="City"
            value={form.city}
            onChangeText={(v) => updateField("city", v)}
          />
          <Input
            label="Area"
            value={form.area}
            onChangeText={(v) => updateField("area", v)}
          />
        </Section>

        <Section title="Content" icon="document-text-outline">
          <Input
            label="Short Description *"
            value={form.shortDescription}
            onChangeText={(v) => updateField("shortDescription", v)}
            multiline
          />
          <Input
            label="Story"
            value={form.story}
            onChangeText={(v) => updateField("story", v)}
            multiline
          />
          <Input
            label="Highlights comma separated"
            value={form.highlights}
            onChangeText={(v) => updateField("highlights", v)}
            multiline
          />
          <Input
            label="Activities comma separated"
            value={form.activities}
            onChangeText={(v) => updateField("activities", v)}
            multiline
          />
          <Input
            label="Amenities comma separated"
            value={form.amenities}
            onChangeText={(v) => updateField("amenities", v)}
            multiline
          />
          <Input
            label="Tags comma separated"
            value={form.tags}
            onChangeText={(v) => updateField("tags", v)}
            multiline
          />
          <Input
            label="Ideal For comma separated"
            value={form.idealFor}
            onChangeText={(v) => updateField("idealFor", v)}
            multiline
          />
          <Input
            label="Local Tips comma separated"
            value={form.localTips}
            onChangeText={(v) => updateField("localTips", v)}
            multiline
          />
          <Input
            label="Travel Warnings comma separated"
            value={form.travelWarnings}
            onChangeText={(v) => updateField("travelWarnings", v)}
            multiline
          />
        </Section>

        <Section title="Travel Details" icon="map-outline">
          <Input
            label="Best Time To Visit"
            value={form.bestTimeToVisit}
            onChangeText={(v) => updateField("bestTimeToVisit", v)}
          />
          <Input
            label="Seasonality comma separated"
            value={form.seasonality}
            onChangeText={(v) => updateField("seasonality", v)}
          />
          <Input
            label="Estimated Visit Duration"
            value={form.estimatedVisitDuration}
            onChangeText={(v) => updateField("estimatedVisitDuration", v)}
          />
          <PickerRow
            label="Price Range"
            value={form.priceRange}
            options={priceRangeOptions}
            onChange={(v) => updateField("priceRange", v)}
          />
          <PickerRow
            label="Difficulty Level"
            value={form.difficultyLevel}
            options={difficultyOptions}
            onChange={(v) => updateField("difficultyLevel", v)}
          />
          <Input
            label="Recommended Transport comma separated"
            value={form.recommendedTransport}
            onChangeText={(v) => updateField("recommendedTransport", v)}
          />
        </Section>

        <Section title="Location" icon="location-outline">
          <Input
            label="Longitude"
            value={form.longitude}
            keyboardType="numeric"
            onChangeText={(v) => updateField("longitude", v)}
          />
          <Input
            label="Latitude"
            value={form.latitude}
            keyboardType="numeric"
            onChangeText={(v) => updateField("latitude", v)}
          />
          <Input
            label="Distance From Addis KM"
            value={form.distanceFromAddisKm}
            keyboardType="numeric"
            onChangeText={(v) => updateField("distanceFromAddisKm", v)}
          />
          <Input
            label="Travel Time From Addis Hours"
            value={form.travelTimeFromAddisHours}
            keyboardType="numeric"
            onChangeText={(v) => updateField("travelTimeFromAddisHours", v)}
          />
          <PickerRow
            label="Road Condition"
            value={form.roadCondition}
            options={roadConditionOptions}
            onChange={(v) => updateField("roadCondition", v)}
          />
          <Input
            label="Nearest Airport"
            value={form.nearestAirport}
            onChangeText={(v) => updateField("nearestAirport", v)}
          />
          <Input
            label="Nearest Town"
            value={form.nearestTown}
            onChangeText={(v) => updateField("nearestTown", v)}
          />
          <Input
            label="Google Maps URL"
            value={form.googleMapsUrl}
            onChangeText={(v) => updateField("googleMapsUrl", v)}
          />
        </Section>

        <Section title="Weekend Trip" icon="calendar-outline">
          <SwitchRow
            label="Is Weekend Trip"
            value={form.isWeekendTrip}
            onValueChange={(v) => updateField("isWeekendTrip", v)}
          />
          <PickerRow
            label="Weekend Trip Level"
            value={form.weekendTripLevel}
            options={weekendTripLevelOptions}
            onChange={(v) => updateField("weekendTripLevel", v)}
          />
        </Section>

        <Section title="Scores" icon="star-outline">
          <Input
            label="Hidden Gem Score 1-10"
            value={form.hiddenGemScore}
            keyboardType="numeric"
            onChangeText={(v) => updateField("hiddenGemScore", v)}
          />
          <Input
            label="Popularity Score 0-100"
            value={form.popularityScore}
            keyboardType="numeric"
            onChangeText={(v) => updateField("popularityScore", v)}
          />
          <Input
            label="Ethiopia Score 1-100"
            value={form.ethiopiaScore}
            keyboardType="numeric"
            onChangeText={(v) => updateField("ethiopiaScore", v)}
          />
          <Input
            label="Score Reason"
            value={form.scoreReason}
            onChangeText={(v) => updateField("scoreReason", v)}
            multiline
          />
          <Input
            label="Rating 0-5"
            value={form.rating}
            keyboardType="numeric"
            onChangeText={(v) => updateField("rating", v)}
          />
        </Section>

        <Section title="Experience Scores" icon="analytics-outline">
          <Input
            label="Adventure 1-10"
            value={form.adventure}
            keyboardType="numeric"
            onChangeText={(v) => updateField("adventure", v)}
          />
          <Input
            label="Culture 1-10"
            value={form.culture}
            keyboardType="numeric"
            onChangeText={(v) => updateField("culture", v)}
          />
          <Input
            label="Nature 1-10"
            value={form.nature}
            keyboardType="numeric"
            onChangeText={(v) => updateField("nature", v)}
          />
          <Input
            label="Photography 1-10"
            value={form.photography}
            keyboardType="numeric"
            onChangeText={(v) => updateField("photography", v)}
          />
          <Input
            label="Family Friendly 1-10"
            value={form.familyFriendly}
            keyboardType="numeric"
            onChangeText={(v) => updateField("familyFriendly", v)}
          />
          <Input
            label="Accessibility 1-10"
            value={form.accessibility}
            keyboardType="numeric"
            onChangeText={(v) => updateField("accessibility", v)}
          />
        </Section>

        <Section title="Images" icon="image-outline">
          {form.coverImage ? (
            <Image source={{ uri: form.coverImage }} style={styles.coverPreview} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={34} color={colors.primary} />
              <Text style={styles.imagePlaceholderText}>
                {isEditing
                  ? "No cover image yet"
                  : "Create this place first to upload images"}
              </Text>
            </View>
          )}

          {uploadingImage ? (
            <View style={styles.uploadingBox}>
              <ActivityIndicator color={colors.primary} />
              <Text style={styles.uploadingText}>Uploading image...</Text>
            </View>
          ) : null}

          <View style={styles.imageButtonRow}>
            <TouchableOpacity
              style={[
                styles.imageButton,
                (!isEditing || uploadingImage) && styles.imageButtonDisabled,
              ]}
              onPress={() => pickImage("cover")}
              disabled={!isEditing || uploadingImage}
              activeOpacity={0.85}
            >
              <Ionicons name="images-outline" size={18} color={colors.primary} />
              <Text style={styles.imageButtonText}>Pick Cover</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.imageButton,
                (!isEditing || uploadingImage) && styles.imageButtonDisabled,
              ]}
              onPress={() => takePhoto("cover")}
              disabled={!isEditing || uploadingImage}
              activeOpacity={0.85}
            >
              <Ionicons name="camera-outline" size={18} color={colors.primary} />
              <Text style={styles.imageButtonText}>Take Cover</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imageButtonRow}>
            <TouchableOpacity
              style={[
                styles.imageButton,
                (!isEditing || uploadingImage) && styles.imageButtonDisabled,
              ]}
              onPress={() => pickImage("gallery")}
              disabled={!isEditing || uploadingImage}
              activeOpacity={0.85}
            >
              <Ionicons name="albums-outline" size={18} color={colors.primary} />
              <Text style={styles.imageButtonText}>Pick Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.imageButton,
                (!isEditing || uploadingImage) && styles.imageButtonDisabled,
              ]}
              onPress={() => takePhoto("gallery")}
              disabled={!isEditing || uploadingImage}
              activeOpacity={0.85}
            >
              <Ionicons
                name="camera-reverse-outline"
                size={18}
                color={colors.primary}
              />
              <Text style={styles.imageButtonText}>Take Gallery</Text>
            </TouchableOpacity>
          </View>

          {form.images ? (
            <Text style={styles.galleryCountText}>
              Gallery images: {textToArray(form.images).length}
            </Text>
          ) : null}

          <Input
            label="Cover Image URL"
            value={form.coverImage}
            onChangeText={(v) => updateField("coverImage", v)}
          />

          <Input
            label="Gallery Image URLs comma separated"
            value={form.images}
            onChangeText={(v) => updateField("images", v)}
            multiline
          />
        </Section>

        <Section title="Admin Settings" icon="settings-outline">
          <SwitchRow
            label="Featured"
            value={form.featured}
            onValueChange={(v) => updateField("featured", v)}
          />
          <Input
            label="Featured Order"
            value={form.featuredOrder}
            keyboardType="numeric"
            onChangeText={(v) => updateField("featuredOrder", v)}
          />
          <SwitchRow
            label="New or Growing"
            value={form.isNewOrGrowing}
            onValueChange={(v) => updateField("isNewOrGrowing", v)}
          />
          <SwitchRow
            label="Curated"
            value={form.isCurated}
            onValueChange={(v) => updateField("isCurated", v)}
          />
          <SwitchRow
            label="Best for Photography"
            value={form.bestForPhotography}
            onValueChange={(v) => updateField("bestForPhotography", v)}
          />
          <SwitchRow
            label="Best for Families"
            value={form.bestForFamilies}
            onValueChange={(v) => updateField("bestForFamilies", v)}
          />
          <PickerRow
            label="Tourism Priority"
            value={form.tourismPriority}
            options={tourismPriorityOptions}
            onChange={(v) => updateField("tourismPriority", v)}
          />
          <PickerRow
            label="API Visibility"
            value={form.apiVisibility}
            options={apiVisibilityOptions}
            onChange={(v) => updateField("apiVisibility", v)}
          />
          <PickerRow
            label="Status"
            value={form.status}
            options={statusOptions}
            onChange={(v) => updateField("status", v)}
          />
          <Input
            label="Source Links comma separated"
            value={form.sourceLinks}
            onChangeText={(v) => updateField("sourceLinks", v)}
            multiline
          />
        </Section>

        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSubmit}
          disabled={saving}
          activeOpacity={0.85}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
              <Text style={styles.saveButtonText}>
                {isEditing ? "Update Place" : "Create Place"}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, icon, children }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name={icon} size={20} color={colors.primary} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function Input({
  label,
  value,
  onChangeText,
  multiline = false,
  keyboardType = "default",
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
        placeholderTextColor="#999"
      />
    </View>
  );
}

function SwitchRow({ label, value, onValueChange }) {
  return (
    <View style={styles.switchRow}>
      <Text style={styles.label}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

function PickerRow({ label, value, options, onChange }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.optionRow}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionChip,
                value === option && styles.optionChipActive,
              ]}
              onPress={() => onChange(option)}
            >
              <Text
                style={[
                  styles.optionChipText,
                  value === option && styles.optionChipTextActive,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}