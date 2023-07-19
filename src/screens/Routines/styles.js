import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../theme";

const generalWidth = 45;

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
      paddingTop: 10,
    },
    searchBox: {
      paddingHorizontal: 20,
      marginVertical: 10,
    },
    horizontalGallery: {
      height: 0,
    },
    horizontalGalleryContent: {},
    routineContainer: {
      flex: 1,
      paddingVertical: 15,
      justifyContent: "center",
      alignItems: "center",
    },
    routines: {
      flex: 1,
      width: Dimensions.get("window").width - 45,
      borderRadius: 5,
    },
  });