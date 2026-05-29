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
    height: 260,
    backgroundColor: colors.primary,
    justifyContent: "flex-end",
    padding: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
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
    zIndex: 10,
  },

  heroContent: {
    paddingBottom: 8,
  },

  eyebrow: {
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

  subtitle: {
    color: colors.white,
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.95,
  },

  listContent: {
    padding: 20,
    paddingBottom: 120,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  image: {
    width: "100%",
    height: 200,
    backgroundColor: colors.borderGray,
  },

  imageOverlay: {
    position: "absolute",
    top: 14,
    left: 14,
    right: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  categoryPill: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  categoryText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },

  removeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },

  cardContent: {
    padding: 14,
  },

  placeName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 4,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  location: {
    fontSize: 14,
    color: colors.darkGray,
    marginLeft: 5,
  },

  description: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.darkGray,
    marginBottom: 12,
  },

  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footerText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
  },

  emptyCard: {
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  emptyIcon: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
imagePlaceholder: {
  width: "100%",
  height: 200,
  backgroundColor: colors.borderGray,
  alignItems: "center",
  justifyContent: "center",
},
  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 15,
    color: colors.darkGray,
    textAlign: "center",
    lineHeight: 23,
  },
});