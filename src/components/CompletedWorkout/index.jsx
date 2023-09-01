import { Image, View } from "react-native";
import { styles } from "./styles";
import CustomText from "../CustomText";
import StandarIconButton from "../StandarIconButton";
import { icons } from "../../theme/icons";

const CompletedWorkout = ({onSaveWorkout}) => {
  return (
    <View style={{ ...styles.container, justifyContent: "center" }}>
      <View style={styles.mainBody}>
        <View style={styles.imageContainer}>
            <Image source={icons.done} style={styles.image}/>
        </View>
        <CustomText text={"Workout Finished"} style={{ color: "white" }} />
        <StandarIconButton icon={icons.save} text="Save Workout" onPress={onSaveWorkout} />
      </View>
    </View>
  );
};

export default CompletedWorkout;
