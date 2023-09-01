import { View } from "react-native";
import { styles } from "./styles";
import CustomText from "../CustomText";
import IconButton from "../IconButton";
import colors from "../../theme/colors";
import { icons } from "../../theme/icons";

const WorkoutExerciseItem = ({ item }) => {
  return (
    <View style={{...styles.container, backgroundColor: colors.palette[item.category.color]}}>
      <CustomText text={item.name} style={styles.exerciseName} />
      <CustomText text={item.category.name} style={styles.groupName} />
      {/* <View style={styles.buttonsBar}>
        <IconButton
          icon={icons.video}
          backgroundColor={colors.background.terciary}
          size={13}
          iconStyle={{ width: 24, height: 24 }}
        />
        <IconButton
          icon={icons.info}
          backgroundColor={colors.background.terciary}
          size={13}
          iconStyle={{ width: 24, height: 24 }}
        />
      </View> */}
    </View>
  );
};

export default WorkoutExerciseItem;
