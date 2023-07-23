import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background.secondary,
      paddingHorizontal: 20,
      rowGap: 10,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    label: {
      fontFamily: "Poppins-Regular",
      color: colors.foreground.informative,
    },
    dropdown: {
      button: {
        backgroundColor: colors.background.terciary,
        height: 40,
        width: "100%",
      },
      text: {
        fontFamily: "Poppins-Regular",
        color: colors.foreground.white,
      },
      list: {
        backgroundColor: colors.background.primary,
      },
      text: {
        color: colors.foreground.white,
        fontFamily: "Poppins-Regular",
      },
    },
    selectorContainer: {
      paddingBottom: 15,
    },
    saveButton:{
      height: 40,
      width: "100%",
      backgroundColor: colors.foreground.secondary,
      justifyContent: "center",
      alignItems: "center"
    }
  });