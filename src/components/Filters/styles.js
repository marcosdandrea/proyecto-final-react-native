import { StyleSheet } from 'react-native'
import colors from "../../theme/colors";

export default styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: "row",
        columnGap: 5,
        gap: 5,
      },
    filterElementContainer: {
      height: 25,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 5,
    },
    text: {
      lineHeight: 20,
      paddingHorizontal: 15,
      color: colors.foreground.white,
    },
  });