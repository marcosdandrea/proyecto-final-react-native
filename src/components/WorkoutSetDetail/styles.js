import { StyleSheet } from "react-native";
import { colors } from "../../theme";
import { Fonts } from "../../../assets/fonts/FontProvider";

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        aspectRatio: 1,
        borderRadius: 5,
    },
    setTitle:{
        width: '100%',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: colors.background.terciary
    },
    title:{
        fontSize: 18,
        color: colors.foreground.white,
        fontFamily: Fonts.Bold,
        textTransform: "uppercase",
    },
    setNavigationButton:{
        backgroundColor: "transparent",
        position: "absolute",
    }
});