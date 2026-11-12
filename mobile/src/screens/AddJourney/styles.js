import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },

  keyboardView: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 42,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 22,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  titleBlock: {
    flex: 1,
  },

  kicker: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },

  title: {
    color: colors.primary,
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "900",
    marginBottom: 6,
  },

  subtitle: {
    color: colors.darkGray,
    fontSize: 14,
    lineHeight: 20,
  },

  statusCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderGray,
    marginBottom: 14,
  },

  statusRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },

  statusButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.borderGray,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 7,
    backgroundColor: colors.white,
  },

  statusButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  statusText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
  },

  statusTextActive: {
    color: colors.white,
  },

  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 17,
    borderWidth: 1,
    borderColor: colors.borderGray,
    marginBottom: 14,
  },

  sectionTitle: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: "900",
  },

  sectionDescription: {
    color: colors.darkGray,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  searchContainer: {
    height: 52,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.borderGray,
    paddingHorizontal: 14,
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGray,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    marginHorizontal: 10,
    color: colors.primary,
    fontSize: 14,
  },

  searchLoader: {
    marginTop: 16,
  },

  resultsContainer: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: 15,
    overflow: "hidden",
  },

  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
    backgroundColor: colors.white,
  },

  resultIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  resultText: {
    flex: 1,
  },

  resultName: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 3,
  },

  resultLocation: {
    color: colors.darkGray,
    fontSize: 12,
  },

  selectedPlaceCard: {
    marginTop: 14,
    borderRadius: 16,
    backgroundColor: colors.lightGray,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  selectedPlaceImage: {
    width: 68,
    height: 68,
    borderRadius: 13,
    marginRight: 12,
  },

  selectedPlacePlaceholder: {
    width: 68,
    height: 68,
    borderRadius: 13,
    marginRight: 12,
    backgroundColor: "#E5E9E3",
    alignItems: "center",
    justifyContent: "center",
  },

  selectedPlaceInfo: {
    flex: 1,
  },

  selectedPlaceLabel: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 3,
  },

  selectedPlaceName: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 3,
  },

  selectedPlaceLocation: {
    color: colors.darkGray,
    fontSize: 12,
  },

  dateButton: {
    height: 52,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.borderGray,
    marginTop: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  dateText: {
    flex: 1,
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 10,
  },

  photoPicker: {
    marginTop: 14,
    minHeight: 154,
    borderRadius: 17,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: colors.accent,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },

  photoPickerIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  photoPickerTitle: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 4,
  },

  photoPickerSubtitle: {
    color: colors.darkGray,
    fontSize: 12,
  },

  coverPreviewContainer: {
    position: "relative",
    marginTop: 14,
  },

  coverPreview: {
    width: "100%",
    height: 220,
    borderRadius: 17,
  },

  removeCoverButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(0,0,0,0.65)",
    alignItems: "center",
    justifyContent: "center",
  },

  changeCoverButton: {
    position: "absolute",
    left: 10,
    bottom: 10,
    backgroundColor: "rgba(0,0,0,0.68)",
    borderRadius: 18,
    paddingHorizontal: 13,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  changeCoverText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "800",
  },

  photoCounter: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: "900",
  },

  galleryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
  },

  galleryImageContainer: {
    width: "30.8%",
    aspectRatio: 1,
    position: "relative",
  },

  galleryImage: {
    width: "100%",
    height: "100%",
    borderRadius: 13,
  },

  removeGalleryButton: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "rgba(0,0,0,0.67)",
    alignItems: "center",
    justifyContent: "center",
  },

  addGalleryButton: {
    width: "30.8%",
    aspectRatio: 1,
    borderRadius: 13,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: colors.accent,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },

  addGalleryText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "800",
    marginTop: 3,
  },

  memoryInput: {
    minHeight: 130,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.borderGray,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginTop: 14,
    color: colors.primary,
    fontSize: 14,
    lineHeight: 21,
  },

  characterCount: {
    alignSelf: "flex-end",
    color: colors.darkGray,
    fontSize: 11,
    marginTop: 6,
  },

  privacyRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  privacyText: {
    flex: 1,
    paddingRight: 14,
  },

  saveButton: {
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    paddingHorizontal: 20,
    marginTop: 4,
  },

  saveButtonDisabled: {
    opacity: 0.65,
  },

  saveButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "900",
  },

  footerNote: {
    color: colors.darkGray,
    textAlign: "center",
    fontSize: 11,
    marginTop: 12,
  },
});