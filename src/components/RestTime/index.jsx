import { Text, View } from "react-native";
import { styles } from "./style";
import StandarIconButton from "../StandarIconButton";
import { icons } from "../../theme/icons";

const RestTime = ({ totalTime, setTotalTime, onCompleteRest }) => {
  return (
    <View style={styles.container}>
      <Text>Resting Time</Text>
      <StandarIconButton
        onPress={onCompleteRest}
        icon={icons.done}
        text="Next Set"
      />
    </View>
  );
};

export default RestTime;
