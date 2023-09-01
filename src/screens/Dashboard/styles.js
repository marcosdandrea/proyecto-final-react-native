import { StyleSheet } from "react-native";
import colors from "../../theme/colors";
import { Fonts } from "../../../assets/fonts/FontProvider";

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background.primary,
        padding: 20
    },
    text:{
        color: colors.foreground.white,
        marginBottom: 20
    },
    flatlist:{
        width: "100%",
        height: "100%",
    },
    contentContainerStyle:{
        gap: 8
    },
    item:{
        container:{
            width: "100%",
            height: 80,
            backgroundColor: colors.background.terciary,
            borderRadius: 5,
            padding: 5,
            paddingHorizontal: 15
        },
        routineName:{
            color: colors.foreground.white,
            fontSize: 17,
            fontFamily: Fonts.Medium
        },
        info:{
            color: colors.foreground.white,
            fontFamily: Fonts.Light,
            fontSize: 13,
        }
    }
})

export default styles