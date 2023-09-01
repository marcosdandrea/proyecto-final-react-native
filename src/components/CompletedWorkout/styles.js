import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background.primary
    },
    mainBody:{
        width: '70%',
        height: 300,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.background.secondary,
        padding: 10,
        borderRadius: 10,
    },
    imageContainer:{
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.foreground.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        tintColor: "white",
    }
})
