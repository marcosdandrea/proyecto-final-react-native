import { Dimensions, StyleSheet } from "react-native";
import { Fonts } from "../../../assets/fonts/FontProvider";
import { colors } from "../../theme";

export default styles = StyleSheet.create({
    container: {
      height: 80,
      width: Dimensions.get("window").width - 45,
      backgroundColor: colors.foreground.terciary,
      borderRadius: 5,
      marginRight: 15,
      padding: 10,
      flexDirection: "column",
      justifyContent: "center",
    },
    nameContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    name: {
      fontFamily: Fonts.Medium,
      fontSize: 20,
      color: colors.foreground.white,
      paddingLeft: 15,
    },
    excerciseCount: {
      fontSize: 12,
      fontFamily: Fonts.Light,
      color: colors.foreground.white,
      paddingLeft: 15,
      textTransform: "uppercase",
    },
  });