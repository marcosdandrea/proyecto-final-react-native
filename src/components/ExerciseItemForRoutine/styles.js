import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../theme";
import { Fonts } from "../../../assets/fonts/FontProvider";

export default styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 45,
    height: 60,
    borderRadius: 5,
    backgroundColor: colors.background.secondary,
    padding: 10,
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  bodyContainer: {
    flex: 1
  },
  gripContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  dragIndicator: {
    width: 20,
    height: 20,
    tintColor: colors.foreground.informative
  },
  setContainer: {
    flexDirection: "row",
    width: "100%",
    columnGap: 5
  },
  exerciseName:{
    color: colors.foreground.white,
    fontSize: 15,
    fontFamily: Fonts.Medium
  },
  text: {
    color: colors.foreground.white,
    fontFamily: Fonts.Light
  },
});
