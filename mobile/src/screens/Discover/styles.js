import { StyleSheet } from "react-native";
import { colors, globalStyles } from "../../styles/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 20,
    paddingTop: 56,
  },

  title: {
    ...globalStyles.headingLarge,
    color: colors.primary,
    marginBottom: 4,
  },

  subtitle: {
    ...globalStyles.bodyTextSmall,
    color: colors.darkGray,
    marginBottom: 18,
  },

  searchInput: {
    ...globalStyles.input,
    backgroundColor: colors.white,
    marginVertical: 0,
    marginBottom: 14,
  },

  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
    paddingBottom: 20,
  },

  filterChip: {
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 20,
  backgroundColor: colors.white,
  borderWidth: 1,
  borderColor: colors.borderGray,
  minHeight: 36,
  justifyContent: "center",
  alignItems: "center",
},

  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

 filterText: {
  fontSize: 13,
  color: "#333333",
  textTransform: "capitalize",
  fontWeight: "600",
},

  filterTextActive: {
    color: colors.white,
  },

  listContent: {
    paddingBottom: 24,
  },

  placeCard: {
    ...globalStyles.card,
    marginVertical: 8,
  },

  placeType: {
    fontSize: 12,
    textTransform: "uppercase",
    color: colors.accent,
    fontWeight: "800",
    marginBottom: 6,
  },

  placeName: {
    fontSize: 18,
    fontWeight: "800",
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
  },

  emptyText: {
    textAlign: "center",
    color: colors.darkGray,
    marginTop: 40,
  },
  activeExperienceBox: {
  backgroundColor: "#F1F4EA",
  borderRadius: 14,
  padding: 12,
  marginTop: 12,
  marginBottom: 12,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

activeExperienceText: {
  color: colors.primary,
  fontWeight: "700",
},

clearExperienceText: {
  color: colors.accent,
  fontWeight: "700",
},
});