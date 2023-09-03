import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import CustomText from "../CustomText";
import IconButton from "../IconButton";
import { icons } from "../../theme/icons";

const ProgressItem = ({ item, onPress, onDeleteProgress }) => {

  function msToDate(ms) {
    const date = new Date(Math.floor(ms));
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View>
          <CustomText style={styles.date} text={msToDate(item.item.date)} />
          <CustomText style={styles.weight} text={`${item.item.weight} kg`} />
        </View>
        <IconButton icon={icons.delete} onPress={onDeleteProgress} />
      </View>
    </TouchableOpacity>
  );
};

export default ProgressItem;
