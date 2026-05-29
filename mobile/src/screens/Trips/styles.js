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

  header: {
  paddingTop: 64,
  paddingHorizontal: 20,
  paddingBottom: 24,
  backgroundColor: colors.primary,
  borderBottomLeftRadius: 28,
  borderBottomRightRadius: 28,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  position: "relative",
},

mainBackButton: {
  position: "absolute",
  top: 18,
  left: 20,
  zIndex: 10,
  flexDirection: "row",
  alignItems: "center",
  gap: 5,
  backgroundColor: "rgba(255,255,255,0.18)",
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 20,
},

mainBackText: {
  fontSize: 14,
  color: colors.white,
  fontWeight: "800",
},

  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 8,
  },

  title: {
    color: colors.white,
    fontSize: 31,
    fontWeight: "900",
    lineHeight: 36,
    maxWidth: 270,
  },

  subtitle: {
    color: "#F1F4EA",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    maxWidth: 280,
  },

  headerButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyCard: {
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  emptyIcon: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 15,
    color: colors.darkGray,
    textAlign: "center",
    lineHeight: 23,
    marginBottom: 18,
  },

  emptyButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
  },

  emptyButtonText: {
    color: colors.white,
    fontWeight: "800",
    fontSize: 14,
  },

  tripList: {
    padding: 20,
    gap: 14,
  },

  tripCard: {
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  tripCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  tripBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  tripBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "capitalize",
  },

  tripTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.primary,
    marginBottom: 6,
  },

  tripDescription: {
    fontSize: 14,
    color: colors.darkGray,
    lineHeight: 21,
    marginBottom: 14,
  },

  tripMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  tripMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  tripMetaText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "800",
  },

  tripPlacesPreview: {
    marginTop: 12,
    fontSize: 13,
    color: colors.darkGray,
    fontWeight: "600",
  },

  detailHero: {
    height: 280,
    backgroundColor: colors.primary,
    justifyContent: "flex-end",
    padding: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  backButton: {
    position: "absolute",
    top: 54,
    left: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },

  deleteButton: {
    position: "absolute",
    top: 54,
    right: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },

  detailHeroContent: {
    paddingBottom: 8,
  },

  detailEyebrow: {
    alignSelf: "flex-start",
    color: colors.primary,
    backgroundColor: colors.accent,
    fontSize: 12,
    fontWeight: "900",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },

  detailTitle: {
    color: colors.white,
    fontSize: 34,
    fontWeight: "900",
    lineHeight: 40,
    marginBottom: 10,
  },

  detailMetaRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  detailMetaText: {
    color: colors.white,
    fontSize: 15,
    marginLeft: 6,
    opacity: 0.95,
    fontWeight: "700",
  },

  detailContent: {
    padding: 20,
  },

  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.borderGray,
    marginBottom: 18,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.primary,
    marginBottom: 8,
  },

  summaryText: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.darkGray,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "900",
    color: colors.primary,
  },

  sectionCount: {
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: 13,
    fontWeight: "900",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },

  placeCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.borderGray,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  placeIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  placeInfo: {
    flex: 1,
  },

  placeName: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.primary,
    marginBottom: 3,
  },

  placeLocation: {
    fontSize: 13,
    color: colors.darkGray,
    fontWeight: "600",
  },

  removePlaceButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F7EAEA",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyPlacesCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.borderGray,
    alignItems: "center",
  },

  emptyPlacesTitle: {
    fontSize: 19,
    fontWeight: "900",
    color: colors.primary,
    marginTop: 10,
    marginBottom: 6,
  },

  emptyPlacesText: {
    fontSize: 14,
    color: colors.darkGray,
    textAlign: "center",
    lineHeight: 21,
  },

  bottomSpace: {
    height: 40,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  createModal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.primary,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 8,
  },

  input: {
    backgroundColor: colors.lightGray,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderGray,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    marginBottom: 14,
  },

  createButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
  },

  createButtonDisabled: {
    opacity: 0.5,
  },

  createButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "900",
  },
});