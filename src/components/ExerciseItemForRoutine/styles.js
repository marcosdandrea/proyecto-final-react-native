import { StyleSheet } from "react-native";
import { colors } from "../../theme";
import { Fonts } from "../../../assets/fonts/FontProvider";

export default styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    borderRadius: 5,
    backgroundColor: colors.background.secondary,
    padding: 10,
    justifyContent: "center"
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
