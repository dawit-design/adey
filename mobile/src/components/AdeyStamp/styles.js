import { StyleSheet } from "react-native";

export default StyleSheet.create({
  stamp: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 3,
    borderColor: "#A9643B",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,248,230,0.88)",
    transform: [{ rotate: "-8deg" }],
  },

  innerCircle: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#A9643B",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  adey: {
    color: "#A9643B",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 2,
    marginTop: 2,
  },

  place: {
    color: "#824A2E",
    fontSize: 8,
    fontWeight: "800",
    textTransform: "uppercase",
    maxWidth: 80,
    marginTop: 2,
  },

  date: {
    color: "#A9643B",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.5,
    marginTop: 3,
  },

  stampSmall: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    padding: 3,
  },

  innerCircleSmall: {
    borderRadius: 25,
    paddingHorizontal: 2,
  },

  adeySmall: {
    fontSize: 10,
    letterSpacing: 1,
    marginTop: 0,
  },

  dateSmall: {
    fontSize: 6,
    marginTop: 1,
  },
});