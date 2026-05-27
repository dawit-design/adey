import { StyleSheet } from 'react-native';
import { colors, globalStyles } from '../../styles/theme';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingTop: 24,
    paddingBottom: 36,
  },

  container: {
    paddingHorizontal: 20,
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGray,
  },

  title: {
    ...globalStyles.headingLarge,
    color: colors.primary,
    marginBottom: 6,
  },

  subtitle: {
    ...globalStyles.bodyText,
    color: colors.darkGray,
    marginBottom: 20,
  },

  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },

  profileImage: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#E8E8E8',
  },

  profilePlaceholder: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profilePlaceholderText: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '700',
  },

  headerTextBox: {
    flex: 1,
    marginLeft: 16,
  },

  fullName: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },

  username: {
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 6,
  },

  location: {
    fontSize: 14,
    color: colors.darkGray,
  },

  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },

  sectionTitle: {
    ...globalStyles.headingSmall,
    color: colors.primary,
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  infoLabel: {
    flex: 1,
    fontSize: 14,
    color: colors.darkGray,
    fontWeight: '600',
  },

  infoValue: {
    flex: 1.4,
    fontSize: 14,
    color: colors.primary,
    textAlign: 'right',
  },

  buttonGroup: {
    marginTop: 8,
  },

  deleteButton: {
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    backgroundColor: colors.white,
  },

  deleteButtonText: {
    color: colors.error,
    fontWeight: '700',
    fontSize: 16,
  },
});