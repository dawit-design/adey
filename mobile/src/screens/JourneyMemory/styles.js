import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F1E8",
  },

  center: {
    flex: 1,
    backgroundColor: "#F4F1E8",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    color: "#526257",
    fontSize: 13,
    marginTop: 12,
  },

  content: {
    paddingBottom: 42,
  },

  topBar: {
    height: 66,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  topButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#DFE3DB",
  },

  screenTitle: {
    color: "#263F2D",
    fontSize: 16,
    fontWeight: "900",
  },

  heroContainer: {
    height: 410,
    marginHorizontal: 18,
    borderRadius: 26,
    overflow: "hidden",
    position: "relative",
  },

  heroImage: {
    width: "100%",
    height: "100%",
  },

  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15,28,18,0.22)",
  },

  heroText: {
    position: "absolute",
    left: 19,
    right: 19,
    bottom: 22,
  },

  kicker: {
    color: "#F0D594",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 6,
  },

  placeName: {
    color: "#FFFFFF",
    fontSize: 31,
    lineHeight: 35,
    fontWeight: "900",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 7,
  },

  location: {
    color: "#F4F1E8",
    fontSize: 13,
    fontWeight: "600",
  },

  heroStamp: {
    position: "absolute",
    top: 15,
    right: 15,
  },

  noPhotoHero: {
    marginHorizontal: 18,
    minHeight: 240,
    borderRadius: 25,
    backgroundColor: "#DFE5DB",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },

  noPhotoTitle: {
    color: "#263F2D",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 13,
  },

  noPhotoText: {
    color: "#68736B",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 7,
  },

  journeyDetails: {
    marginHorizontal: 18,
    marginTop: 18,
    padding: 19,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E1E3DC",
  },

  dateBlock: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 15,
  },

  dateIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E5EAE1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  detailLabel: {
    color: "#788079",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },

  detailValue: {
    color: "#263F2D",
    fontSize: 13,
    fontWeight: "800",
  },

  memorySection: {
    marginHorizontal: 18,
    marginTop: 16,
    padding: 20,
    borderRadius: 22,
    backgroundColor: "#FFF8E8",
    borderWidth: 1,
    borderColor: "#EAD8B1",
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  sectionTitle: {
    color: "#263F2D",
    fontSize: 18,
    fontWeight: "900",
  },

  memoryText: {
    color: "#4F5B51",
    fontSize: 15,
    lineHeight: 24,
    marginTop: 14,
  },

  photoSection: {
    marginTop: 24,
  },

  photoSectionTitle: {
    paddingHorizontal: 18,
  },

  photoCountText: {
    color: "#68736B",
    fontSize: 12,
    marginHorizontal: 18,
    marginTop: 6,
    marginBottom: 13,
  },

  photoContainer: {
    marginHorizontal: 18,
    marginBottom: 15,
  },

  journeyPhoto: {
    width: "100%",
    height: 360,
    borderRadius: 22,
    backgroundColor: "#DFE5DB",
  },

  photoCaption: {
    color: "#526257",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
    paddingHorizontal: 4,
  },

  destinationButton: {
    minHeight: 55,
    borderRadius: 18,
    marginHorizontal: 18,
    marginTop: 22,
    backgroundColor: "#37533C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 18,
  },

  destinationButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
});