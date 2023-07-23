import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export  const styles = StyleSheet.create({
      container: {
        backgroundColor: colors.foreground.black,
        padding: 5,
        paddingTop: 15,
        flexDirection: "column",
        alignItems: "center",
        height: 75,
        width: 400,
        //width: "100%",
        position: "relative"
      },
      categoryText: {
        fontSize: 12,
        fontWeight: 400,
        color: colors.foreground.white,
      },
      nameText: {
        marginTop: 22,
        color: colors.foreground.white,
        fontSize: 16,
      },
      textsContainer: {
        borderLeftColor: colors.background.secondary,
        borderLeftWidth: 2,
        paddingLeft: 10,
        marginLeft: 5,
        flexDirection: "column",
        flex: 1,
        //justifyContent: "center",
      },
      categoryContainer:{
        padding: 2,
        paddingHorizontal: 5,
        borderRadius: 5,
        position: "absolute",
        marginLeft: 10,
        marginTop: -5,
        //width: "auto",
        backgroundColor: colors.foreground.terciary
      },
      deleteComponent:{
        backgroundColor: colors.foreground.error,
        padding: 5,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 75,
        width: 50,
        position: "relative"
      },
      editComponent:{
        backgroundColor: colors.foreground.warning,
        padding: 5,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 75,
        width: 50,
        position: "relative"
      },
      item:{
        height: 75,
        borderRadius: 5,
        overflow: "hidden"
      },

      icon:{
        height: 25,
        width: 25,
        margin: 20
      },
      mainBody: {
        flexDirection: "row"
      },
      decoration: {
        height: 8,
        width: "105%",
        position: "absolute",
        bottom: -5,
        backgroundColor: colors.foreground.terciary
      }
    });