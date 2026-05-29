import { StyleSheet } from "react-native";
import { colors, globalStyles } from "../../styles/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingTop: 24,
  },

  heroCard: {
    marginHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 28,
    padding: 24,
    minHeight: 190,
    justifyContent: "flex-end",
  },

  kicker: {
    fontSize: 12,
    fontWeight: "800",
    color: "#E8EEDB",
    textTransform: "uppercase",
    marginBottom: 10,
    letterSpacing: 0.6,
  },

  header: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
    color: colors.white,
    marginBottom: 12,
  },

  body: {
    fontSize: 15,
    lineHeight: 22,
    color: "#F4F4F4",
  },

  sectionHeader: {
    ...globalStyles.rowSpaceBetween,
    marginTop: 26,
    marginBottom: 10,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "900",
    color: colors.primary,
  },

  seeAll: {
    color: colors.primary,
    fontWeight: "800",
  },

  experienceList: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 8,
  },

  experienceCard: {
    width: 200,
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 18,
    marginRight: 14,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  experienceIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#F1F4EA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  experienceTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: colors.primary,
    marginBottom: 6,
  },

  experienceSubtitle: {
    fontSize: 13,
    color: colors.darkGray,
    lineHeight: 19,
  },

  collectionList: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 8,
  },

  collectionCard: {
    width: 260,
    minHeight: 170,
    backgroundColor: colors.primary,
    borderRadius: 26,
    padding: 20,
    marginRight: 14,
    justifyContent: "space-between",
  },

  collectionLabel: {
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "#E8EEDB",
    marginBottom: 12,
    letterSpacing: 0.5,
  },

  collectionTitle: {
    fontSize: 21,
    lineHeight: 25,
    fontWeight: "900",
    color: colors.white,
    marginBottom: 8,
  },

  collectionSubtitle: {
    fontSize: 13,
    color: "#F4F4F4",
    lineHeight: 19,
    marginBottom: 16,
  },

  collectionMeta: {
    fontSize: 12,
    fontWeight: "800",
    color: "#E8EEDB",
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },

  placeCard: {
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 18,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.borderGray,
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

  placeType: {
    fontSize: 11,
    textTransform: "uppercase",
    color: colors.accent,
    fontWeight: "900",
    marginBottom: 7,
    letterSpacing: 0.5,
  },

  placeName: {
    fontSize: 19,
    fontWeight: "900",
    color: colors.primary,
    marginBottom: 5,
    paddingRight: 44,
  },

  placeLocation: {
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 8,
    fontWeight: "600",
  },

  placeDescription: {
    ...globalStyles.bodyTextSmall,
    color: colors.darkGray,
    lineHeight: 20,
  },
});