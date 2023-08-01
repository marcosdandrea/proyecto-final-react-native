import { TouchableOpacity, Image } from "react-native";
import colors from "../../theme/colors";

const IconButton = ({
  onPress,
  backgroundColor = colors.foreground.primary,
  borderRadius = 30,
  icon,
  iconStyle,
  iconTintColor = colors.foreground.white,
  size = 20,
}) => {
  const styles = {
    image: {
      height: size,
      width: size,
    },
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: size + 20,
        height: size + 20,
        backgroundColor: backgroundColor,
        borderRadius,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image style={{...styles.image, ...iconStyle}} tintColor={iconTintColor} source={icon} />
    </TouchableOpacity>
  );
};

export default IconButton;
