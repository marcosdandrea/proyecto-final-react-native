import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import SectionContext from "../../contexts/SectionContext";
import { SECTIONS } from "../../constants/sections";
import Exercises from "../Exercises";

const Sections = () => {
  const { section } = useContext(SectionContext);

  const styles = StyleSheet.create({
    container: {
        flex: 1
    },
  });

  return (
  <View style={styles.container}>
    {section == SECTIONS.Exercises ? 
    <Exercises /> : 
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>{section}</Text>
      <Text>{"Comming Soon"}</Text>
    </View>
    }
</View>);
};

export default Sections;
