import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import styles from './styles';

export default function LandingScreen({ navigation }) {
  const [mode, setMode] = useState('login');

  const handleLoginSuccess = (result) => {
    navigation.replace('Main');
  };

  const handleRegisterSuccess = () => {
    setMode('login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoid}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/sixith_version.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.welcomeSection}>
            <Text style={styles.title}>Adey Travels</Text>
            <Text style={styles.subtitle}>Explore Ethiopia like never before</Text>
          </View>

          <View style={styles.formContainer}>
            {mode === 'login' ? (
              <LoginForm
                onSwitchToRegister={() => setMode('register')}
                onLoginSuccess={handleLoginSuccess}
              />
            ) : (
              <RegisterForm
                onSwitchToLogin={() => setMode('login')}
                onRegisterSuccess={handleRegisterSuccess}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
