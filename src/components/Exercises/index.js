import Header from "../Header/Header";
import {
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import InputTextLabeled from "../InputTextLabeled";
import colors from "../../theme/colors";
import Filters from "../Filters";
import { useState, useContext, useEffect } from "react";
import DatabaseContext from "../../contexts/DatabaseContext";
import { icons } from "../../theme/icons";
import CustomText from "../CustomText/CustomText";
import { LinearGradient } from "expo-linear-gradient";

const AddButton = () => {
  return (
    <TouchableHighlight
      style={{
        width: 30,
        height: 30,
        backgroundColor: "white",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 30, lineHeight: 32 }}>+</Text>
    </TouchableHighlight>
  );
};

const ExerciseItem = ({ item }) => {
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
        end={{ x: 1, y: 0}}
        style={styles.container}
      >
        <View style={styles.textsContainer}>
          <CustomText
            style={styles.categoryText}
            text={item.category.toUpperCase()}
          />
          <CustomText
            style={styles.nameText}
            text={item.name}
            fontWeigth="Medium"
          />
        </View>
        <View style={styles.delteButton}>
          <TouchableOpacity>
            <Image style={styles.deleteIcon} source={icons.edit} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
  );
};

const Exercises = () => {
  const { getCategories, getExercises } = useContext(DatabaseContext);
  const [category, setCategory] = useState();
  const [filteredCategory, setFilteredCategory] = useState();
  const [filteredName, setFilteredName] = useState("");
  const [filteredExercises, setFilteredExercises] = useState([]);

  useEffect(() => {
    if (!category || category == "") {
      setFilteredCategory(getExercises());
      return;
    }
    const exercises = getExercises();
    const filtered = exercises.filter((ex) => ex.category == category);
    setFilteredCategory(filtered);
  }, [category]);

  useEffect(() => {
    if (!filteredCategory) return;
    if (filteredName == "") {
      setFilteredExercises(filteredCategory);
      return;
    }
    const filteredByCategory = [...filteredCategory];
    const filteredByName = filteredByCategory.filter((ex) => {
      const exercise = ex.name.toLowerCase();
      const filteredLower = filteredName.toLowerCase();
      return exercise.indexOf(filteredLower) > 0;
    });
    setFilteredExercises(filteredByName);
  }, [filteredName, filteredCategory]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    exerciseList: {},
    exerciseListContainer: {
      paddingHorizontal: 15,
      rowGap: 8,
      paddingBottom: 8,
    },
  });

  return (
    <View style={styles.container}>
      <Header title="Ejercicios"></Header>
      <Filters
        selected={category}
        onPress={(selected) => setCategory(selected)}
        filterList={getCategories()}
      />
      <InputTextLabeled
        onChangeText={(text) => setFilteredName(text)}
        label="Nombre del ejercicio"
      />
      <FlatList
        style={styles.exerciseList}
        contentContainerStyle={styles.exerciseListContainer}
        data={filteredExercises}
        renderItem={({ item }) => <ExerciseItem item={item} />}
      />
    </View>
  );
};

export default Exercises;
