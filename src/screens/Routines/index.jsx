import { View, FlatList, Dimensions, ActivityIndicator } from "react-native";
import colors from "../../theme/colors";
import { useEffect, useRef, useState } from "react";
import { icons } from "../../theme/icons";
import styles from "./styles";
import {
  InputTextLabeled,
  IconButton,
  RoutineItem,
  StandarIconButton,
  ExerciseItemForRoutine,
  CustomText,
} from "../../components";
import {
  useGetAllRoutinesQuery,
  useSaveRoutineMutation,
} from "../../store/routines/routines.API";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useGetExercisesQuery } from "../../store/exercises/exercises.API";
import { useDispatch, useSelector } from "react-redux";
import { setWorkout } from "../../store/workout/workout.slice";
import StartWorkout from "../../components/StartWorkout";

const Routines = ({ navigation }) => {
  const dispatch = useDispatch();
  const workout = useSelector((state) => state.workout.workout);

  //RTK
  const {
    data: _routines,
    isLoading: routinesIsLoading,
    isError: fetchingRoutineError,
  } = useGetAllRoutinesQuery();
  const { data: _exercises, isError: fetchingExercisesError } =
    useGetExercisesQuery();
  const [saveRoutine] = useSaveRoutineMutation();
  /////

  const [routines, setRoutines] = useState();
  const [showModal, setShowModal] = useState(false);

  const [selectedRoutine, setSelectedRoutine] = useState({});
  const [listOfRoutines, setListOfRoutines] = useState([]);
  const [selectedRoutineExercisesList, setSelectedRoutineExercisesList] =
    useState([]);

  const [filterError, setFilterError] = useState();
  const [filterRoutinesByText, setFilterRoutinesByText] = useState("");
  const [viewableItems, setViewableItems] = useState([]);

  useEffect(() => {
    if (routinesIsLoading || fetchingRoutineError || fetchingExercisesError)
      return;
    setRoutines([]);
    setListOfRoutines([]);
    setSelectedRoutineExercisesList([]);

    if (!_routines) return;

    setRoutines(
      Object.keys(_routines).map((key) => ({
        ..._routines[key],
        key,
        exercises: _routines[key]?.exercises || [],
      }))
    );
  }, [_routines]);

  useEffect(() => {
    if (filterRoutinesByText == "") {
      setFilterError("");
      showCurrentSelectedRoutine();
      setListOfRoutines(routines);
      return;
    }

    setListOfRoutines(() => {
      const newData = routines.filter(
        (routine) =>
          routine.name
            .toLowerCase()
            .indexOf(filterRoutinesByText.toLowerCase()) > -1
      );
      if (newData.length > 0) {
        showCurrentSelectedRoutine();
        setFilterError("");
        return newData;
      }
      setFilterError("No routines match");
      setListOfRoutines([]);
      setSelectedRoutine({ exercises: [] });
      return newData;
    });
  }, [filterRoutinesByText, routines]);

  useEffect(() => showCurrentSelectedRoutine(), [viewableItems]);

  useEffect(() => {
    if (!selectedRoutine) return;
    if (Object.keys(selectedRoutine).length === 0) return;
    setSelectedRoutineExercisesList(() => {
      return selectedRoutine.exercises.map((exercise, index) => {
        const exerciseData = _exercises[exercise.exerciseID];
        return {
          ...selectedRoutine.exercises[index],
          key: exercise.exerciseID,
          name: exerciseData.name,
        };
      });
    });
  }, [selectedRoutine]);

  const handleRemoveExerciseFromRoutine = async ({ index }) => {
    let newExercises = [...selectedRoutineExercisesList];
    newExercises.splice(index, 1);
    const newData = {
      name: selectedRoutine.name,
      exercises: newExercises,
    };

    try {
      await saveRoutine({ key: selectedRoutine.key, routine: { ...newData } });
    } catch (e) {
      console.log(e);
    }
  };

  const showCurrentSelectedRoutine = () => {
    const currentItem = viewableItems[0]?.item.key;
    if (currentItem == undefined) return;
    const routine = routines.find((sets) => sets.key == currentItem);
    setSelectedRoutine(routine);
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length == -1) return;
    setViewableItems(viewableItems);
  };

  const handleOnSaveRoutineOrder = async ({ data }) => {
    const exercisesReordered = data.map((exercise) => {
      return {
        notes: exercise.notes,
        sets: exercise.sets,
        weight: exercise.weight,
        rest: exercise.rest,
        exerciseID: exercise.key,
      };
    });
    const newData = {
      name: selectedRoutine.name,
      exercises: exercisesReordered,
    };

    try {
      await saveRoutine({ key: selectedRoutine.key, routine: { ...newData } });
    } catch (e) {
      console.log(e);
    }
  };

  const viewabilityConfig = { itemVisiblePercentThreshold: 100 };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const onChangeRoutineName = (routine) => {
    navigation.navigate("Routine Editor", { routine });
  };

  const handleOnDeleteRoutine = () => {
    navigation.navigate("Routine Editor", {
      routine: selectedRoutine,
      promptDelete: true,
    });
  };

  const onExecuteRoutine = () => {
    if (Object.keys(workout).length > 0) {
      setShowModal(true);
    } else {
      startNewWorkout();
    }
  };

  const startNewWorkout = () => {
    setShowModal(false);
    const date = new Date();
    dispatch(
      setWorkout({
        startTime: date.getTime(),
        duration: 0,
        routine: selectedRoutine,
      })
    );
    navigation.navigate("WorkoutNavigator", {
      screen: "Workout",
    });
  };

  return (
    <View style={styles.container}>
      {routinesIsLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.foreground.primary} />
        </View>
      ) : routines?.length == 0 ? (
        <View style={styles.noRoutinesContainer}>
          <CustomText
            style={styles.noRoutineText}
            text="You have no routines. Create a new one using the add button in the header."
          />
        </View>
      ) : (
        <View style={styles.routineMainContianer}>
          {showModal ? (
            <StartWorkout
              showModal={showModal}
              onStartNewWorkout={startNewWorkout}
              onClose={() => {
                setShowModal(false);
              }}
            />
          ) : (
            <></>
          )}
          <View style={styles.searchBox}>
            <InputTextLabeled
              error={filterError}
              label={"Find a Routine"}
              Button={() =>
                IconButton({
                  icon: icons.search,
                  backgroundColor: colors.background.primary,
                })
              }
              value={filterRoutinesByText}
              onChangeText={setFilterRoutinesByText}
              containerBackgroundColor={colors.background.primary}
            />
          </View>

          {
            <View>
              <FlatList
                data={listOfRoutines}
                horizontal={true}
                contentContainerStyle={styles.horizontalGalleryContent}
                snapToAlignment="start"
                decelerationRate={"fast"}
                snapToInterval={Dimensions.get("window").width - 45 + 15}
                showsHorizontalScrollIndicator={false}
                viewabilityConfigCallbackPairs={
                  viewabilityConfigCallbackPairs.current
                }
                renderItem={({ item, index }) =>
                  RoutineItem({
                    item,
                    index,
                    navigation,
                    onChangeRoutineName,
                    onExecuteRoutine,
                  })
                }
              />
            </View>
          }
          <View style={styles.routineContainer}>
            <View style={styles.routines}>
              <DraggableFlatList
                contentContainerStyle={styles.exerciseList}
                onDragEnd={handleOnSaveRoutineOrder}
                data={selectedRoutineExercisesList}
                keyExtractor={(item, index) => item.key + index}
                renderItem={({ item, getIndex, drag }) =>
                  ExerciseItemForRoutine({
                    item,
                    drag,
                    navigation,
                    onPress: ({ exercise }) =>
                      navigation.navigate("Exercises Sets", {
                        handleRemoveExerciseFromRoutine,
                        exercise,
                        routine: selectedRoutine,
                        index: getIndex(),
                      }),
                  })
                }
              />
            </View>
            {filterError ? (
              <></>
            ) : (
              <View style={styles.newExerciseItem}>
                <StandarIconButton
                  onPress={() =>
                    navigation.navigate("Exercise Explorer", {
                      routine: selectedRoutine,
                    })
                  }
                  icon={icons.add}
                  text="add exercise"
                  iconTint={colors.foreground.informative}
                  textProperties={{ color: colors.foreground.informative }}
                  buttonProperties={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "flex-start",
                    paddingLeft: 10,
                  }}
                />
              </View>
            )}
          </View>
          {filterError ? (
            <></>
          ) : (
            <View style={styles.deleteIconContainer}>
              <StandarIconButton
                onPress={handleOnDeleteRoutine}
                icon={icons.delete}
                text="Delete Routine"
                iconTint={colors.foreground.primary}
                textProperties={{ color: colors.foreground.primary }}
                buttonProperties={{ width: "90%" }}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Routines;
