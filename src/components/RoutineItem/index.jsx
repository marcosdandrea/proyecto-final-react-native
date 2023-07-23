import { Text, View } from "react-native";
import styles from "./styles";
import IconButton from "../IconButton";
import {icons} from "../../theme/icons";
import { colors } from "../../theme";

const RoutineItem = ({ item, index }) => {
  return (
    <View style={{ ...styles.container, marginLeft: index == 0 ? 22 : 0 }}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <IconButton icon={icons.edit} backgroundColor={colors.foreground.terciary}/>
      </View>
      <Text style={styles.excerciseCount}>
        {Object.keys(item.exercises).length} Exercise
        {Object.keys(item.exercises).length > 1 ? "s" : ""}
      </Text>
    </View>
  );
};

export default RoutineItem;
