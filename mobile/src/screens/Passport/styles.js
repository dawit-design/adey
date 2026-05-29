import { StyleSheet } from "react-native";
import { colors, globalStyles } from "../../styles/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },

  center: {
    flex: 1,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
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

  kicker: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.accent,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },

  title: {
    color: colors.white,
    fontSize: 31,
    fontWeight: "900",
    lineHeight: 36,
    maxWidth: 300,
    marginBottom: 8,
  },

  subtitle: {
    color: "#F1F4EA",
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 310,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
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
});