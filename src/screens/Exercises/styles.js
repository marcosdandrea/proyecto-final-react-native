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
    }
  });

  export default styles