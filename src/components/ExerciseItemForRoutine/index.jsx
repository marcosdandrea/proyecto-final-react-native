import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import CustomText from "../CustomText";
import { OpacityDecorator } from "react-native-draggable-flatlist";

const ExerciseItemForRoutine = ({ item, drag, isActive }) => {
  return (
    <OpacityDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={
            { borderColor: isActive ? "red" : "transparent" }
          }>
      <View style={styles.container}>
        <View>
          <CustomText text={item.name} style={styles.exerciseName} />
          <View style={styles.setContainer}>
            <CustomText text={"Sets:"} style={styles.text} />
            {item.sets.map((set, index) => (
              <CustomText key={index} text={set} style={styles.text} />
            ))}
          </View>
        </View>
      </View>
      </TouchableOpacity>
    </OpacityDecorator>
  );
};

export default ExerciseItemForRoutine;
