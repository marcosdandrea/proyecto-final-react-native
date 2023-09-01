import { StyleSheet } from "react-native";
import { colors } from "../../theme";

const styles=StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.background.primary,
        rowGap: 10
    },
    workoutMainBody:{
        width: '100%',
        flex: 1,
        padding: 10,
        backgroundColor: colors.background.secondary,
        borderRadius: 5,
        rowGap: 10
    }
})

export default styles