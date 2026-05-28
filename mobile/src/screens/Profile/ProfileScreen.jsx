import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import globalStyles, { colors } from '../../styles/theme';
import styles from './styles';
import {
  getCurrentUser,
  deleteAccount,
  setAuthToken,
} from '../../services/userService';
import { clearAuth } from '../../utils/tokenStorage';

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
          console.log('Profile load failed:', error);
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
    navigation.replace('Landing');
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await deleteAccount();
              await clearAuth();
              setAuthToken(null);
              navigation.replace('Landing');
            } catch (error) {
              console.error('Delete account failed:', error);
              Alert.alert('Error', error.response?.data?.message || error.message);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const formatGender = (gender) => {
    if (!gender) return 'Not set';
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  const formatDate = (date) => {
    if (!date) return 'Not set';
    return String(date).split('T')[0];
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
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>
            View and manage your personal travel profile.
          </Text>

          <View style={styles.headerCard}>
            {user.profile_photo ? (
              <Image
                source={{ uri: user.profile_photo }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profilePlaceholder}>
                <Text style={styles.profilePlaceholderText}>
                  {user.full_name ? user.full_name.charAt(0).toUpperCase() : '?'}
                </Text>
              </View>
            )}

            <View style={styles.headerTextBox}>
              <Text style={styles.fullName}>{user.full_name || 'No name set'}</Text>
              <Text style={styles.username}>@{user.username || 'username'}</Text>
              <Text style={styles.location}>
                {user.country_of_residence || 'Country not set'}
              </Text>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Account Information</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user.email || 'Not set'}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{user.phone_number || 'Not set'}</Text>
            </View>

            {/* <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email Verified</Text>
              <Text style={styles.infoValue}>
                {user.is_email_verified ? 'Yes' : 'No'}
              </Text>
            </View> */}
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Personal Details</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Gender</Text>
              <Text style={styles.infoValue}>{formatGender(user.gender)}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date of Birth</Text>
              <Text style={styles.infoValue}>{formatDate(user.date_of_birth)}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nationality</Text>
              <Text style={styles.infoValue}>{user.nationality || 'Not set'}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Residence</Text>
              <Text style={styles.infoValue}>
                {user.country_of_residence || 'Not set'}
              </Text>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Language</Text>
              <Text style={styles.infoValue}>
                {user.preferred_language || 'Not set'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Timezone</Text>
              <Text style={styles.infoValue}>{user.timezone || 'Not set'}</Text>
            </View>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={globalStyles.buttonOutline}
              onPress={() => navigation.navigate('EditProfile')}
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
                {loading ? 'Deleting...' : 'Delete Account'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}