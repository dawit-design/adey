import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F1E8",
  },

  center: {
    flex: 1,
    backgroundColor: "#F4F1E8",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    color: "#526257",
    fontSize: 13,
    marginTop: 12,
  },

  listContent: {
    paddingBottom: 40,
  },

  hero: {
    backgroundColor: "#263F2D",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },

  shareButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },

  passportLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 9,
  },

  passportLabel: {
    color: "#D9AD54",
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1.3,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 31,
    lineHeight: 36,
    fontWeight: "900",
    marginBottom: 8,
  },

  heroSubtitle: {
    color: "#DCE4DD",
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 325,
  },

  levelRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  levelBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  levelText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  progressText: {
    color: "#D9AD54",
    fontSize: 12,
    fontWeight: "800",
  },

  progressTrack: {
    height: 7,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 10,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#D9AD54",
    borderRadius: 4,
  },

  heroStats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.13)",
  },

  heroStat: {
    flex: 1,
    alignItems: "center",
  },

  heroStatNumber: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "900",
    marginBottom: 3,
  },

  heroStatLabel: {
    color: "#C9D4CB",
    fontSize: 11,
    fontWeight: "700",
  },

  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: "rgba(255,255,255,0.14)",
  },

  addJourneyButton: {
    minHeight: 52,
    borderRadius: 17,
    marginTop: 18,
    backgroundColor: "#F0D594",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  addJourneyButtonText: {
    color: "#263F2D",
    fontSize: 14,
    fontWeight: "900",
  },

  highlightsSection: {
    paddingTop: 25,
    paddingBottom: 12,
  },

  sectionHeadingRow: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionHeading: {
    color: "#263F2D",
    fontSize: 19,
    fontWeight: "900",
  },

  sectionSubheading: {
    color: "#68736B",
    fontSize: 12,
    marginTop: 3,
  },

  highlightsContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 4,
    gap: 13,
  },

  highlightItem: {
    width: 72,
    alignItems: "center",
  },

  highlightImageBorder: {
    width: 67,
    height: 67,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: "#C28B2C",
    padding: 3,
    backgroundColor: "#FFFFFF",
  },

  highlightImage: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },

  highlightPlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    backgroundColor: "#E1E7DD",
    alignItems: "center",
    justifyContent: "center",
  },

  addHighlight: {
    width: 67,
    height: 67,
    borderRadius: 34,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#839086",
    backgroundColor: "#E8ECE4",
    alignItems: "center",
    justifyContent: "center",
  },

  highlightName: {
    color: "#38483C",
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 7,
    width: 70,
  },

  gallerySection: {
    paddingTop: 17,
    paddingBottom: 14,
  },

  collectionCount: {
    minWidth: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: "#DFE5DB",
    alignItems: "center",
    justifyContent: "center",
  },

  collectionCountText: {
    color: "#263F2D",
    fontSize: 13,
    fontWeight: "900",
  },

  tabRow: {
    marginHorizontal: 20,
    marginTop: 16,
    flexDirection: "row",
    backgroundColor: "#E4E7DF",
    borderRadius: 17,
    padding: 5,
  },

  tabButton: {
    flex: 1,
    minHeight: 43,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  tabButtonActive: {
    backgroundColor: "#37533C",
  },

  tabText: {
    color: "#526257",
    fontSize: 12,
    fontWeight: "800",
  },

  tabTextActive: {
    color: "#FFFFFF",
  },

  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  memoryCard: {
    width: "48.3%",
    height: 235,
    borderRadius: 19,
    overflow: "hidden",
    backgroundColor: "#DDE3D9",
    marginBottom: 13,
    position: "relative",
  },

  memoryImage: {
    width: "100%",
    height: "100%",
  },

  memoryPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#DCE4D9",
    alignItems: "center",
    justifyContent: "center",
  },

  memoryOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(13,27,17,0.16)",
  },

  cardStatus: {
    position: "absolute",
    top: 10,
    left: 10,
    minHeight: 27,
    borderRadius: 14,
    paddingHorizontal: 9,
    backgroundColor: "rgba(27,48,32,0.76)",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  cardStatusText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },

  photoCount: {
    position: "absolute",
    top: 10,
    right: 10,
    minWidth: 29,
    height: 27,
    borderRadius: 14,
    paddingHorizontal: 7,
    backgroundColor: "rgba(27,48,32,0.76)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  photoCountText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },

  memoryCardContent: {
    position: "absolute",
    left: 13,
    right: 13,
    bottom: 13,
  },

  memoryPlaceName: {
    color: "#FFFFFF",
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "900",
    textShadowColor: "rgba(0,0,0,0.45)",
    textShadowRadius: 5,
    textShadowOffset: {
      width: 0,
      height: 1,
    },
  },

  memoryMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 5,
  },

  memoryLocation: {
    color: "#F0F4ED",
    fontSize: 10,
    flex: 1,
    fontWeight: "600",
  },

  memoryDate: {
    color: "#F0D594",
    fontSize: 10,
    fontWeight: "800",
    marginTop: 5,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 38,
    paddingVertical: 48,
  },

  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#E1E7DD",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    color: "#263F2D",
    fontSize: 19,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 8,
  },

  emptyText: {
    color: "#68736B",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },

  emptyButton: {
    minHeight: 46,
    borderRadius: 23,
    paddingHorizontal: 21,
    marginTop: 19,
    backgroundColor: "#37533C",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },
  identityRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 13,
},

identityText: {
  flex: 1,
},

passportAvatar: {
  width: 62,
  height: 62,
  borderRadius: 31,
  marginRight: 14,
  borderWidth: 3,
  borderColor: "#D9AD54",
  backgroundColor: "#E1E7DD",
},

passportAvatarFallback: {
  width: 62,
  height: 62,
  borderRadius: 31,
  marginRight: 14,
  backgroundColor: "#F0D594",
  borderWidth: 3,
  borderColor: "#D9AD54",
  alignItems: "center",
  justifyContent: "center",
},

passportAvatarInitials: {
  color: "#263F2D",
  fontSize: 20,
  fontWeight: "900",
},
});