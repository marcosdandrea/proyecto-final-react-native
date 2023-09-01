import { Image, View } from "react-native";
import { styles } from "./styles";
import { icons } from "../../theme/icons";
import CustomText from "../CustomText";
import StandarIconButton from "../StandarIconButton";
import { colors } from "../../theme";

const StartWorkout = ({onStartNewWorkout, onClose, showModal}) => {


  const handleContinue = () => {
    onClose()
  };


  const handleStartNew = () => {
    onStartNewWorkout() 
  }


  return (
    <View style={{ ...styles.modal, justifyContent: "center", display: showModal ? "flex" : "none" }}>
      <View style={styles.mainBody}>
        <View style={styles.imageContainer}>
          <Image source={icons.error} style={styles.image} />
        </View>
        <CustomText
          text={"There's another workout running right now. If you start a new one, the data of the current Workout will be lost. Are you shure you want to continue?"}
          style={{ color: "white" }}
        />
        <View style={styles.buttonsContainer}>
          <StandarIconButton
            icon={icons.stop}
            onPress={handleStartNew}
            text="Yes"
            buttonProperties={{
              ...styles.buttons,
              backgroundColor: colors.foreground.secondary,
            }}
          />
          <StandarIconButton
            icon={icons.play}
            text="No"
            onPress={handleContinue}
            buttonProperties={{
              ...styles.buttons,
              backgroundColor: colors.foreground.primary,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default StartWorkout;
