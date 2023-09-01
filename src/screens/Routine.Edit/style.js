import { StyleSheet } from "react-native";
import { colors } from "../../theme";
import { Fonts } from "../../../assets/fonts/FontProvider";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000000aa"    
    },
    modal: {
        position: 'relative',
        width: "80%",
        //height: "30%",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 10,
        backgroundColor: colors.background.secondary,
        zIndex: -1
      },
      modalHeader: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15
      },
      modalTitle:{
        fontSize: 16,
        color: colors.foreground.white,
      },
      iconButtonStyle: {
        backgroundColor: colors.background.secondary,
      },
      mainContainer:{
        width: "100%",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        rowGap: 15
      },
      routineNameInput: { 

        width: "100%",
      },
      warningBox:{
        width: "100%",
        rowGap: 15,
        marginBottom: 15,
        padding: 10
      },
      warningText:{
        textAlign: "center",
        color: colors.foreground.primary,
        fontFamily: Fonts.Bold,
        marginBottom: 15
      }
})