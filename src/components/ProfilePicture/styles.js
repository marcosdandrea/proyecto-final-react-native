import { StyleSheet } from "react-native";
import { Fonts } from "../../../assets/fonts/FontProvider";
import { colors } from "../../theme";

const styles = StyleSheet.create({
    container:{
        width: 200,
        aspectRatio: 0.8,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: 15,
    },
    profileContainer: {
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  profilePic:{
    height: "100%",
    width: "100%",
    borderRadius: 220
  },
  changeProfilePictureText:{
    textAlign: "center",
    fontFamily: Fonts.Bold,
    color: colors.foreground.white,
    textDecorationLine: "underline"
  }
});

export default styles;
