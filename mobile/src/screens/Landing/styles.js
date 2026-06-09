import { StyleSheet, Platform } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },

  scrollContainer: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 22,
    paddingTop: Platform.OS === "ios" ? 56 : 42,
    paddingBottom: 28,
    justifyContent: "center",
  },

  brandSection: {
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    width: 220,
    height: 220,
    marginBottom: 10,
  },

  supportText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.mediumGray || colors.darkGray,
    textAlign: "center",
    paddingHorizontal: 18,
    maxWidth: 320,
  },

  formContainer: {
    backgroundColor: colors.white,
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  formTitle: {
  fontSize: 24,
  lineHeight: 30,
  fontWeight: "900",
  color: colors.primary,
  marginBottom: 4,
  textAlign: "center",
},

formSubtitle: {
  fontSize: 14,
  lineHeight: 20,
  color: colors.mediumGray || colors.darkGray,
  marginBottom: 14,
  textAlign: "center",
},
});