import { StyleSheet } from "react-native";
import { colors, globalStyles } from "../../styles/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  listContent: {
    paddingBottom: 28,
  },

  label: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.accent,
    textTransform: "uppercase",
    marginBottom: 8,
  },

  title: {
    ...globalStyles.headingLarge,
    color: colors.primary,
    marginBottom: 8,
  },

  subtitle: {
    ...globalStyles.bodyText,
    color: colors.darkGray,
    marginBottom: 16,
  },

  metaBox: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  metaText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
    textTransform: "capitalize",
  },

  description: {
    ...globalStyles.bodyText,
    color: colors.darkGray,
    marginBottom: 24,
  },

  sectionTitle: {
    ...globalStyles.headingSmall,
    color: colors.darkGray,
    marginBottom: 10,
  },

  placeCard: {
    ...globalStyles.card,
    flexDirection: "row",
    marginVertical: 8,
  },

  placeNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    color: colors.white,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 32,
    marginRight: 12,
  },

  placeContent: {
    flex: 1,
  },

  placeType: {
    fontSize: 11,
    textTransform: "uppercase",
    color: colors.accent,
    fontWeight: "800",
    marginBottom: 4,
  },

  placeName: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 4,
  },

  placeLocation: {
    fontSize: 13,
    color: colors.darkGray,
    marginBottom: 6,
  },

  placeDescription: {
    ...globalStyles.bodyTextSmall,
    color: colors.darkGray,
  },
  backButton: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 20,
},

backText: {
  marginLeft: 6,
  fontSize: 15,
  fontWeight: "700",
  color: colors.primary,
},
});