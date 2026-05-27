import { StyleSheet, Platform } from 'react-native';
import { colors, globalStyles } from '../../styles/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 50 : 36,
    paddingBottom: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 34,
  },
  logo: {
    width: 130,
    height: 130,
    borderRadius: 28,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  title: {
    ...globalStyles.headingXL,
    color: colors.primary,
    marginBottom: 6,
  },
  subtitle: {
    ...globalStyles.bodyText,
    color: colors.darkGray,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 22,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 5,
  },
});
