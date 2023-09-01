import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export const styles = StyleSheet.create({
    modal:{
        display: 'none',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000000cc",
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 100
    },
    mainBody:{
        width: '70%',
        height: 300,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.background.secondary,
        padding: 20,
        borderRadius: 10,
    },
    imageContainer:{
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.foreground.terciary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        tintColor: "white",
    },
    buttonsContainer:{
        width: "100%",
        flexDirection: "row",
        columnGap: 5
    },
    buttons:{
       flex: 1
    }
})