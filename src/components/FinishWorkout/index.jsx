import { Image, View } from "react-native";
import { styles } from "./styles";
import { icons } from "../../theme/icons";
import CustomText from "../CustomText";
import StandarIconButton from "../StandarIconButton";
import { colors } from "../../theme";
import { useDispatch } from "react-redux";
import { setSetsLeft, setWorkout } from "../../store/workout/workout.slice";

const FinishWorkout = ({ route, navigation }) => {
    const dispatch = useDispatch()

  const handleContinue = () => {
    navigation.goBack();
  };

  const handleFinish = () => {
    dispatch(setWorkout({}))
    dispatch(setSetsLeft(0))
    navigation.goBack();
  }


  return (
    <View style={{ ...styles.modal, justifyContent: "center" }}>
      <View style={styles.mainBody}>
        <View style={styles.imageContainer}>
          <Image source={icons.error} style={styles.image} />
        </View>
        <CustomText
          text={"Are you shure to finish this workout?"}
          style={{ color: "white" }}
        />
        <View style={styles.buttonsContainer}>
          <StandarIconButton
            icon={icons.stop}
            onPress={handleFinish}
            text="Yes"
            buttonProperties={{
              ...styles.buttons,
              backgroundColor: colors.foreground.primary,
            }}
          />
          <StandarIconButton
            icon={icons.play}
            text="No"
            onPress={handleContinue}
            buttonProperties={{
              ...styles.buttons,
              backgroundColor: colors.foreground.secondary,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default FinishWorkout;
