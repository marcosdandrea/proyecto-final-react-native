import { View, FlatList, TouchableOpacity } from "react-native";
import CustomText from "../CustomText";
import { useEffect, useState } from "react";
import { colors } from "../../theme";
import styles from "./styles";

const FilterElement = ({ label, id, color, onPress, selected }) => {
  const handleOnPress = () => {
    onPress(selected == id ? "" : id);
  };

  return (
    <View
      style={{
        ...styles.filterElementContainer,
        opacity: selected == id ? 1 : 0.5,
        backgroundColor: colors.palette[color],
      }}>
      <TouchableOpacity onPress={handleOnPress}>
        <CustomText text={label} style={styles.text} />
      </TouchableOpacity>
    </View>
  );
};

const Filters = ({ filterList, onPress, selected }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!filterList) return;
    if (Object.keys(filterList).length == 0) return;
    const newCategories = Object.keys(filterList).map((key) => {
      return { ...filterList[key], key };
    });
    setCategories(newCategories);
  }, [filterList]);

  return (
    <View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <FilterElement
            label={item.name}
            id={item.key}
            color={item.color}
            onPress={onPress}
            selected={selected}
          />
        )}
        data={categories}
      />
    </View>
  );
};

export default Filters;
