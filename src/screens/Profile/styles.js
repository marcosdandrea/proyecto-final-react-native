import { StyleSheet } from "react-native";
import { colors } from "../../theme";

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: colors.background.primary,
        rowGap: 0
    },
    formContainer: {
        width: "100%",
        flex: 1,
        paddingBottom: 25
    },
    formScrollView:{
        paddingHorizontal: 25,
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 25,
        rowGap: 5,
    }
})

export default styles