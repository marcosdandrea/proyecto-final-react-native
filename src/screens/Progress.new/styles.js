import { StyleSheet } from "react-native";
import { colors } from "../../theme";
import { Fonts } from "../../../assets/fonts/FontProvider";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
  header:{
    position: "relative",
  },
  goBack:{
    position: "absolute",
    left: 0,
    zIndex: 100,
    top: 5
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    rowGap: 15,
    padding: 20,
  },
  title: {
    color: colors.foreground.white,
    fontSize: 25,
    fontFamily: Fonts.Medium,
    backgroundColor: colors.background.secondary,
    width: "100%",
    textAlign: "center",
    borderRadius: 5,
    padding: 5,
    lineHeight: 40,
  },
  date: {
    color: colors.foreground.white,
    textAlign: "center",
    margin: 0,
    fontSize: 18,
    fontFamily: Fonts.Medium,
    textTransform: "uppercase",
  },
  progressData: {
    flexDirection: "row",
  },
  progressLabel: {
    color: colors.foreground.white,
    textAlign: "center",
    margin: 0,
    fontSize: 15,
    marginBottom: 10,
  },
  progressValue: {
    color: colors.foreground.white,
    textAlign: "center",
    margin: 0,
    fontSize: 15,
    marginBottom: 10,
    fontFamily: Fonts.Bold,
  },
  text: {
    color: colors.foreground.white,
    textAlign: "center",
    margin: 0,
    fontSize: 13,
    fontStyle: "italic",
    marginBottom: 10,
  },
  inputText: {
    textAlign: "center",
  },
  picturesContainer: {
    width: "100%",
    aspectRatio: 1.74,
    position: "relative",
    columnGap: 5,
    flexDirection: "row",
    overflow: "hidden",
  },
  pictureContainerIndividual:{
    height: "100%",
    aspectRatio: 0.5625,
  },
  picture: {
    backgroundColor: "white",
    height: "100%",
    aspectRatio: 0.5625,
    borderRadius: 5,
  },
  button: {
    marginTop: 15,
    backgroundColor: colors.foreground.secondary,
  },
});
