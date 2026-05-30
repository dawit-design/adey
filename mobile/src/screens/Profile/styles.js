import { StyleSheet } from "react-native";
import { colors, globalStyles } from "../../styles/theme";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingTop: 18,
    paddingBottom: 36,
  },

  container: {
    paddingHorizontal: 20,
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightGray,
  },

  backButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    marginBottom: 18,
  },

  backButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "800",
  },

  title: {
    ...globalStyles.headingLarge,
    color: colors.primary,
    marginBottom: 6,
  },

  subtitle: {
    ...globalStyles.bodyText,
    color: colors.darkGray,
    marginBottom: 20,
  },

  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    position: "relative",
  },

  editIconButton: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  profileImage: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#E8E8E8",
  },

  profilePlaceholder: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  profilePlaceholderText: {
    color: colors.white,
    fontSize: 34,
    fontWeight: "700",
  },

  headerTextBox: {
    flex: 1,
    marginLeft: 16,
    paddingRight: 40,
  },

  fullName: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 8,
  },

  profileMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  profileMetaText: {
    fontSize: 14,
    color: colors.darkGray,
    marginLeft: 6,
    fontWeight: "500",
  },

  passportCard: {
    backgroundColor: colors.primary,
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  passportIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  passportTextBox: {
    flex: 1,
  },

  passportTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.white,
    marginBottom: 4,
  },

  passportSubtitle: {
    fontSize: 13,
    color: "#F4F4F4",
    lineHeight: 18,
  },

  accountCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    overflow: "hidden",
  },

  accountTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 10,
  },

  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },

  lastAccountRow: {
    borderBottomWidth: 0,
  },

  accountRowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  accountIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  deleteIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFF1F1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  accountRowText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
  },

  deleteRowText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.error,
  },
});