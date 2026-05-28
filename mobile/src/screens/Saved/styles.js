import { StyleSheet } from "react-native";
import { colors, globalStyles } from "../../styles/theme";

export default StyleSheet.create({
  container: {
    ...globalStyles.container,
    backgroundColor: colors.lightGray,
    paddingTop: 28,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    ...globalStyles.headingLarge,
    color: colors.primary,
    marginBottom: 20,
  },

  listContent: {
    paddingBottom: 120,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 16,
  },

  image: {
    width: "100%",
    height: 200,
  },

  content: {
    padding: 14,
  },

  placeName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 4,
  },

  location: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.dark,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    ...globalStyles.bodyText,
    color: colors.gray,
  },
});