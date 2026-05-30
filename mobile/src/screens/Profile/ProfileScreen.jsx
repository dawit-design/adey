import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../styles/theme";
import styles from "./styles";
import {
  getCurrentUser,
  deleteAccount,
  setAuthToken,
} from "../../services/userService";
import { clearAuth } from "../../utils/tokenStorage";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const loadUser = async () => {
        try {
          const result = await getCurrentUser();
          if (active) setUser(result);
        } catch (error) {
          console.log("Profile load failed:", error);
        }
      };

      loadUser();

      return () => {
        active = false;
      };
    }, [])
  );

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleSignOut = async () => {
    await clearAuth();
    setAuthToken(null);

    navigation.reset({
      index: 0,
      routes: [{ name: "Landing" }],
    });
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await deleteAccount();
              await clearAuth();
              setAuthToken(null);

              navigation.reset({
                index: 0,
                routes: [{ name: "Landing" }],
              });
            } catch (error) {
              console.log("Delete account failed:", error);

              Alert.alert(
                "Delete Failed",
                error.response?.data?.message ||
                  "Unable to delete your account. Please try again."
              );
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
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
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Ionicons name="arrow-back" size={19} color={colors.primary} />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Your ADEY travel identity.</Text>

          <View style={styles.headerCard}>
            <TouchableOpacity
              style={styles.editIconButton}
              onPress={() => navigation.navigate("EditProfile")}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Ionicons name="pencil-outline" size={18} color={colors.primary} />
            </TouchableOpacity>

            {user.profile_photo ? (
              <Image
                source={{ uri: user.profile_photo }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profilePlaceholder}>
                <Text style={styles.profilePlaceholderText}>
                  {user.full_name
                    ? user.full_name.charAt(0).toUpperCase()
                    : "?"}
                </Text>
              </View>
            )}

            <View style={styles.headerTextBox}>
              <Text style={styles.fullName}>
                {user.full_name || "No name set"}
              </Text>

              <View style={styles.profileMetaRow}>
                <Ionicons name="at-outline" size={15} color={colors.darkGray} />
                <Text style={styles.profileMetaText}>
                  {user.username || "traveler"}
                </Text>
              </View>

              <View style={styles.profileMetaRow}>
                <Ionicons
                  name="location-outline"
                  size={15}
                  color={colors.darkGray}
                />
                <Text style={styles.profileMetaText}>
                  {user.country_of_residence ||
                    user.nationality ||
                    "Explorer"}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.passportCard}
            onPress={() => navigation.navigate("Passport")}
            activeOpacity={0.85}
          >
            <View style={styles.passportIconBox}>
              <Ionicons name="ribbon-outline" size={24} color={colors.white} />
            </View>

            <View style={styles.passportTextBox}>
              <Text style={styles.passportTitle}>Ethiopia Passport</Text>
              <Text style={styles.passportSubtitle}>
                Track places you’ve visited and places you want to explore.
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={22} color={colors.white} />
          </TouchableOpacity>

          <View style={styles.accountCard}>
            <Text style={styles.accountTitle}>Account</Text>

            <TouchableOpacity
              style={styles.accountRow}
              onPress={handleSignOut}
              disabled={loading}
              activeOpacity={0.75}
            >
              <View style={styles.accountRowLeft}>
                <View style={styles.accountIconBox}>
                  <Ionicons
                    name="log-out-outline"
                    size={20}
                    color={colors.primary}
                  />
                </View>

                <Text style={styles.accountRowText}>Sign Out</Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={19}
                color={colors.darkGray}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.accountRow, styles.lastAccountRow]}
              onPress={handleDeleteAccount}
              disabled={loading}
              activeOpacity={0.75}
            >
              <View style={styles.accountRowLeft}>
                <View style={styles.deleteIconBox}>
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color={colors.error}
                  />
                </View>

                {loading ? (
                  <ActivityIndicator size="small" color={colors.error} />
                ) : (
                  <Text style={styles.deleteRowText}>Delete Account</Text>
                )}
              </View>

              <Ionicons
                name="chevron-forward"
                size={19}
                color={colors.error}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}