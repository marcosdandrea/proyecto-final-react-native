import {
  View,
  FlatList,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import InputTextLabeled from "../../components/InputTextLabeled";
import colors from "../../theme/colors";
import { useState, useEffect } from "react";
import { ExerciseItem, Filters } from "../../components";
import PullToAction from "../../components/PullToAction";
import styles from "./styles";
import { icons } from "../../theme/icons";
import {
  useGetCategoriesQuery,
  useGetExercisesQuery,
  useRemoveExerciseMutation,
} from "../../store/exercises/exercises.API";


const Exercises = ({ navigation }) => {
  const {
    data: exerciseData,
    refetch: getExercisesData,
    isSuccess: exerciseIsSuccess,
  } = useGetExercisesQuery();
  const {
    data: categoryData,
    isSuccess: categoryIsSuccess,
  } = useGetCategoriesQuery();

  const [deleteExercise] = useRemoveExerciseMutation();

  const screenWidth = Dimensions.get("window").width;
  const [exercises, setExercises] = useState();

  //filters
  const [filterByName, setFilterByName] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");
  //filtered Exercises
  const [filteredExercises, setFilteredExercises] = useState([]);

  useEffect(() => {
    if (!exerciseIsSuccess || !categoryIsSuccess) return;
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
  }, [exerciseIsSuccess, categoryIsSuccess, exerciseData]);

  useEffect(
    () => setFilteredExercises(runAllFilters(exercises)),
    [exercises, filterByName, filterByCategory]
  );

  function normalize(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

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
      const exerciseName = normalize(ex.name.toLowerCase())
      const filter = filterByName.toLowerCase();
      return normalize(exerciseName).indexOf(filter) > -1;
    });
  };

  const handleOnDeleteExercise = async ({ exercise }) => {
    Alert.alert(
      "Deleting exercise",
      `Are you shure about to delete the exercise: "${exercise.name}"?`,
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            try {
              deleteExercise({key: exercise.key});
              //dispatch(removeExercise(exercise));
            } catch (e) {
              console.warn(e);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>

        <View>
          <Filters
            selected={filterByCategory}
            onPress={(selected) => setFilterByCategory(selected)}
            filterList={categoryData}
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
            onRefresh={()=> getExercisesData()}
            refreshing={false}
            data={filteredExercises}
            renderItem={({ item }) => (
              <PullToAction
                onRightPull={() => {
                  handleOnDeleteExercise({ exercise: item });
                }}
                onLeftPull={() => {
                  navigation.navigate("Edit Exercise", { exercise: item });
                }}
                vibrate={true}
                LeftComponent={DeleteComponent}
                RightComponent={EditComponent}
                sideComponentsWidth={50}
                MainComponent={() =>
                  ExerciseItem({ item, width: screenWidth * 0.93 })
                }
                mainComponentWidth={screenWidth * 0.93}
              />
            )}
          />
        </View>
    </View>
  );
};

const DeleteComponent = () => {
  return (
    <View style={styles.deleteComponent}>
      <Image source={icons.delete} style={styles.icon} />
    </View>
  );
};

const EditComponent = () => {
  return (
    <View style={styles.editComponent}>
      <Image source={icons.edit} style={styles.icon} />
    </View>
  );
};

export default Exercises;
