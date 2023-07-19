import { View, Image } from "react-native";
import colors from "../../theme/colors";
import { icons } from "../../theme/icons";

const MainButtonTab = ({focused, size, tabBarColor}) => {
    return (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            backgroundColor: focused
              ? colors.foreground.secondary
              : colors.foreground.primary,
            justifyContent: "center",
            alignItems: "center",
            elevation: 4,
            borderColor: tabBarColor,
            borderWidth: 5
          }}
        >
          <Image
            source={icons.workout}
            style={{ width: size - 35, height: size - 35 }}
          />
        </View>
    )
}
 
export default MainButtonTab;