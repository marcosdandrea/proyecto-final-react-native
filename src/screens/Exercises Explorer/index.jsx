import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import {
  CustomText,
  Filters,
  IconButton,
  InputTextLabeled,
} from "../../components";
import {
  useGetCategoriesQuery,
  useGetExercisesQuery,
} from "../../store/exercises/exercises.API";
import { colors } from "../../theme";
import { icons } from "../../theme/icons";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSaveRoutineMutation } from "../../store/routines/routines.API";

const ExerciseItem = ({ item, onEditExercise, onSelectExercise }) => {
  return (
    <TouchableOpacity onPress={()=>onSelectExercise(item)} style={styles.exerciseItem.container}>
      <View style={styles.exerciseItem.mainBody}>
        <View style={styles.exerciseItem.textContainer}>
          <CustomText text={item.name} style={styles.exerciseItem.title} />
          <CustomText
            text={item.description}
            style={styles.exerciseItem.description}
          />
        </View>
        <IconButton
          onPress={()=>onEditExercise(item)}
          icon={icons.edit}
          iconTintColor={colors.foreground.informative}
          backgroundColor="transparent"
        />
      </View>

      <LinearGradient
        style={styles.exerciseItem.decoration}
        end={{ x: 0.8, y: 0 }}
        colors={[
          colors.palette[item.category.color],
          colors.background.secondary,
        ]}
      />
    </TouchableOpacity>
  );
};

const ExercisesExplorer = ({navigation, route}) => {

  const {routine} = route.params

  const {
    data: exerciseData,
    refetch: getExercisesData,
    error: exerciseError,
    isLoading: exerciseIsLoading,
    isFetching: exerciseIsFetching,
  } = useGetExercisesQuery();

  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryIsLoading,
  } = useGetCategoriesQuery();

  const [saveRoutine, { isLoading }] = useSaveRoutineMutation()

  //filters
  const [filterByName, setFilterByName] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");
  //filtered Exercises
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [exercises, setExercises] = useState();

  useEffect(
    () => setFilteredExercises(runAllFilters(exercises)),
    [exercises, filterByName, filterByCategory]
  );

  useEffect(() => {
    if (!categoryData) return;
    if (exerciseIsLoading) return;
    const allExercises = Object.keys(exerciseData).map((key) => {
      const category = {
        category: {
          ...categoryData[exerciseData[key].category],
          key: exerciseData[key].category,
        },
      };
      const exercise = { ...exerciseData[key], ...category, key };
      return exercise;
    });
    setExercises(allExercises);
  }, [exerciseData]);

  const runAllFilters = (exercisesToFilter) => {
    if (!exercises) return;
    let exercisesFiltered = [...exercisesToFilter];
    if (filterByCategory != "")
      exercisesFiltered = runFilterByCategory(exercisesFiltered);
    if (filterByName != "")
      exercisesFiltered = runFilterByName(exercisesFiltered);
    return exercisesFiltered;
  };

  const runFilterByCategory = (exercisesToFilter) => {
    return exercisesToFilter.filter(
      (ex) => ex.category.key == filterByCategory
    );
  };

  const runFilterByName = (exercisesToFilter) => {
    return [...exercisesToFilter].filter((ex) => {
      const exerciseName = ex.name.toLowerCase();
      const filter = filterByName.toLowerCase();
      return exerciseName.indexOf(filter) > -1;
    });
  };

  const onEditExercise = (exercise) => {
    navigation.navigate("Edit Exercise", {exercise});
  }

  const onSelectExercise = (exercise) => {
    navigation.navigate("Exercises Sets", {exercise, routine});
  };

  return (
    <View style={styles.container}>
      {exerciseIsLoading || categoryIsLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.foreground.primary} />
        </View>
      ) : (
        <View style={styles.bodyContainer}>
          <Filters
            onPress={(selected) => setFilterByCategory(selected)}
            filterList={categoryData}
            selected={(item) => console.log(item)}
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
            onRefresh={() => console.log("Refreshing")}
            refreshing={false}
            data={filteredExercises}
            renderItem={({item})=>ExerciseItem({item, onEditExercise, onSelectExercise})}
          />
        </View>
      )}
    </View>
  );
};

export default ExercisesExplorer;
