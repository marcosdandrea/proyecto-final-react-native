import { StyleSheet } from "react-native";
import { colors } from "../../theme";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
      paddingTop: 15,
    },
    exerciseList: {},
    exerciseListContainer: {
      paddingHorizontal: 15,
      rowGap: 8,
      paddingBottom: 8,
    },
    inputFilterContainer:{
      paddingHorizontal: 15,
      paddingTop: 15,
      paddingBottom: 5
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
    icon:{
      height: 25,
      width: 25,
      margin: 20
    },
  });

  export default styles