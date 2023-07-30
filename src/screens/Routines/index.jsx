import { View, FlatList, Dimensions, ActivityIndicator } from "react-native";
import colors from "../../theme/colors";
import { useEffect, useRef, useState } from "react";
import { icons } from "../../theme/icons";
import {
  InputTextLabeled,
  IconButton,
  RoutineItem,
  StandarIconButton,
  ExerciseItemForRoutine,
  CustomText,
} from "../../components";
import styles from "./styles";
import { useSelector } from "react-redux";
import {
  useGetAllRoutinesQuery,
  useGetRoutinesQuery,
  useSaveRoutineMutation,
} from "../../store/routines/routines.API";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useGetExercisesQuery } from "../../store/exercises/exercises.API";

const Routines = ({ navigation }) => {
  //const _routines = useSelector((state)=> state.routines)
  //const _exercises = useSelector((state) => state.exercises);

  const {
    data: _routines,
    error: getRoutinesError,
    isLoading: routinesIsLoading,
  } = useGetAllRoutinesQuery();

  const {
    data: _exercises,
    refetch: getExercisesData,
    error: exerciseError,
    isLoading: exerciseIsLoading,
    isFetching: exerciseIsFetching,
  } = useGetExercisesQuery();

  const [saveRoutine, { isError, isSuccess, isLoading }] =
    useSaveRoutineMutation();

  const [currentExerciseList, setCurrentExerciseList] = useState([]);
  const [routines, setRoutines] = useState();

  useEffect(() => {
    if (routinesIsLoading) return;
    const routines = Object.keys(_routines).map((key) => {
      return { ..._routines[key], key };
    });

    setRoutines(routines);
  }, [_routines]);

  const [routineList, setRoutineList] = useState([]);
  const [filterError, setFilterError] = useState();
  const [filterRoutinesByText, setFilterRoutinesByText] = useState("");
  const [currentRoutine, setCurrentRoutine] = useState({});
  const [viewableItems, setViewableItems] = useState([]);

  useEffect(() => {
    if (filterRoutinesByText == "") {
      setFilterError("");
      showCurrentSelectedRoutine();
      setRoutineList(routines);
      return;
    }

    setRoutineList(() => {
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
      setRoutineList([]);
      setCurrentRoutine({ exercises: [] });
      return newData;
    });
  }, [filterRoutinesByText, routines]);

  useEffect(() => showCurrentSelectedRoutine(), [viewableItems]);

  const showCurrentSelectedRoutine = () => {
    const currentItem = viewableItems[0]?.item.key;
    if (currentItem == undefined) return;
    const routine = routines.find((sets) => sets.key == currentItem);
    setCurrentRoutine(routine);
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length == -1) return;
    setViewableItems(viewableItems);
  };

  const handleOnSaveRoutineOrder = async ({ data }) => {
    const exercisesReordered = data.map((exercise) => {
      return {
        amount: exercise.amount,
        sets: exercise.sets,
        exerciseID: exercise.key,
      };
    });
    const newData = {
      name: currentRoutine.name,
      exercises: exercisesReordered,
    };

    try {
      await saveRoutine({ key: currentRoutine.key, routine: { ...newData } });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!currentRoutine) return;
    if (Object.keys(currentRoutine).length === 0) return;
    setCurrentExerciseList(() => {
      return currentRoutine.exercises.map((exercise, index) => {
        console.log(exercise.exerciseID);
        const exerciseData = _exercises[exercise.exerciseID];
        return {
          ...currentRoutine.exercises[index],
          key: exercise.exerciseID,
          name: exerciseData.name,
        };
      });
    });
  }, [currentRoutine]);

  const viewabilityConfig = { itemVisiblePercentThreshold: 100 };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <View style={styles.container}>
      {routinesIsLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.foreground.primary} />
        </View>
      ) : (
        <View style={styles.routineMainContianer}>
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
          <View>
            <FlatList
              data={routineList}
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
                RoutineItem({ item, index, navigation })
              }
            />
          </View>
          <View style={styles.routineContainer}>
            <View style={styles.routines}>
              <DraggableFlatList
                contentContainerStyle={styles.exerciseList}
                onDragEnd={handleOnSaveRoutineOrder}
                data={currentExerciseList}
                keyExtractor={(item) => item.key}
                renderItem={({ item, drag }) =>
                  ExerciseItemForRoutine({ item, drag, navigation })
                }
              />
            </View>
            <View style={styles.newExerciseItem}>
              <StandarIconButton
                icon={icons.add}
                text="add exercise"
                iconTint={colors.foreground.informative}
                textProperties={{ color: colors.foreground.informative }}
                buttonProperties={{ width: "100%", height: "100%", justifyContent: "flex-start", paddingLeft: 10 }}
              />
            </View>
          </View>
          <View style={styles.deleteIconContainer}>
            <StandarIconButton
              icon={icons.delete}
              text="Delete Routine"
              iconTint={colors.foreground.primary}
              textProperties={{ color: colors.foreground.primary }}
              buttonProperties={{ width: "90%" }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Routines;
