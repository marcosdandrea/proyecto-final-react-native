import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export  const styles = StyleSheet.create({
      container: {
        backgroundColor: colors.foreground.black,
        padding: 5,
        paddingTop: 15,
        flexDirection: "column",
        alignItems: "center",
        height: 75,
        width: 400,
        position: "relative"
      },

      textsContainer: {
        borderLeftColor: colors.background.secondary,
        borderLeftWidth: 2,
        paddingLeft: 10,
        marginLeft: 5,
        flexDirection: "column",
        flex: 1,
      },
      item:{
        height: 75,
        borderRadius: 5,
        overflow: "hidden"
      },
    });