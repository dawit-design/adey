import { StyleSheet } from 'react-native';
import { colors, globalStyles } from '../../styles/theme';

export default StyleSheet.create({
  container: {
    marginTop: 8,
  },
  inputWrapper: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.darkGray,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: colors.lightGray,
  },
  registerButton: {
    ...globalStyles.buttonSecondary,
    marginTop: 20,
    marginBottom: 16,
  },
  registerButtonText: {
    ...globalStyles.buttonSecondaryText,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  switchText: {
    fontSize: 14,
    color: colors.darkGray,
  },
  switchLink: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '600',
  },
});
