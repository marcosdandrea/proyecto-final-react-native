import { FlatList, Text, View } from "react-native";
import { useEffect, useState } from "react";
import styles from "./style";
import { useSelector } from "react-redux";
import { ExerciseItemForRoutine } from "..";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useSaveRoutineMutation } from "../../store/routines/routines.API";

const RoutineViewList = ({ currentRoutine }) => {
  const [currentExerciseList, setCurrentExerciseList] = useState([]);
  const [saveRoutine, {isError, isSuccess, isLoading}] = useSaveRoutineMutation();
  const _exercises = useSelector((state) => state.exercises);

  useEffect(() => {
    if (!currentRoutine) return;
    if (Object.keys(currentRoutine).length === 0) return;
    setCurrentExerciseList(() => {
      return Object.keys(currentRoutine.exercises).map((key) => {
        const exerciseData = _exercises.items[key];
        return {
          ...currentRoutine.exercises[key],
          key,
          name: exerciseData.name,
        };
      });
    });
  }, [currentRoutine]);

  const handleOnSaveRoutineOrder = async ({ data }) => {
    const newData = {
      name: currentRoutine.name,
      exercises: {},
    };

    data.forEach((exercise) => {
      newData.exercises[exercise.key] = {
        sets: [...exercise.sets],
        rest: [...exercise.rest],
        amount: [...exercise.amount],
      };
    });

    try {
      await saveRoutine({ key: currentRoutine.key, routine : {...newData} });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <DraggableFlatList
        contentContainerStyle={styles.exerciseList}
        onDragEnd={handleOnSaveRoutineOrder}
        data={currentExerciseList}
        keyExtractor={(item) => item.key}
        renderItem={ExerciseItemForRoutine}
      />
    </View>
  );
};

export default RoutineViewList;
