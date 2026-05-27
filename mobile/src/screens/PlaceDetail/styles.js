import { StyleSheet } from 'react-native';
import { colors, globalStyles } from '../../styles/theme';

export default StyleSheet.create({
  container: {
    ...globalStyles.container,
    backgroundColor: colors.lightGray,
    paddingTop: 28,
    paddingBottom: 24,
  },
  title: {
    ...globalStyles.headingLarge,
    color: colors.primary,
  },
  body: {
    ...globalStyles.bodyText,
    marginTop: 10,
  },
});
