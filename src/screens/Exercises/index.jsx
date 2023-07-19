import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import InputTextLabeled from "../../components/InputTextLabeled";
import colors from "../../theme/colors";
import { useState, useContext, useEffect } from "react";
import DatabaseContext from "../../contexts/DatabaseContext";
import { icons } from "../../theme/icons";
import { LinearGradient } from "expo-linear-gradient";
import {CustomText, ExerciseItem, Filters} from "../../components"



const Exercises = ({ navigation }) => {
  const { exercises, categories } = useContext(DatabaseContext);

  //filters
  const [filterByName, setFilterByName] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");

  //filtered Exercises
  const [filteredExercises, setFilteredExercises] = useState([]);

  useEffect(()=> setFilteredExercises(runFilters(exercises)), [exercises, filterByName, filterByCategory])

  const runFilters = (exercisesToFilter) => {
    let exercisesFiltered = [...exercisesToFilter]
    if (filterByCategory!="") exercisesFiltered = runFilterByCategory(exercisesFiltered)
    if (filterByName != "") exercisesFiltered = runFilterByName(exercisesFiltered)
    return (exercisesFiltered)
  }

  const runFilterByCategory = (exercisesToFilter) => {
      return exercisesToFilter.filter(ex => ex.category == filterByCategory)
  }

  const runFilterByName = (exercisesToFilter) => {
    return [...exercisesToFilter].filter(ex => {
      const exerciseName = ex.name.toLowerCase()
      const filter = filterByName.toLowerCase()
      return (exerciseName.indexOf(filter)>-1)
    })
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
      paddingTop: 15,
    },
    exerciseList: {},
    exerciseListContainer: {
      paddingHorizontal: 15,
      rowGap: 8,
      paddingBottom: 8,
    },
    inputFilterContainer:{
      paddingHorizontal: 15,
      paddingTop: 15,
      paddingBottom: 5
    }
  });

  return (
    <View style={styles.container}>
      <Filters
        selected={filterByCategory}
        onPress={(selected) => setFilterByCategory(selected)}
        filterList={categories}
      />
      <View style={styles.inputFilterContainer}>
        <InputTextLabeled
          onChangeText={(text) => setFilterByName(text)}
          containerBackgroundColor={colors.background.primary}
          label="Nombre del ejercicio"
        />
      </View>
      <FlatList
        style={styles.exerciseList}
        contentContainerStyle={styles.exerciseListContainer}
        data={filteredExercises}
        renderItem={({ item }) => (
          <ExerciseItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default Exercises;
