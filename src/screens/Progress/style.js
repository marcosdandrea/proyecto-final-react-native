import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export const style = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: 15,
        backgroundColor: colors.background.primary,
        paddingBottom: 25
    },
    flatlist:{
        width: '100%',
    },
    standarIcon:{
        backgroundColor: colors.foreground.secondary,
        width: "78%"
    },
    flatlistContainer:{
        gap: 7,
    },
    text:{
        color: colors.foreground.white,
        textAlign: 'center',
        marginBottom: 15,
        paddingHorizontal: 45
    }
})