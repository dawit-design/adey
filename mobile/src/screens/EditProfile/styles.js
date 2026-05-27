import { StyleSheet } from 'react-native';
import { colors, globalStyles } from '../../styles/theme';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },

  keyboardAvoid: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },

  photoSection: {
    width: 96,
    alignItems: 'center',
    marginRight: 14,
  },

  profileImage: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: '#E8E8E8',
  },

  profilePlaceholder: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profilePlaceholderText: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '700',
  },

  photoButton: {
    width: '100%',
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    paddingVertical: 7,
    marginTop: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  photoButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },

  nameSection: {
    flex: 1,
  },

  fieldGroup: {
    marginBottom: 16,
  },

  rowGroup: {
    flexDirection: 'row',
  },

  smallField: {
    flex: 1,
    marginBottom: 16,
  },

  fieldSpacer: {
    width: 12,
  },

  fieldLabel: {
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 8,
    fontWeight: '600',
  },

  input: {
    ...globalStyles.input,
    borderRadius: 14,
  },

  selectInput: {
    ...globalStyles.input,
    borderRadius: 14,
    justifyContent: 'center',
  },

  selectInputText: {
    color: colors.black || '#111',
  },

  selectPlaceholderText: {
    color: colors.borderGray,
  },

  disabledInput: {
    backgroundColor: '#F4F4F4',
    color: colors.darkGray,
  },

  dropdown: {
    backgroundColor: colors.white,
    borderRadius: 14,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },

  dropdownItemText: {
    fontSize: 14,
    color: colors.darkGray,
  },

  doneButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },

  doneButtonText: {
    color: colors.white,
    fontWeight: '700',
  },

  saveButton: {
    marginTop: 26,
  },

  cancelButton: {
    marginTop: 12,
  },
});