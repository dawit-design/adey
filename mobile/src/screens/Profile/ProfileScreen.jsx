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

import globalStyles, { colors } from "../../styles/theme";
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

  const handleSignOut = async () => {
    await clearAuth();
    setAuthToken(null);
    navigation.replace("Landing");
  };

  const handleDeleteAccount = async () => {
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
              navigation.replace("Landing");
            } catch (error) {
              console.error("Delete account failed:", error);
              Alert.alert("Error", error.response?.data?.message || error.message);
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
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Your ADEY travel identity.</Text>

          <View style={styles.headerCard}>
            {user.profile_photo ? (
              <Image source={{ uri: user.profile_photo }} style={styles.profileImage} />
            ) : (
              <View style={styles.profilePlaceholder}>
                <Text style={styles.profilePlaceholderText}>
                  {user.full_name ? user.full_name.charAt(0).toUpperCase() : "?"}
                </Text>
              </View>
            )}

            <View style={styles.headerTextBox}>
              <Text style={styles.fullName}>{user.full_name || "No name set"}</Text>
              <Text style={styles.username}>@{user.username || "traveler"}</Text>
              <Text style={styles.location}>
                {user.country_of_residence || user.nationality || "Explorer"}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.passportCard}
            onPress={() => navigation.navigate("Passport")}
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

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={globalStyles.buttonOutline}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Text style={globalStyles.buttonOutlineText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={globalStyles.buttonPrimary}
              onPress={handleSignOut}
            >
              <Text style={globalStyles.buttonPrimaryText}>Sign Out</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteAccount}
              disabled={loading}
            >
              <Text style={styles.deleteButtonText}>
                {loading ? "Deleting..." : "Delete Account"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}