import { StyleSheet } from "react-native";
import { colors, globalStyles } from "../../styles/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },

  hero: {
    backgroundColor: colors.primary,
    paddingTop: 64,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    position: "relative",
  },

  backButton: {
    position: "absolute",
    top: 18,
    left: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  heroContent: {
    marginTop: 4,
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
    maxWidth: 300,
    marginBottom: 6,
  },

  subtitle: {
    color: "#F1F4EA",
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 300,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
  },

  searchInput: {
    ...globalStyles.input,
    backgroundColor: colors.white,
    marginVertical: 0,
    marginBottom: 14,
  },

  filterRow: {
    flexDirection: "row",
    gap: 8,
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