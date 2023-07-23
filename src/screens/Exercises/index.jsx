import {
  View,
  FlatList
} from "react-native";
import InputTextLabeled from "../../components/InputTextLabeled";
import colors from "../../theme/colors";
import { useState, useEffect } from "react";
import {Filters} from "../../components"
import ExerciseItem from "../../components/ExerciseItem";
import { useSelector } from "react-redux";
import styles from "./styles";


const Exercises = ({ navigation }) => {
  const _exercises = useSelector((state)=> state.exercises.items)
  const categories = useSelector((state)=> state.exercises.categories)
  const [exercises, setExercises] = useState()

  //filters
  const [filterByName, setFilterByName] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");
  //filtered Exercises
  const [filteredExercises, setFilteredExercises] = useState([]);

  useEffect(()=>{
    const allExercises = Object.keys(_exercises).map(key => {
      const category = {category: {...categories[_exercises[key].category], key: _exercises[key].category}}
      const exercise = {..._exercises[key], ...category, key}
      return exercise
    })
    setExercises(allExercises)
  }, [_exercises])

  useEffect(()=> setFilteredExercises(runAllFilters(exercises)), [exercises, filterByName, filterByCategory])

  const runAllFilters = (exercisesToFilter) => {
    if (!exercises) return
    let exercisesFiltered = [...exercisesToFilter]
    if (filterByCategory!="") exercisesFiltered = runFilterByCategory(exercisesFiltered)
    if (filterByName != "") exercisesFiltered = runFilterByName(exercisesFiltered)
    return (exercisesFiltered)
  }

  const runFilterByCategory = (exercisesToFilter) => {
    console.log (exercisesToFilter)
      return exercisesToFilter.filter(ex => ex.category.key == filterByCategory)
  }

  const runFilterByName = (exercisesToFilter) => {
    return [...exercisesToFilter].filter(ex => {
      const exerciseName = ex.name.toLowerCase()
      const filter = filterByName.toLowerCase()
      return (exerciseName.indexOf(filter)>-1)
    })
  }


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
