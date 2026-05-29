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
    height: 310,
    backgroundColor: colors.primary,
    justifyContent: "flex-end",
    padding: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  heroOverlay: {
    paddingBottom: 8,
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

  body: {
    fontSize: 16,
    lineHeight: 25,
    color: colors.darkGray,
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
  saveButton: {
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

metaCardFull: {
  flex: 1,
  backgroundColor: colors.white,
  borderRadius: 18,
  padding: 16,
  borderWidth: 1,
  borderColor: colors.borderGray,
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
});