import { View, Image } from "react-native";
import colors from "../../theme/colors";
import { icons } from "../../theme/icons";

const MainButtonTab = ({ focused, size, tabBarColor }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={icons.workout}
        style={{
          position: "absolute",
          zIndex: 2,
          width: size - 35,
          height: size - 35,
          tintColor: focused
            ? colors.foreground.white
            : colors.foreground.black,
        }}
      />

      <View
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: size/2,
          backgroundColor: focused
            ? colors.foreground.secondary
            : colors.background.disabled,
          zIndex: -1,
        }}
      />
    </View>
  );
};

export default MainButtonTab;