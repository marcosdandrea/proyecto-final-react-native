import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {CustomText} from "..";
import { colors } from "../../theme";
import { icons } from "../../theme/icons";

const ExerciseItem = ({ item, navigation }) => {
    const styles = StyleSheet.create({
      container: {
        backgroundColor: colors.foreground.primary,
        height: 70,
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5,
      },
      categoryText: {
        fontSize: 12,
        fontWeight: 400,
        color: colors.foreground.white,
      },
      nameText: {
        color: colors.foreground.white,
        fontSize: 16,
      },
      textsContainer: {
        height: "80%",
        borderLeftColor: colors.background.secondary,
        borderLeftWidth: 2,
        paddingLeft: 10,
        marginLeft: 5,
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
      },
      delteButton: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
      },
      deleteIcon: {
        tintColor: "#ffffff",
        height: 22,
        width: 22,
      },
    });
  
    return (
      <LinearGradient
        // Button Linear Gradient
        colors={[colors.foreground.primary, "#bb2525"]}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <View style={styles.textsContainer}>
          <CustomText
            style={styles.categoryText}
            text={item.category.toUpperCase()}/>
          <CustomText
            style={styles.nameText}
            text={item.name}
            fontWeigth="Medium"/>
        </View>
        <View style={styles.delteButton}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Edit Exercise", { exerciseID: item.key })
            }>
            <Image style={styles.deleteIcon} source={icons.edit} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  };

  export default ExerciseItem