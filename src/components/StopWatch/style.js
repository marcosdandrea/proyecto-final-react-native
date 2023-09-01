import { StyleSheet } from "react-native";
import { colors } from "../../theme";
import { Fonts } from "../../../assets/fonts/FontProvider";

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: 300,
        backgroundColor: colors.background.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
        rowGap: 15,
        borderRadius: 5
    },
    timer:{
        fontSize: 80,
        fontFamily: Fonts.LCD,
        color: colors.foreground.informative,
        backgroundColor: colors.background.secondary,
        width: '100%',
        textAlign: 'center',
        lineHeight: 120
    },
    buttonsContainer:{
        width: '100%',
        flexDirection: "row",
        columnGap: 15
    },
    button:{
        flex: 1
    }
});