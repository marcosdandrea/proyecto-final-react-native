import { View, StyleSheet, StatusBar } from "react-native";
import constants from "expo-constants";
import COLORS from "../../theme/colors";
import colors from "../../theme/colors";
import CustomText from "../CustomText/CustomText.jsx"

function Header({ children, title }) {
  const secureMinHeight = constants.statusBarHeight;

  const styles = StyleSheet.create({
    backdrop: {
      backgroundColor: COLORS.background.secondary,
      height: secureMinHeight + 70,
      justifyContent: "flex-end",
      paddingBottom: 10,
      marginBottom: 25,
    },
    headerContainer: {
      paddingHorizontal: 15,
      justifyContent: "space-between",
      flexDirection: "row",
    },
    title: {
      color: colors.foreground.white,
      fontWeight: 500,
      fontSize: 30,
      bottom: 0,
      textTransform: "uppercase"
    },
  });


  return (
    <View style={styles.backdrop}>
      <StatusBar
        barStyle={"light-content"}/>
      <View style={styles.headerContainer}>
        <CustomText text={title} fontWeigth="Medium" style={styles.title}/>
        {children}
      </View>
    </View>
  );
}

export default Header;
