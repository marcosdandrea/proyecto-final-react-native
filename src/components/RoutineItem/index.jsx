import { Image, Text, View } from "react-native";
import styles from "./styles";
import IconButton from "../IconButton";
import { icons } from "../../theme/icons";
import { colors } from "../../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

const RoutineItem = ({ item, index, onChangeRoutineName, onExecuteRoutine }) => {
  const handleOnChangeRoutineName = () => {
    onChangeRoutineName(item);
  };

  const handleOnExecuteRoutine = () => { 
    onExecuteRoutine(item)
  }

  return (
    <View style={{ ...styles.container, marginLeft: index == 0 ? 22 : 0 }}>
      <View style={styles.mainContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <TouchableOpacity onPress={handleOnChangeRoutineName}>
            <Image source={icons.edit} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.excerciseCount}>
          {Object.keys(item.exercises).length||0} Exercise
          {Object.keys(item.exercises).length > 1 ? "s" : ""}
        </Text>
      </View>
      <IconButton
        onPress={handleOnExecuteRoutine}
        size={30}
        icon={icons.play}
        backgroundColor={colors.foreground.terciary}
      />
    </View>
  );
};

export default RoutineItem;
