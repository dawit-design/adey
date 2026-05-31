import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },

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

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.borderGray,
    marginRight: 12,
  },

  titleBlock: {
    flex: 1,
  },

  title: {
    fontSize: 27,
    fontWeight: "900",
    color: colors.primary,
  },

  subtitle: {
    fontSize: 14,
    color: colors.darkGray,
    marginTop: 4,
    lineHeight: 20,
  },

  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 18,
  },

  addButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "900",
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  placeName: {
    flex: 1,
    fontSize: 17,
    fontWeight: "900",
    color: colors.primary,
    lineHeight: 23,
  },

  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "#E8EEDB",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "900",
    color: colors.primary,
    textTransform: "uppercase",
  },

  metaText: {
    fontSize: 14,
    color: colors.darkGray,
    marginTop: 6,
    lineHeight: 20,
  },

  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },

  chip: {
    backgroundColor: colors.lightGray,
    borderWidth: 1,
    borderColor: colors.borderGray,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  chipText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.darkGray,
    textTransform: "capitalize",
  },

  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },

  editButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#FFF1F1",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
    borderWidth: 1,
    borderColor: "#FFD2D2",
  },

  editButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900",
  },

  deleteButtonText: {
    color: colors.error,
    fontSize: 14,
    fontWeight: "900",
  },

  emptyCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.borderGray,
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.primary,
    marginTop: 10,
  },

  emptyText: {
    fontSize: 14,
    color: colors.darkGray,
    textAlign: "center",
    lineHeight: 21,
    marginTop: 6,
  },
});