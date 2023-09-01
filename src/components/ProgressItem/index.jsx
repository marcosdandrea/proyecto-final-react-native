import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import CustomText from "../CustomText";
import IconButton from "../IconButton";
import { icons } from "../../theme/icons";
import { deleteProgressById } from "../../database";

const ProgressItem = ({ item, onPress, onDeleteProgress }) => {

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View>
          <CustomText style={styles.date} text={item.item.date} />
          <CustomText style={styles.weight} text={`${item.item.weight} kg`} />
        </View>
        <IconButton icon={icons.delete} onPress={onDeleteProgress} />
      </View>
    </TouchableOpacity>
  );
};

export default ProgressItem;
