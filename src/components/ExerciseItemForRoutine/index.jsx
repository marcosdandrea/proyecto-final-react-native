import { Image, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import CustomText from "../CustomText";
import {
  OpacityDecorator,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { icons } from "../../theme/icons";
import IconButton from "../IconButton";
import { colors } from "../../theme";

const ExerciseItemForRoutine = ({ item, drag, navigation, onPress }) => {
  const onEditExercise = () => {
    navigation.navigate("Edit Exercise", { exercise: item });
  };

  return (
    <ScaleDecorator>
      <OpacityDecorator>

        <TouchableOpacity style={styles.container} onPress={()=>onPress({exercise: item})}>
          <TouchableOpacity onPressIn={drag} style={styles.gripContainer}>
            <Image style={styles.dragIndicator} source={icons.moveVert} />
          </TouchableOpacity>
          <View style={styles.bodyContainer}>
            <CustomText text={item.name} style={styles.exerciseName} />
            <View style={styles.setContainer}>
              <CustomText text={"Sets:"} style={styles.text} />
              {item.sets.map((set, index) => (
                <CustomText key={index} text={set} style={styles.text} />
              ))}
            </View>
          </View>
          <IconButton
            onPress={onEditExercise}
            backgroundColor="transparent"
            size={20}
            icon={icons.edit}
            iconTintColor={colors.foreground.informative}
          />
        </TouchableOpacity>
      </OpacityDecorator>
    </ScaleDecorator>
  );
};

export default ExerciseItemForRoutine;
