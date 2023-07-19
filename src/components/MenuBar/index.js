import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import colors from "../../theme/colors";
import { icons } from "../../theme/icons";
import { SECTIONS } from "../../constants/sections"

const ButtonMenu = ({icon, main, destin, onPress, selected}) => {
   
  const styles = StyleSheet.create({
    icon: {
      height: main ? 40 : 25,
      width: main ? 40 : 25,
      tintColor: '#ffffff',
    },
    button: {
        paddingBottom: 10,
        borderBottomWidth: 3,
        borderColor: selected ? colors.foreground.primary : "transparent",
    }
  });

  return (
    <View style={styles.button}>
      <TouchableOpacity onPress={()=>onPress(destin)} >
        <Image source={icon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const MenuBar = ({navigation, route}) => {
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

  const onHandleNavigation = (destin) => navigation.navigate(destin)

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <ButtonMenu icon={icons.dashboard} onPress={onHandleNavigation} destin={SECTIONS.Dashboard} selected={SECTIONS.Dashboard == route.name}/>
        <ButtonMenu icon={icons.routine} onPress={onHandleNavigation}  destin={SECTIONS.Routines} selected={SECTIONS.Dashboard == route.name}/>
        <ButtonMenu icon={icons.workout} onPress={onHandleNavigation}  destin={SECTIONS.Workout} selected={SECTIONS.Dashboard == route.name} main={true} />
        <ButtonMenu icon={icons.exercises} onPress={onHandleNavigation}  destin={SECTIONS.Exercises} selected={SECTIONS.Dashboard == route.name}/>
        <ButtonMenu icon={icons.profile} onPress={onHandleNavigation}  destin={SECTIONS.Profiles} selected={SECTIONS.Dashboard == route.name}/>
      </View>
    </View>
  );
};

export default MenuBar;
