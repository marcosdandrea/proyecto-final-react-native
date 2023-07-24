import {
  View,
  FlatList,
  Dimensions,
  Image,
  Alert
} from "react-native";
import InputTextLabeled from "../../components/InputTextLabeled";
import colors from "../../theme/colors";
import { useState, useEffect } from "react";
import {ExerciseItem, Filters} from "../../components"
import PullToAction from "../../components/PullToAction";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import { icons } from "../../theme/icons";
import { removeExercise } from "../../store/exercises/exercises.slice";


const Exercises = ({ navigation }) => {
  const dispatch = useDispatch()
  const screenWidth = Dimensions.get("window").width;
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
      return exercisesToFilter.filter(ex => ex.category.key == filterByCategory)
  }

  const runFilterByName = (exercisesToFilter) => {
    return [...exercisesToFilter].filter(ex => {
      const exerciseName = ex.name.toLowerCase()
      const filter = filterByName.toLowerCase()
      return (exerciseName.indexOf(filter)>-1)
    })
  }

  const handleOnDeleteExercise = ({exercise}) => {

    Alert.alert(
      "Delete exercise",
      "Are you shure about to delete this exercise",
      [
        {
          text: "Cancel",
          onPress: () => {
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(removeExercise(exercise));
          },
        },
      ]
    );
  };


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
          <PullToAction 
            onRightPull={()=>{handleOnDeleteExercise ({exercise: item})}}
            onLeftPull={()=>{navigation.navigate("Edit Exercise", {exercise: item})}}
            vibrate={true}
            LeftComponent={DeleteComponent}
            RightComponent={EditComponent}
            sideComponentsWidth={50}
            MainComponent={()=>ExerciseItem({item, width: screenWidth * 0.93})}
            mainComponentWidth={screenWidth * 0.93}/>
        )}
      />
    </View>
  );
};



const DeleteComponent = () => {
  return <View style={styles.deleteComponent}>
    <Image source={icons.delete} style={styles.icon}/>
  </View>;
};

const EditComponent = () => {
  return <View style={styles.editComponent}>
    <Image source={icons.edit} style={styles.icon}/>
  </View>;
};

export default Exercises;
