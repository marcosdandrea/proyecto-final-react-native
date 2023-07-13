import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import colors from "../../theme/colors";
import { icons } from "../../theme/icons";
import CustomText from "../CustomText/CustomText";

const InputTextLabeled = ({ label, error, Button, onChangeText }) => {

  const [textInputValue, setTextInputValue] = useState("")

  const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
      padding: 10,
      paddingHorizontal: 15,
    },
    fieldContainer: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: error ? colors.foreground.error : colors.foreground.white,
      paddingHorizontal: 5,
      flexDirection: "row",
      alignItems: "center",
    },
    field: {
      fontFamily: "Poppins-Regular",
      color: colors.foreground.white,
      height: 40,
      flex: 1,
    },
    label: {
      color: colors.foreground.informative,
    },
    labelContainer: {
      position: "absolute",
      marginLeft: 30,
      marginTop: 10,
      backgroundColor: colors.background.primary,
      zIndex: 2,
      paddingHorizontal: 5,
      flexDirection: "row",
    },
    error: {
      color: colors.foreground.error,
      fontSize: 12,
      textAlign: "right",
    },
    icon: {
      width: 30,
      height: 30,
      tintColor: "#ffffff",
    },
  });

  const handleOnTextInputChange = (text) => {
    setTextInputValue(text)
    onChangeText(text)
  }

  const handleOnClearTextInput = () => {
    setTextInputValue("")
    onChangeText("")
  }

  const ClearButton = () => {
    return (
      <TouchableOpacity onPress={handleOnClearTextInput}>
        <Image style={styles.icon} source={icons.clear} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <CustomText style={styles.label} text={label} />
      </View>
      <View style={styles.fieldContainer}>
        <TextInput
          autoCapitalize={"none"}
          style={styles.field}
          value={textInputValue}
          onChangeText={handleOnTextInputChange}
        />
        {/* {error ? <Image style={styles.icon} source={icons.error}/> : <Image style={styles.icon} source={icons.search}/>} */}
        {Button ? <Button /> : textInputValue.length>0 ? <ClearButton/> : <></>}
      </View>
      <CustomText style={styles.error} text={error} />
    </View>
  );
};

export default InputTextLabeled;
