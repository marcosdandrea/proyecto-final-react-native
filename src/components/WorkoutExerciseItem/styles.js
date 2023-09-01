import { Dimensions, StyleSheet } from "react-native";
import colors from "../../theme/colors";
import { Fonts } from "../../../assets/fonts/FontProvider";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: colors.foreground.terciary,
    width: Dimensions.get("window").width - 60,
    height: 80,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  exerciseName: {
    color: colors.foreground.white,
    fontSize: 20,
    fontFamily: Fonts.Bold,
  },
  groupName: {
    color: colors.foreground.white,
    fontSize: 16,
    fontFamily: Fonts.Regular,
  },
  buttonsBar: {
    position: "absolute",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    right: 10,
    justifyContent: "space-evenly",
  },
});
