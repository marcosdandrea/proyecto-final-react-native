import { TouchableOpacity, Text, Image } from "react-native";
import { icons } from "../../theme/icons";

const AddButton = ({ onPress, style, iconStyle, icon= icons.add }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 30,
        height: 30,
        backgroundColor: "white",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      <Image source={icon} style={{ width: 25, height: 25, ...iconStyle }} />
    </TouchableOpacity>
  );
};

export default AddButton;
