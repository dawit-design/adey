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
import { login, setAuthToken } from '../../services/userService';
import { saveToken, saveUser } from '../../utils/tokenStorage';

export default function LoginForm({ onSwitchToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const result = await login({ email, password });

      if (result.token) {
        await saveToken(result.token);
        setAuthToken(result.token);

        if (result.user) {
          await saveUser(result.user);
        }

        Alert.alert('Success', 'Login successful!');
        onLoginSuccess && onLoginSuccess(result);
      } else {
        Alert.alert('Error', 'No token received from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.passwordRow}>
          <TextInput
            style={[globalStyles.input, styles.input]}
            placeholder="Enter your email"
            placeholderTextColor={colors.borderGray}
            value={email}
            onChangeText={setEmail}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            keyboardType="email-address"
            autoCapitalize="none"
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
            placeholder="Enter your password"
            placeholderTextColor={colors.borderGray}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
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

      <TouchableOpacity
        style={[styles.loginButton, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        activeOpacity={0.8}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.loginButtonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Don't have an account? </Text>
        <TouchableOpacity onPress={onSwitchToRegister} disabled={loading}>
          <Text style={styles.switchLink}>Create one</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
}
