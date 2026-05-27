import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../styles/theme';
import styles from './styles';
import { register } from '../../services/userService';
import { saveUser } from '../../utils/tokenStorage';

export default function RegisterForm({ onSwitchToLogin, onRegisterSuccess }) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      const result = await register({
        full_name: fullName,
        username,
        email,
        password,
      });

      if (result.user || result._id) {
        await saveUser(result.user || result);
        Alert.alert('Success', 'Account created! Please log in with your credentials.');
        onSwitchToLogin && onSwitchToLogin();
      } else {
        Alert.alert('Error', 'Registration completed but no user data returned');
      }
    } catch (error) {
      console.error('Register error:', error);
      Alert.alert('Registration Failed', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={[globalStyles.input, styles.input]}
          placeholder="Enter your full name"
          placeholderTextColor={colors.borderGray}
          value={fullName}
          onChangeText={setFullName}
          editable={!loading}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={[globalStyles.input, styles.input]}
          placeholder="Enter a username"
          placeholderTextColor={colors.borderGray}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          editable={!loading}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.passwordRow}>
          <TextInput
            style={[globalStyles.input, styles.input]}
            placeholder="Enter your email"
            placeholderTextColor={colors.borderGray}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
          />
          <Ionicons name="mail-outline" size={20} color={colors.primary} style={styles.iconButton} />
        </View>
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordRow}>
          <TextInput
            style={[globalStyles.input, styles.input]}
            placeholder="Enter a password (min 8 characters)"
            placeholderTextColor={colors.borderGray}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            editable={!loading}
          />
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowPassword((value) => !value)}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={colors.darkGray}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordRow}>
          <TextInput
            style={[globalStyles.input, styles.input]}
            placeholder="Confirm your password"
            placeholderTextColor={colors.borderGray}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            editable={!loading}
          />
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowConfirmPassword((value) => !value)}
          >
            <Ionicons
              name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={colors.darkGray}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.registerButton, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        activeOpacity={0.8}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.registerButtonText}>Create Account</Text>
        )}
      </TouchableOpacity>

      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Already have an account? </Text>
        <TouchableOpacity onPress={onSwitchToLogin} disabled={loading}>
          <Text style={styles.switchLink}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
