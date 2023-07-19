import { TouchableOpacity, Text } from "react-native";

const AddButton = ({onPress}) => {
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
        }}>
        <Text style={{ fontSize: 30, lineHeight: 31 }}>+</Text>
      </TouchableOpacity>
    );
  };

export default AddButton