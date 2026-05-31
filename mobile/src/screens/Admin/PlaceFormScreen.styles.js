import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },

  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },

  content: {
    padding: 20,
    paddingBottom: 44,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.borderGray,
    marginRight: 12,
  },

  titleBlock: {
    flex: 1,
  },

  title: {
    fontSize: 27,
    fontWeight: "900",
    color: colors.primary,
  },

  subtitle: {
    fontSize: 14,
    color: colors.darkGray,
    marginTop: 4,
    lineHeight: 20,
  },

  section: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 8,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.primary,
  },

  inputGroup: {
    marginBottom: 13,
  },

  label: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.darkGray,
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: colors.white,
    fontSize: 15,
    color: colors.darkGray,
  },

  textArea: {
    minHeight: 96,
    textAlignVertical: "top",
    lineHeight: 21,
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },

  optionRow: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 4,
  },

  optionChip: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.borderGray,
    backgroundColor: colors.white,
  },

  optionChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  optionChipText: {
    color: colors.darkGray,
    fontWeight: "700",
    fontSize: 12,
    textTransform: "capitalize",
  },

  optionChipTextActive: {
    color: colors.white,
  },

  coverPreview: {
    width: "100%",
    height: 190,
    borderRadius: 18,
    marginBottom: 12,
    backgroundColor: colors.lightGray,
  },

  imagePlaceholder: {
    height: 170,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderGray,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  imagePlaceholderText: {
    marginTop: 8,
    color: colors.darkGray,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    paddingHorizontal: 16,
  },

  imageButtonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  imageButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },

  imageButtonDisabled: {
    opacity: 0.45,
  },

  imageButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "900",
  },

  uploadingBox: {
    backgroundColor: "#F3F6ED",
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },

  uploadingText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
  },

  galleryCountText: {
    color: colors.darkGray,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 12,
  },

  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 18,
    marginTop: 4,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  saveButtonDisabled: {
    opacity: 0.65,
  },

  saveButtonText: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
  },
});