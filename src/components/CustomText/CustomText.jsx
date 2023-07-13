import { Text } from "react-native";
import { Fonts } from "../../../assets/fonts/FontProvider";

const CustomText = ({ text, fontWeigth = "Regular", style }) => {

    const _styles = {
        fontFamily: 
            fontWeigth == "Regular" ? Fonts.Regular :
            fontWeigth == "Medium" ? Fonts.Medium :
            fontWeigth == "Bold" ? Fonts.Bold : Fonts.Light
    }

  return (
    <Text style={{ ..._styles, ...style }}>{text}</Text>
  );
};

export default CustomText;
