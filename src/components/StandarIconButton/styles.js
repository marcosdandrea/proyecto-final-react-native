import { StyleSheet } from "react-native";
import { colors } from "../../theme";
import { Fonts } from "../../../assets/fonts/FontProvider";

export default styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 40,
        borderRadius: 5,
        backgroundColor: colors.foreground.black,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        columnGap: 5,
    },
    icon: {
        tintColor: colors.foreground.white,
        height: 20,
        width: 20
    },
    text:{
        fontFamily: Fonts.Regular,
        fontSize: 15,
        color: colors.foreground.white
    }
})