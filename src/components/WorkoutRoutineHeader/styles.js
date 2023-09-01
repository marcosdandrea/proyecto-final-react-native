import { StyleSheet } from "react-native";
import { colors } from "../../theme";
import { Fonts } from "../../../assets/fonts/FontProvider";

export const styles = StyleSheet.create({
    container:{
        posistion: "absolute",
        width: '100%',
        height: 100,
        backgroundColor: colors.background.secondary,
        borderRadius: 5,
        padding: 15,
        justifyContent: "space-between",
        overflow: "hidden",
    },
    header:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    routineTitle:{
        fontSize: 18,
        fontFamily: Fonts.Medium,
        color: colors.foreground.white
    },
    routineTime:{
        fontSize: 16,
        fontFamily: Fonts.Regular,
        color: colors.foreground.white
    },
    footer:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    estimatedTimeLeft:{
        fontSize: 12,
        fontFamily: Fonts.Regular,
        color: colors.foreground.white
    },
    totalExercises:{
        fontSize: 12,
        fontFamily: Fonts.Regular,
        color: colors.foreground.white
    },
    progressBar:{
        position: "absolute",
        height: 8,
        bottom: 0,
        backgroundColor: colors.foreground.secondary
    }
})