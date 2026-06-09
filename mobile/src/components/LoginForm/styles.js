import { StyleSheet } from 'react-native';
import { colors, globalStyles } from '../../styles/theme';

export default StyleSheet.create({
  container: {
    marginTop: 8,
  },
  inputWrapper: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.darkGray,
    marginBottom: 8,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
  },
  iconButton: {
    marginLeft: 10,
    padding: 10,
  },
  loginButton: {
    ...globalStyles.buttonPrimary,
    marginTop: 24,
    marginBottom: 16,
  },
  loginButtonText: {
    ...globalStyles.buttonPrimaryText,
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
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  errorBox: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FEECEC',
  borderColor: '#F5A3A3',
  borderWidth: 1,
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 12,
  marginBottom: 14,
  gap: 8,
},

errorText: {
  flex: 1,
  fontSize: 13,
  lineHeight: 18,
  color: '#B42318',
  fontWeight: '500',
},
});
