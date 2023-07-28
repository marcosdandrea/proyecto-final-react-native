import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import colors from "../../theme/colors";
import CustomText from "../CustomText";
import { useEffect, useState } from "react";

const FilterElement = ({ label, id, color, onPress, selected }) => {
  const styles = StyleSheet.create({
    container: {
      height: 25,
      borderRadius: 10,
      opacity: selected == id ? 1 : 0.5,
      backgroundColor: colors.palette[color],
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 5,
    },
    text: {
      lineHeight: 20,
      paddingHorizontal: 15,
      color: colors.foreground.white,
    },
  });

  const handleOnPress = () => {
    onPress(selected == id ? "" : id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOnPress}>
        <CustomText text={label} style={styles.text} />
      </TouchableOpacity>
    </View>
  );
};

const Filters = ({ filterList, onPress, selected }) => {
    const [categories, setCategories] = useState([])

    useEffect(()=>{
      if(Object.keys(filterList).length == 0) return
        const newCategories = Object.keys(filterList).map((key)=> {return {...filterList[key], key}})
        setCategories(newCategories)
    }, [filterList])

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      flexDirection: "row",
      columnGap: 5,
      gap: 5,
    },
  });

  return (
    <View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <FilterElement label={item.name} id={item.key} color={item.color} onPress={onPress} selected={selected} />
        )}
        data={categories}
      />
    </View>
  );
};

export default Filters;
