import { StyleSheet } from "react-native";
import { colors, globalStyles } from "../../styles/theme";

export default StyleSheet.create({
  container: {
    ...globalStyles.container,
    backgroundColor: colors.lightGray,
    paddingTop: 32,
    justifyContent: "flex-start",
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
});