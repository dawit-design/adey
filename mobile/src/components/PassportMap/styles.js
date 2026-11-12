import { StyleSheet } from "react-native";

export default StyleSheet.create({
  section: {
    paddingTop: 25,
    paddingBottom: 9,
  },

  headingRow: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    color: "#263F2D",
    fontSize: 19,
    fontWeight: "900",
  },

  subtitle: {
    color: "#68736B",
    fontSize: 12,
    marginTop: 3,
  },

  mapCount: {
    minWidth: 43,
    height: 31,
    borderRadius: 16,
    paddingHorizontal: 9,
    backgroundColor: "#DFE5DB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  mapCountText: {
    color: "#263F2D",
    fontSize: 12,
    fontWeight: "900",
  },

  legend: {
    marginHorizontal: 20,
    marginTop: 13,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  legendPin: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  visitedLegend: {
    backgroundColor: "#D9AD54",
    borderWidth: 1,
    borderColor: "#263F2D",
  },

  wishlistLegend: {
    backgroundColor: "#37533C",
    borderWidth: 2,
    borderColor: "#F4F1E8",
  },

  legendText: {
    color: "#526257",
    fontSize: 10,
    fontWeight: "700",
  },

  mapContainer: {
    height: 355,
    marginHorizontal: 18,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#DDE5DA",
    borderWidth: 1,
    borderColor: "#D3D9D1",
    position: "relative",
  },

  map: {
    flex: 1,
  },

  marker: {
    width: 35,
    height: 35,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.22,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  visitedMarker: {
    backgroundColor: "#D9AD54",
    borderColor: "#FFFFFF",
  },

  wishlistMarker: {
    backgroundColor: "#37533C",
    borderColor: "#FFFFFF",
  },

  emptyOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(244,241,232,0.91)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 38,
  },

  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#DFE5DB",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    color: "#263F2D",
    fontSize: 17,
    fontWeight: "900",
    marginTop: 12,
  },

  emptyText: {
    color: "#68736B",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 6,
  },

  previewCard: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    minHeight: 78,
    borderRadius: 17,
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.96)",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  previewImage: {
    width: 61,
    height: 61,
    borderRadius: 12,
  },

  previewImagePlaceholder: {
    width: 61,
    height: 61,
    borderRadius: 12,
    backgroundColor: "#E3E8E0",
    alignItems: "center",
    justifyContent: "center",
  },

  previewContent: {
    flex: 1,
    marginHorizontal: 10,
  },

  previewStatus: {
    color: "#A56E28",
    fontSize: 9,
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 3,
  },

  previewName: {
    color: "#263F2D",
    fontSize: 14,
    fontWeight: "900",
  },

  previewLocation: {
    color: "#68736B",
    fontSize: 10,
    marginTop: 3,
  },

  previewButton: {
    width: 37,
    height: 37,
    borderRadius: 19,
    backgroundColor: "#37533C",
    alignItems: "center",
    justifyContent: "center",
  },

  coordinateNote: {
    color: "#7A817B",
    fontSize: 10,
    lineHeight: 15,
    marginHorizontal: 21,
    marginTop: 8,
  },
});