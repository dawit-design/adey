import { StyleSheet } from "react-native";
import { colors, globalStyles } from "../../styles/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 20,
    paddingTop: 48,
  },

  center: {
    flex: 1,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },

  kicker: {
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
    ...globalStyles.bodyTextSmall,
    color: colors.darkGray,
    marginBottom: 18,
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },

  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  statNumber: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.primary,
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.darkGray,
  },

  tabRow: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 5,
    marginBottom: 14,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 14,
    alignItems: "center",
  },

  tabButtonActive: {
    backgroundColor: colors.primary,
  },

  tabText: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.darkGray,
  },

  tabTextActive: {
    color: colors.white,
  },

  listContent: {
    paddingBottom: 28,
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
    color: colors.darkGray,
  },

  emptyText: {
    textAlign: "center",
    color: colors.darkGray,
    marginTop: 36,
  },
  backButton: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 18,
},

backText: {
  marginLeft: 6,
  fontSize: 15,
  fontWeight: "700",
  color: colors.primary,
},
});