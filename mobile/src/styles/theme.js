import { StyleSheet } from "react-native";

export const colors = {
  primary: "#556B2F", // Olive Green
  primaryDark: "#3F5122",
  primarySoft: "#F1F4EA",

  accent: "#D4AF37", // Gold
  accentSoft: "#F7EFCB",

  white: "#FFFFFF",
  black: "#000000",

  text: "#242424",
  darkGray: "#333333",
  mediumGray: "#6B6B6B",
  lightGray: "#F6F6F2",
  borderGray: "#E3E3DA",

  success: "#4CAF50",
  error: "#F44336",
  warning: "#9A6B00",
};

export const fonts = {
  primary: "System",
  accent: "System",
  bold: "System",
};

export const radius = {
  small: 12,
  medium: 20,
  large: 28,
  pill: 999,
};

export const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
};

export const typography = {
  headingXL: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "800",
  },

  headingLarge: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
  },

  headingMedium: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700",
  },

  headingSmall: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
  },

  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },

  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },

  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 20,
  },

  centerContainer: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  // Typography
  headingXL: {
    ...typography.headingXL,
    color: colors.text,
    marginBottom: 12,
  },

  headingLarge: {
    ...typography.headingLarge,
    color: colors.text,
    marginBottom: 16,
  },

  headingMedium: {
    ...typography.headingMedium,
    color: colors.primary,
    marginBottom: 12,
  },

  headingSmall: {
    ...typography.headingSmall,
    color: colors.text,
    marginBottom: 8,
  },

  bodyText: {
    ...typography.body,
    color: colors.text,
  },

  bodyTextSmall: {
    ...typography.bodySmall,
    color: colors.mediumGray,
  },

  labelText: {
    ...typography.label,
    color: colors.accent,
  },

  accentText: {
    color: colors.accent,
    fontWeight: "700",
  },

  primaryText: {
    color: colors.primary,
  },

  // Buttons
  buttonPrimary: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: radius.medium,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },

  buttonPrimaryText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
  },

  buttonSecondary: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: radius.medium,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },

  buttonSecondaryText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primaryDark,
  },

  buttonOutline: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: radius.medium,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonOutlineText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },

  // Inputs
  input: {
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: radius.medium,
    paddingVertical: 13,
    paddingHorizontal: 16,
    marginVertical: 10,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.white,
  },

  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },

  // Cards
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.medium,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  cardLarge: {
    backgroundColor: colors.white,
    borderRadius: radius.large,
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  // Spacing
  spacingXS: {
    marginVertical: spacing.xs,
  },

  spacingS: {
    marginVertical: spacing.s,
  },

  spacingM: {
    marginVertical: spacing.m,
  },

  spacingL: {
    marginVertical: spacing.l,
  },

  // Flex
  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.borderGray,
    marginVertical: 16,
  },
});

export default globalStyles;