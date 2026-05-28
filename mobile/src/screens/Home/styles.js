import { StyleSheet } from "react-native";
import { colors, globalStyles } from "../../styles/theme";

export default StyleSheet.create({
  container: {
    ...globalStyles.container,
    backgroundColor: colors.lightGray,
    paddingTop: 32,
    justifyContent: "flex-start",
  },
heartButton: {
  position: "absolute",
  top: 14,
  right: 14,
  zIndex: 10,
  backgroundColor: "#fff",
  width: 38,
  height: 38,
  borderRadius: 19,
  justifyContent: "center",
  alignItems: "center",
},
  heroCard: {
    ...globalStyles.card,
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
  },

  header: {
    ...globalStyles.headingLarge,
    color: colors.primary,
  },

  body: {
    ...globalStyles.bodyText,
  },

  sectionHeader: {
    ...globalStyles.rowSpaceBetween,
    marginTop: 20,
    marginBottom: 8,
  },

  sectionTitle: {
    ...globalStyles.headingSmall,
    color: colors.darkGray,
  },

  seeAll: {
    color: colors.primary,
    fontWeight: "600",
  },

  listContent: {
    paddingBottom: 16,
  },

  placeCard: {
    ...globalStyles.card,
    marginVertical: 8,
  },

  placeType: {
    fontSize: 12,
    textTransform: "uppercase",
    color: colors.accent,
    fontWeight: "700",
    marginBottom: 6,
  },

  placeName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 4,
  },

  placeLocation: {
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 8,
  },

  placeDescription: {
    ...globalStyles.bodyTextSmall,
    color: colors.darkGray,
  },
  kicker: {
  fontSize: 13,
  fontWeight: "700",
  color: colors.accent,
  textTransform: "uppercase",
  marginBottom: 8,
},

experienceList: {
  paddingVertical: 8,
  paddingRight: 16,
},

experienceCard: {
  width: 190,
  backgroundColor: colors.white,
  borderRadius: 18,
  padding: 16,
  marginRight: 12,
  borderWidth: 1,
  borderColor: "#E5E5E5",
},

experienceIcon: {
  width: 42,
  height: 42,
  borderRadius: 21,
  backgroundColor: "#F1F4EA",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 12,
},

experienceTitle: {
  fontSize: 16,
  fontWeight: "700",
  color: colors.primary,
  marginBottom: 6,
},

experienceSubtitle: {
  fontSize: 13,
  color: colors.darkGray,
  lineHeight: 18,
},
collectionList: {
  paddingVertical: 8,
  paddingRight: 16,
},

collectionCard: {
  width: 240,
  backgroundColor: colors.primary,
  borderRadius: 20,
  padding: 18,
  marginRight: 14,
},

collectionLabel: {
  fontSize: 11,
  fontWeight: "800",
  textTransform: "uppercase",
  color: "#E8EEDB",
  marginBottom: 10,
},

collectionTitle: {
  fontSize: 18,
  fontWeight: "800",
  color: colors.white,
  marginBottom: 8,
},

collectionSubtitle: {
  fontSize: 13,
  color: "#F4F4F4",
  lineHeight: 18,
  marginBottom: 14,
},

collectionMeta: {
  fontSize: 12,
  fontWeight: "700",
  color: "#E8EEDB",
},
});