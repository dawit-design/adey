import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightGray,
  },

  hero: {
    height: 340,
    backgroundColor: colors.primary,
    justifyContent: "flex-end",
    padding: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: "hidden",
  },

  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },

  heroDarkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.36)",
  },

  heroOverlay: {
    paddingBottom: 8,
    zIndex: 2,
  },

  backButton: {
    position: "absolute",
    top: 54,
    left: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.38)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  },

  saveButton: {
    position: "absolute",
    top: 54,
    right: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.38)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  },

  type: {
    alignSelf: "flex-start",
    textTransform: "uppercase",
    color: colors.primary,
    backgroundColor: colors.accent,
    fontSize: 12,
    fontWeight: "800",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },

  title: {
    color: colors.white,
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 40,
    marginBottom: 10,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  location: {
    color: colors.white,
    fontSize: 15,
    marginLeft: 6,
    opacity: 0.95,
  },

  content: {
    padding: 20,
  },

  shortDescription: {
    fontSize: 18,
    lineHeight: 28,
    color: colors.darkGray,
    fontWeight: "500",
    marginBottom: 18,
  },

  gallerySection: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  galleryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  galleryTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.primary,
  },

  galleryCount: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.darkGray,
    opacity: 0.75,
  },

  galleryRow: {
    flexDirection: "row",
    gap: 10,
  },

  galleryImage: {
    width: 160,
    height: 118,
    borderRadius: 16,
    backgroundColor: colors.lightGray,
  },

  galleryImageLarge: {
    width: 220,
  },

  storyCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  storyLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.accent,
    textTransform: "uppercase",
    marginBottom: 8,
  },

  storyText: {
    fontSize: 17,
    lineHeight: 27,
    color: colors.darkGray,
    fontWeight: "500",
  },

  scoreCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
  },

  scoreHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  scoreLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#E8EEDB",
    textTransform: "uppercase",
  },

  scoreNumber: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.white,
  },

  scoreReason: {
    fontSize: 14,
    lineHeight: 21,
    color: "#F4F4F4",
  },

  insightGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 18,
  },

  insightChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderGray,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 18,
  },

  insightText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
    textTransform: "capitalize",
  },

  passportActions: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },

  passportButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  passportButtonActive: {
    backgroundColor: colors.primary,
  },

  passportButtonText: {
    color: colors.primary,
    fontWeight: "800",
    fontSize: 13,
  },

  passportButtonTextActive: {
    color: colors.white,
  },

  addTripButton: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginBottom: 18,
  },

  addTripButtonActive: {
    backgroundColor: "#E8EEDB",
    borderWidth: 1,
    borderColor: colors.primary,
  },

  addTripButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },

  addTripButtonTextActive: {
    color: colors.primary,
  },

  metaRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 10,
  },

  metaCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  metaCardFull: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  metaLabel: {
    fontSize: 12,
    color: colors.darkGray,
    marginTop: 8,
    opacity: 0.7,
  },

  metaValue: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
    marginTop: 3,
    textTransform: "capitalize",
  },

  mapActionCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderGray,
    marginBottom: 14,
  },

  mapActionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 14,
  },

  mapActionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 3,
  },

  mapActionSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.darkGray,
    opacity: 0.75,
  },

  mapButtonRow: {
    flexDirection: "row",
    gap: 10,
  },

  mapSecondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },

  mapPrimaryButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },

  mapSecondaryButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "800",
  },

  mapPrimaryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "800",
  },

  section: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 18,
    marginTop: 14,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 10,
  },

  bullet: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.darkGray,
    marginBottom: 4,
  },

  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  chip: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },

  chipText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "600",
  },

  softChip: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  softChipText: {
    color: colors.darkGray,
    fontSize: 13,
    fontWeight: "600",
    textTransform: "capitalize",
  },

  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  tipText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    lineHeight: 22,
    color: colors.darkGray,
  },

  warningRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  warningText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    lineHeight: 22,
    color: colors.darkGray,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  tripModal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    maxHeight: "75%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.primary,
  },

  tripOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },

  tripOptionActive: {
    backgroundColor: "#F3F6ED",
    borderRadius: 14,
    paddingHorizontal: 10,
  },

  tripOptionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.primary,
  },

  tripOptionMeta: {
    fontSize: 13,
    color: colors.darkGray,
    marginTop: 3,
  },

  emptyTripText: {
    fontSize: 15,
    color: colors.darkGray,
    lineHeight: 22,
    marginBottom: 14,
  },

  createTripBox: {
    marginTop: 18,
    backgroundColor: colors.lightGray,
    borderRadius: 18,
    padding: 16,
  },

  createTripLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 10,
  },

  tripInput: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderGray,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 12,
  },

  createTripButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: "center",
  },

  createTripButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "800",
  },
    imageModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.92)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  fullscreenImage: {
    width: "100%",
    height: "82%",
    borderRadius: 18,
  },

  closeImageButton: {
    position: "absolute",
    top: 54,
    right: 24,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
});