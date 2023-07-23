import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";

const Fonts = {
    Regular: "Poppins-Regular",
    Medium: "Poppins-Medium",
    Bold: "Poppins-Bold",
    Light: "Poppins-Light"
}

export const FontProvider = ({ children }) => {
  const [fontsLoaded] = useFonts({
    [Fonts.Regular]: require("./ttf/Poppins-Regular.ttf"),
    [Fonts.Medium] : require("./ttf/Poppins-Medium.ttf"),
    [Fonts.Bold] : require("./ttf/Poppins-SemiBold.ttf"),
    [Fonts.Light] : require("./ttf/Poppins-Light.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"green"} size={"large"} />
      </View>
    );
  }

  return (<View style={{ flex: 1 }}>{children}</View>);
};

export {Fonts}
export default FontProvider;
