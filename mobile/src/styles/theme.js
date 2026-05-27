import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#556B2F', // Olive Green
  accent: '#D4AF37', // Golden
  white: '#FFFFFF',
  black: '#000000',
  darkGray: '#333333',
  lightGray: '#F5F5F5',
  borderGray: '#E0E0E0',
  success: '#4CAF50',
  error: '#F44336',
};

export const fonts = {
  primary: 'System', // Fallback
  accent: 'AbyssinicaSIL', // Ethiopian font (needs to be installed)
  bold: 'System',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  
  centerContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Typography
  headingXL: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.darkGray,
    textAlign: 'center',
    marginBottom: 12,
  },

  headingLarge: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.darkGray,
    marginBottom: 16,
  },

  headingMedium: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 12,
  },

  headingSmall: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.darkGray,
    marginBottom: 8,
  },

  bodyText: {
    fontSize: 16,
    color: colors.darkGray,
    lineHeight: 24,
  },

  bodyTextSmall: {
    fontSize: 14,
    color: colors.darkGray,
    lineHeight: 20,
  },

  accentText: {
    color: colors.accent,
    fontWeight: '600',
  },

  primaryText: {
    color: colors.primary,
  },

  // Buttons
  buttonPrimary: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },

  buttonPrimaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },

  buttonSecondary: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },

  buttonSecondaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.accent,
  },

  buttonOutline: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonOutlineText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },

  // Inputs
  input: {
    borderWidth: 1.5,
    borderColor: colors.borderGray,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 10,
    fontSize: 16,
    color: colors.darkGray,
    backgroundColor: colors.lightGray,
  },

  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },

  // Cards
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Spacing
  spacingXS: {
    marginVertical: 4,
  },

  spacingS: {
    marginVertical: 8,
  },

  spacingM: {
    marginVertical: 16,
  },

  spacingL: {
    marginVertical: 24,
  },

  // Flex
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.borderGray,
    marginVertical: 16,
  },
});

export default globalStyles;
