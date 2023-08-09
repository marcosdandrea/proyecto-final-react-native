import { StyleSheet } from "react-native";
import { Fonts } from "../../../assets/fonts/FontProvider";

const styles = StyleSheet.create({
    container:{
        width: 200,
        height: 200,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: 15
    },
    profileContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center"
  },
  profilePic:{
    height: "100%",
    width: "100%",
    borderRadius: 220
  },
  changeProfilePictureText:{
    fontFamily: Fonts.Bold,
    color: "blue",
  }
});

export default styles;
