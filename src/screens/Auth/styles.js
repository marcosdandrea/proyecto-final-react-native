import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../theme";
import { Fonts } from "../../../assets/fonts/FontProvider";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background.primary
  },
  mainContainer:{
    width: windowWidth *.8,
    //height: windowHeight *.5,
    marginTop: windowHeight/2 - (windowHeight * .5 /2),
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.background.terciary,
    borderRadius: 5,
    padding: 15,
    paddingVertical: 55,
    zIndex: 2,
    position: "absolute",
    rowGap: 15
  },
  header:{
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  mainTitle:{
    fontSize: 28,
    color: colors.foreground.informative,
    fontFamily: Fonts.Bold
  },
  headerText:{
    fontFamily: Fonts.Light,
    fontSize: 15,
    color: colors.foreground.white,
  },
  body:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 20
  },
  inputField:{
    width: windowWidth *.7,
    height: 50,
    marginBottom: 15,
  },
  footer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    rowGap: 10,
  },
  footerText:{
    color: colors.foreground.informative
  },
  button:{
    backgroundColor: colors.foreground.secondary,
  }
});
