import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
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
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
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

        onLoginSuccess && onLoginSuccess(result);
      } else {
        setErrorMessage('We could not sign you in. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);

      setErrorMessage(
        error.response?.data?.message ||
          'Incorrect email or password. Please check and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const clearErrorAndSetEmail = (value) => {
    if (errorMessage) setErrorMessage('');
    setEmail(value);
  };

  const clearErrorAndSetPassword = (value) => {
    if (errorMessage) setErrorMessage('');
    setPassword(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Email</Text>
        <View
          style={[
            styles.passwordRow,
            emailFocused && styles.inputFocused,
            errorMessage && styles.inputError,
          ]}
        >
          <TextInput
            style={[globalStyles.input, styles.input]}
            placeholder="Enter your email"
            placeholderTextColor={colors.borderGray}
            value={email}
            onChangeText={clearErrorAndSetEmail}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
          <Ionicons
            name="mail-outline"
            size={20}
            color={errorMessage ? '#B42318' : colors.primary}
            style={styles.iconButton}
          />
        </View>
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Password</Text>
        <View
          style={[
            styles.passwordRow,
            passwordFocused && styles.inputFocused,
            errorMessage && styles.inputError,
          ]}
        >
          <TextInput
            style={[globalStyles.input, styles.input]}
            placeholder="Enter your password"
            placeholderTextColor={colors.borderGray}
            value={password}
            onChangeText={clearErrorAndSetPassword}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            secureTextEntry={!showPassword}
            editable={!loading}
          />
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowPassword((value) => !value)}
            disabled={loading}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={errorMessage ? '#B42318' : colors.darkGray}
            />
          </TouchableOpacity>
        </View>
      </View>

      {errorMessage ? (
        <View style={styles.errorBox}>
          <Ionicons name="alert-circle-outline" size={18} color="#B42318" />
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

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

      <TouchableOpacity style={styles.forgotPasswordContainer} disabled={loading}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
}