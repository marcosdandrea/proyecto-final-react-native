import { StyleSheet } from "react-native";
import { colors } from "../../theme";
import { Fonts } from "../../../assets/fonts/FontProvider";

export default styles = StyleSheet.create({
  container: {},
  button: {
    width: 28,
    height: 28,
    backgroundColor: colors.foreground.informative,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 15,
    height: 15,
    tintColor: colors.foreground.black,
  },
  backdrop:{
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: "#00000080",
  },
  floatingMenu: {
    container: {
        position: "absolute",
      width: 100,
      padding: 5,
      backgroundColor: colors.foreground.white,
      borderRadius: 5,
      zIndex: 100,
      backgroundColor: colors.background.primary,
    },
    list:{
        gap: 5
    }
  },
  menuItem:{
    container:{
        flexDirection: "row",
        height: 30,
        padding: 5,
        backgroundColor: colors.background.terciary,
        borderRadius: 5
    },
    text: {
        fontFamily: Fonts.Regular,
        color: colors.foreground.white
    },
    image:{
        tintColor: colors.foreground.informative,
        width: 20,
        height: 20
    }
  }
});
