import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../theme";
import { View } from "react-native";
import CustomText from "../CustomText";
import styles from "./styles";

const MainComponent = ({ item, width }) => {
  return (
    <LinearGradient
      // Button Linear Gradient
      colors={["#2C383A", colors.foreground.black]}
      end={{ x: 1.5, y: 0 }}
      style={{ ...styles.container, width }}
    >
      <View style={styles.mainBody}>
        <View style={{
            ...styles.categoryContainer,
            backgroundColor: colors.background.primary,
          }}>
          <CustomText
            style={styles.categoryText}
            text={item.category.name.toUpperCase()}
          />
        </View>
        <CustomText
          style={styles.nameText}
          text={item.name}
          fontWeigth="Medium"
        />
      </View>

      <LinearGradient
        style={{ ...styles.decoration, width }}
        end={{ x: 0.8, y: 0 }}
        colors={[
          colors.palette[item.category.color],
          colors.background.secondary,
        ]}
      />
    </LinearGradient>
  );
};

export default MainComponent;
