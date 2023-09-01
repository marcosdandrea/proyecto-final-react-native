import { StyleSheet } from "react-native";
import { colors } from "../../theme";
import { Fonts } from "../../../assets/fonts/FontProvider";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    paddingVertical: 15,
    height: "100%",
  },
  inputFilterContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  text: {
    color: "white",
  },
  exerciseList:{
    height: "100%",
  },
  exerciseListContainer: {
    gap: 5,
    paddingHorizontal: 15,
  },
  exerciseItem: {
    container: {
      height: 75,
      width: "100%",
      backgroundColor: colors.background.secondary,
      borderRadius: 5,
      overflow: "hidden",
    },
    mainBody: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 15,
    },
    textContainer: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      maxWidth: "85%"
    },
    title: {
      color: colors.foreground.white,
    },
    description: {
      color: colors.foreground.informative,
      fontSize: 12,
    },
    decoration: {
      width: "100%",
      height: 3,
      backgroundColor: "green",
    },
  },
});
