import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import colors from "../../theme/colors";
import { icons } from "../../theme/icons";
import CustomText from "../CustomText";

const InputTextLabeled = ({ label, error, Button, onChangeText, containerBackgroundColor, value="", style }) => {
  const [textInputValue, setTextInputValue] = useState("")

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: 55
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
      marginLeft: 10,
      top: -20,
      marginTop: 10,
      backgroundColor: containerBackgroundColor,
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

  useEffect(()=>{
    setTextInputValue(value)
  }, [value])

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
    <View style={{...styles.container, ...style}}>
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
