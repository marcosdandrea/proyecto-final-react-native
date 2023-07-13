import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useContext } from "react"
import SectionContext from "../../contexts/SectionContext";
import colors from "../../theme/colors";
import { icons } from "../../theme/icons";
import { SECTIONS } from "../../constants/sections"

const ButtonMenu = ({ icon, main, destin }) => {
  const { setSection, section } = useContext(SectionContext)
   
  const styles = StyleSheet.create({
    icon: {
      height: main ? 40 : 25,
      width: main ? 40 : 25,
      tintColor: '#ffffff',
    },
    button: {
        paddingBottom: 10,
        borderBottomWidth: 3,
        borderColor: section==destin ? colors.foreground.primary : "transparent",
    }
  });

  const handleOnPress = () => setSection(destin)

  return (
    <View style={styles.button}>
      <TouchableOpacity onPress={handleOnPress} >
        <Image source={icon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const MenuBar = () => {
  const styles = StyleSheet.create({
    container: {
      height: 100,
      width: "100%",
      backgroundColor: colors.background.secondary,
    },
    buttonsContainer:{
        paddingTop: 15,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-evenly",
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <ButtonMenu icon={icons.dashboard} destin={SECTIONS.Dashboard}/>
        <ButtonMenu icon={icons.routine} destin={SECTIONS.Routines}/>
        <ButtonMenu icon={icons.workout} destin={SECTIONS.Workout} main={true} />
        <ButtonMenu icon={icons.exercises} destin={SECTIONS.Exercises}/>
        <ButtonMenu icon={icons.profile} destin={SECTIONS.Profiles}/>
      </View>
    </View>
  );
};

export default MenuBar;
