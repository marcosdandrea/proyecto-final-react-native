import { StyleSheet } from "react-native";
import { colors } from "../../theme";
import { Fonts } from "../../../assets/fonts/FontProvider";


export const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: 80,
        backgroundColor: colors.background.secondary,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15
    },
    date:{
        color: "white",
        fontStyle: "italic",
    },
    weight:{
        color: "white",
        fontFamily: Fonts.Bold,
        fontSize: 17
    }
})