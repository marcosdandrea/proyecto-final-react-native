import { Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { icons } from "../../theme/icons";
import { colors } from "../../theme";

const StandarIconButton = ({ icon = icons.delete, iconTint=colors.foreground.white, text = "", buttonProperties, textProperties, onPress }) => {
  return (
    <TouchableOpacity style={{...styles.container, ...buttonProperties}} onPress={onPress}>
      <Image source={icon} style={{...styles.icon, tintColor: iconTint}} />
      <Text style={{...styles.text, ...textProperties}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default StandarIconButton;
