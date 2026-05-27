import { StyleSheet } from 'react-native';
import { colors, globalStyles } from '../../styles/theme';

export default StyleSheet.create({
  container: {
    ...globalStyles.container,
    backgroundColor: colors.lightGray,
    paddingTop: 32,
  },
  heroCard: {
    ...globalStyles.card,
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  header: {
    ...globalStyles.headingLarge,
    color: colors.primary,
  },
  body: {
    ...globalStyles.bodyText,
  },
});
