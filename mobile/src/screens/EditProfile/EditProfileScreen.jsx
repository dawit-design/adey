import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import globalStyles, { colors } from "../../styles/theme";
import styles from "./styles";
import { COUNTRIES, GENDERS, TIMEZONES } from "../../data/countries";
import { getCurrentUser, updateProfile } from "../../services/userService";
import { saveUser } from "../../utils/tokenStorage";

export default function EditProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showGenderOptions, setShowGenderOptions] = useState(false);
  const [showTimezoneOptions, setShowTimezoneOptions] = useState(false);
  const [activeCountryField, setActiveCountryField] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    phone_number: "",
    profile_photo: "",
    date_of_birth: "",
    gender: "",
    nationality: "",
    country_of_residence: "",
    preferred_language: "",
    preferred_currency: "",
    timezone: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getCurrentUser();

        setUser(result);
        setForm({
          full_name: result.full_name || "",
          phone_number: result.phone_number || "",
          profile_photo: result.profile_photo || "",
          date_of_birth: result.date_of_birth
            ? result.date_of_birth.split("T")[0]
            : "",
          gender: result.gender || "",
          nationality: result.nationality || "",
          country_of_residence: result.country_of_residence || "",
          preferred_language: result.preferred_language || "",
          preferred_currency: result.preferred_currency || "",
          timezone: result.timezone || "",
        });
      } catch (error) {
        console.error("Load profile failed:", error);
      }
    };

    loadData();
  }, []);

  const selectedGenderLabel = useMemo(() => {
    return GENDERS.find((item) => item.value === form.gender)?.label || "";
  }, [form.gender]);

  const selectedTimezoneLabel = useMemo(() => {
    return TIMEZONES.find((item) => item.value === form.timezone)?.label || "";
  }, [form.timezone]);

  const filterCountries = (value) => {
    if (!value) return COUNTRIES.slice(0, 6);

    return COUNTRIES.filter((country) =>
      country.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 6);
  };

  const nationalitySuggestions = useMemo(() => {
    return filterCountries(form.nationality);
  }, [form.nationality]);

  const residenceSuggestions = useMemo(() => {
    return filterCountries(form.country_of_residence);
  }, [form.country_of_residence]);

  const handleChange = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const closeDropdowns = () => {
    setShowGenderOptions(false);
    setShowTimezoneOptions(false);
    setActiveCountryField(null);
  };

  const pickImage = async () => {
    closeDropdowns();

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Please allow photo access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      handleChange("profile_photo", result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    closeDropdowns();

    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Please allow camera access.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      handleChange("profile_photo", result.assets[0].uri);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      handleChange("date_of_birth", selectedDate.toISOString().split("T")[0]);
    }
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const payload = {
        ...form,
        gender: form.gender || null,
        profile_photo: form.profile_photo || null,
        date_of_birth: form.date_of_birth || null,
        nationality: form.nationality || null,
        country_of_residence: form.country_of_residence || null,
        timezone: form.timezone || "UTC",
      };

      const updated = await updateProfile(payload);
      await saveUser(updated);

      Alert.alert("Saved", "Profile updated successfully.");
      navigation.goBack();
    } catch (error) {
      console.error("Update profile failed:", error.response?.data || error.message);

      Alert.alert(
        "Update Failed",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={19} color={colors.primary} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Edit Profile</Text>

            <Text style={styles.subtitle}>
              Update your details and keep your trip profile current.
            </Text>

            <View style={styles.identityCard}>
              <View style={styles.identityPhotoSection}>
                {form.profile_photo ? (
                  <Image
                    source={{ uri: form.profile_photo }}
                    style={styles.profileImage}
                  />
                ) : (
                  <View style={styles.profilePlaceholder}>
                    <Text style={styles.profilePlaceholderText}>
                      {form.full_name
                        ? form.full_name.charAt(0).toUpperCase()
                        : "?"}
                    </Text>
                  </View>
                )}

                <View style={styles.photoActionsRow}>
                  <TouchableOpacity
                    style={styles.photoButton}
                    onPress={pickImage}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name="image-outline"
                      size={14}
                      color={colors.primary}
                    />
                    <Text style={styles.photoButtonText}>Gallery</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.photoButton}
                    onPress={takePhoto}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name="camera-outline"
                      size={14}
                      color={colors.primary}
                    />
                    <Text style={styles.photoButtonText}>Camera</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Full Name</Text>

                <TextInput
                  style={styles.input}
                  value={form.full_name}
                  onFocus={closeDropdowns}
                  onChangeText={(value) => handleChange("full_name", value)}
                  placeholder="Full name"
                  placeholderTextColor={colors.borderGray}
                />
              </View>

              <View style={styles.identityInfoCard}>
                <View style={styles.identityInfoRow}>
                  <View style={styles.identityInfoIconBox}>
                    <Ionicons
                      name="at-outline"
                      size={17}
                      color={colors.primary}
                    />
                  </View>

                  <View style={styles.identityInfoText}>
                    <Text style={styles.identityInfoLabel}>Username</Text>
                    <Text style={styles.identityInfoValue}>
                      @{user.username || "traveler"}
                    </Text>
                  </View>
                </View>

                <View style={styles.identityDivider} />

                <View style={styles.identityInfoRow}>
                  <View style={styles.identityInfoIconBox}>
                    <Ionicons
                      name="mail-outline"
                      size={17}
                      color={colors.primary}
                    />
                  </View>

                  <View style={styles.identityInfoText}>
                    <Text style={styles.identityInfoLabel}>Email</Text>
                    <Text style={styles.identityInfoValue} numberOfLines={1}>
                      {user.email || "No email"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Personal Details</Text>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Gender</Text>

                <TouchableOpacity
                  style={styles.selectInput}
                  onPress={() => {
                    setShowGenderOptions(!showGenderOptions);
                    setShowTimezoneOptions(false);
                    setActiveCountryField(null);
                  }}
                  activeOpacity={0.8}
                >
                  <Text
                    style={
                      form.gender
                        ? styles.selectInputText
                        : styles.selectPlaceholderText
                    }
                  >
                    {selectedGenderLabel || "Select gender"}
                  </Text>

                  <Ionicons
                    name="chevron-down"
                    size={18}
                    color={colors.darkGray}
                  />
                </TouchableOpacity>

                {showGenderOptions && (
                  <View style={styles.dropdown}>
                    {GENDERS.map((gender) => (
                      <TouchableOpacity
                        key={gender.value}
                        style={styles.dropdownItem}
                        onPress={() => {
                          handleChange("gender", gender.value);
                          setShowGenderOptions(false);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>
                          {gender.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Date of Birth</Text>

                <TouchableOpacity
                  style={styles.selectInput}
                  onPress={() => {
                    closeDropdowns();
                    setShowDatePicker(true);
                  }}
                  activeOpacity={0.8}
                >
                  <Text
                    style={
                      form.date_of_birth
                        ? styles.selectInputText
                        : styles.selectPlaceholderText
                    }
                  >
                    {form.date_of_birth || "Select date of birth"}
                  </Text>

                  <Ionicons
                    name="calendar-outline"
                    size={18}
                    color={colors.darkGray}
                  />
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    value={
                      form.date_of_birth
                        ? new Date(form.date_of_birth)
                        : new Date(2000, 0, 1)
                    }
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    maximumDate={new Date()}
                    onChange={handleDateChange}
                  />
                )}

                {Platform.OS === "ios" && showDatePicker && (
                  <TouchableOpacity
                    style={styles.doneButton}
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Nationality</Text>

                <TextInput
                  style={styles.input}
                  value={form.nationality}
                  onFocus={() => {
                    setActiveCountryField("nationality");
                    setShowGenderOptions(false);
                    setShowTimezoneOptions(false);
                  }}
                  onChangeText={(value) => {
                    handleChange("nationality", value);
                    setActiveCountryField("nationality");
                  }}
                  placeholder="Start typing nationality"
                  placeholderTextColor={colors.borderGray}
                />

                {activeCountryField === "nationality" && (
                  <View style={styles.dropdown}>
                    {nationalitySuggestions.map((country) => (
                      <TouchableOpacity
                        key={country}
                        style={styles.dropdownItem}
                        onPress={() => {
                          handleChange("nationality", country);
                          setActiveCountryField(null);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{country}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              <View style={styles.fieldGroupLast}>
                <Text style={styles.fieldLabel}>Country of Residence</Text>

                <TextInput
                  style={styles.input}
                  value={form.country_of_residence}
                  onFocus={() => {
                    setActiveCountryField("residence");
                    setShowGenderOptions(false);
                    setShowTimezoneOptions(false);
                  }}
                  onChangeText={(value) => {
                    handleChange("country_of_residence", value);
                    setActiveCountryField("residence");
                  }}
                  placeholder="Start typing country"
                  placeholderTextColor={colors.borderGray}
                />

                {activeCountryField === "residence" && (
                  <View style={styles.dropdown}>
                    {residenceSuggestions.map((country) => (
                      <TouchableOpacity
                        key={country}
                        style={styles.dropdownItem}
                        onPress={() => {
                          handleChange("country_of_residence", country);
                          setActiveCountryField(null);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{country}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Preferences</Text>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Phone Number</Text>

                <TextInput
                  style={styles.input}
                  value={form.phone_number}
                  onFocus={closeDropdowns}
                  onChangeText={(value) => handleChange("phone_number", value)}
                  placeholder="Phone number"
                  placeholderTextColor={colors.borderGray}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.rowGroup}>
                <View style={styles.smallField}>
                  <Text style={styles.fieldLabel}>Language</Text>

                  <TextInput
                    style={styles.input}
                    value={form.preferred_language}
                    onFocus={closeDropdowns}
                    onChangeText={(value) =>
                      handleChange("preferred_language", value)
                    }
                    placeholder="Language"
                    placeholderTextColor={colors.borderGray}
                  />
                </View>

                <View style={styles.fieldSpacer} />

                {/* <View style={styles.smallField}>
                  <Text style={styles.fieldLabel}>Currency</Text>

                  <TextInput
                    style={styles.input}
                    value={form.preferred_currency}
                    onFocus={closeDropdowns}
                    onChangeText={(value) =>
                      handleChange("preferred_currency", value)
                    }
                    placeholder="Currency"
                    placeholderTextColor={colors.borderGray}
                  />
                </View> */}
              </View>

              <View style={styles.fieldGroupLast}>
                <Text style={styles.fieldLabel}>Timezone</Text>

                <TouchableOpacity
                  style={styles.selectInput}
                  onPress={() => {
                    setShowTimezoneOptions(!showTimezoneOptions);
                    setShowGenderOptions(false);
                    setActiveCountryField(null);
                  }}
                  activeOpacity={0.8}
                >
                  <Text
                    style={
                      form.timezone
                        ? styles.selectInputText
                        : styles.selectPlaceholderText
                    }
                  >
                    {selectedTimezoneLabel || "Select timezone"}
                  </Text>

                  <Ionicons
                    name="chevron-down"
                    size={18}
                    color={colors.darkGray}
                  />
                </TouchableOpacity>

                {showTimezoneOptions && (
                  <View style={styles.dropdown}>
                    {TIMEZONES.map((timezone) => (
                      <TouchableOpacity
                        key={timezone.value}
                        style={styles.dropdownItem}
                        onPress={() => {
                          handleChange("timezone", timezone.value);
                          setShowTimezoneOptions(false);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>
                          {timezone.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>

            <TouchableOpacity
              style={[globalStyles.buttonPrimary, styles.saveButton]}
              onPress={handleSave}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={globalStyles.buttonPrimaryText}>Save Changes</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[globalStyles.buttonOutline, styles.cancelButton]}
              onPress={() => navigation.goBack()}
              activeOpacity={0.85}
            >
              <Text style={globalStyles.buttonOutlineText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}