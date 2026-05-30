import { StyleSheet } from "react-native";
import { colors, globalStyles } from "../../styles/theme";

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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightGray,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingTop: 18,
    paddingBottom: 36,
  },

  container: {
    paddingHorizontal: 20,
  },

  backButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    marginBottom: 18,
  },

  backButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "800",
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

  identityCard: {
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },

  identityPhotoSection: {
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },

  profileImage: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#E8E8E8",
  },

  profilePlaceholder: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  profilePlaceholderText: {
    color: colors.white,
    fontSize: 34,
    fontWeight: "700",
  },

  photoActionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },

  photoButton: {
    backgroundColor: colors.white,
    borderRadius: 18,
    paddingVertical: 9,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    flexDirection: "row",
    gap: 5,
  },

  photoButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.primary,
  },

  identityInfoCard: {
    backgroundColor: colors.lightGray,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    overflow: "hidden",
  },

  identityInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 13,
  },

  identityInfoIconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  identityInfoText: {
    flex: 1,
  },

  identityInfoLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.darkGray,
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },

  identityInfoValue: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },

  identityDivider: {
    height: 1,
    backgroundColor: "#E6E6E6",
    marginLeft: 60,
  },

  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 16,
  },

  fieldGroup: {
    marginBottom: 16,
  },

  fieldGroupLast: {
    marginBottom: 0,
  },

  rowGroup: {
    flexDirection: "row",
  },

  smallField: {
    flex: 1,
  },

  fieldSpacer: {
    width: 12,
  },

  fieldLabel: {
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 8,
    fontWeight: "600",
  },

  input: {
    ...globalStyles.input,
    borderRadius: 14,
  },

  selectInput: {
    ...globalStyles.input,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  selectInputText: {
    color: colors.black || "#111",
    flex: 1,
  },

  selectPlaceholderText: {
    color: colors.borderGray,
    flex: 1,
  },

  dropdown: {
    backgroundColor: colors.white,
    borderRadius: 14,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },

  dropdownItemText: {
    fontSize: 14,
    color: colors.darkGray,
  },

  doneButton: {
    alignSelf: "flex-end",
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },

  doneButtonText: {
    color: colors.white,
    fontWeight: "700",
  },

  saveButton: {
    marginTop: 8,
  },

  cancelButton: {
    marginTop: 12,
  },
});