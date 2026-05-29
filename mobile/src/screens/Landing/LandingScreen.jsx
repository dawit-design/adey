import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import styles from "./styles";

export default function LandingScreen({ navigation }) {
  const [mode, setMode] = useState("login");

  const handleLoginSuccess = () => {
    navigation.replace("Main");
  };

  const handleRegisterSuccess = () => {
    setMode("login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoid}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.brandSection}>
            <Image
              source={require("../../assets/main-logo1.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.supportText}>
              Curated travel stories and destinations across Ethiopia.
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>
              {mode === "login" ? "Welcome back" : "Create your account"}
            </Text>

            <Text style={styles.formSubtitle}>
              {mode === "login"
                ? "Sign in to continue exploring."
                : "Join Adey and start your journey."}
            </Text>

            {mode === "login" ? (
              <LoginForm
                onSwitchToRegister={() => setMode("register")}
                onLoginSuccess={handleLoginSuccess}
              />
            ) : (
              <RegisterForm
                onSwitchToLogin={() => setMode("login")}
                onRegisterSuccess={handleRegisterSuccess}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}