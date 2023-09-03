import { View, ActivityIndicator, Alert } from "react-native";
import styles from "./styles";
import WorkoutRoutineHeader from "../../components/WorkoutRoutineHeader";
import {
  CustomText,
  StandarIconButton,
  WorkoutExerciseSlider,
  WorkoutSetDetail,
  WorkoutSetRating,
} from "../../components";
import { useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useGetExercisesQuery,
} from "../../store/exercises/exercises.API";
import { useDispatch, useSelector } from "react-redux";
import CompletedWorkout from "../../components/CompletedWorkout";
import { completeSet, setSetsLeft, setWorkout } from "../../store/workout/workout.slice";
import Stopwatch from "../../components/StopWatch";
import { icons } from "../../theme/icons";
import { colors } from "../../theme";
import { useSaveWorkoutMutation } from "../../store/workout/workout.api";

const Workout = ({navigation}) => {
  const dispatch = useDispatch();
  const [saveWorkout, {status: saveStatus}] = useSaveWorkoutMutation();

  useEffect(()=>{
    if (saveStatus != "fulfilled") return
    dispatch(setWorkout({}))
    dispatch(setSetsLeft(0))
    setWorkoutFinished(false)
    Alert.alert("Workout Saved!")
  }, [saveStatus])

  const { startTime: workoutStartTime } = useSelector(
    (store) => store.workout.workout || 0
  );
  const { workout } = useSelector((store) => store.workout || {});

  const { data: exercises, isLoading: exercisesLoading } =
    useGetExercisesQuery();
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const [completedExercises, setCompletedExercises] = useState(0);
  const [currentExercise, setCurrentExercise] = useState({});
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);
  const [currentSetDetails, setCurrentSetDetails] = useState(undefined);
  const [currentSetWeight, setCurrentSetWeight] = useState(0);
  const [currentReps, setCurrentReps] = useState(0)

  const [workoutFinished, setWorkoutFinished] = useState(false);
  const [enableRestTime, setEnableRestTime] = useState(false);
  const [totalTime, setTotalTime] = useState(60);

  const exerciseSelectionChange = (routineExerciseId) => {
    setCurrentExercise(routineExerciseId);
  };

  useEffect(() => {
    if (Object.keys(workout).length == 0 || !exercises || !categories) return;
    setCompletedExercises(0);
    setCurrentExercise(
      workout.routine.exercises[currentExerciseIndex].exerciseID
    );
    setCurrentSet(1);
    setCurrentExerciseIndex(0);
    setWorkoutFinished(false);
    setEnableRestTime(false);
  }, [workoutStartTime]);

  const updateCurrentSetDetails = () => {
    setCurrentSetDetails(
      workout.routine.exercises.find((e) => e.exerciseID == currentExercise)
    );
  };

  useEffect(() => {
    if (!currentExercise || Object.keys(workout).length == 0) return;
    updateCurrentSetDetails();
    setCurrentSet(1);
  }, [currentExercise]);

  useEffect(() => {
    if (!currentSetDetails) return;
    setCurrentSetWeight(currentSetDetails.weight[currentSet - 1]);
  }, [currentSetDetails, currentSet]);

  const handleOnCompleteSet = () => {
    setCompletedExercises((prev) => prev + 1);
    setEnableRestTime(true);
    dispatch(completeSet({ currentExercise, currentSet, currentSetWeight }));
    updateCurrentSetDetails();
  };

  const moveToNextExercise = () => {
    if (workout.routine.exercises.length == currentExerciseIndex + 1) {
      setWorkoutFinished(true);
      return;
    }
    setCurrentExerciseIndex((prev) => prev + 1);
    setCurrentExercise(
      workout.routine.exercises[currentExerciseIndex].exerciseID
    );
  };

  const handleOnChangeSet = ({ increment }) => {
    increment
      ? setCurrentSet((prev) =>
          prev == currentSetDetails.sets.length
            ? currentSetDetails.sets.length
            : prev + 1
        )
      : setCurrentSet((prev) => (prev == 1 ? 1 : prev - 1));

    if (currentSetDetails.sets.length == currentSet) return false;
    return true;
  };

  const handleOnCompleteRest = () => {
    handleOnChangeSet({ increment: true }) ? null : moveToNextExercise();
    setEnableRestTime(false);
  };

  const onFinishWorkout = () => {
    const endTime = new Date().getTime()
    delete workout.duration
    saveWorkout({...workout, endTime});
  }

  if (exercisesLoading || categoriesLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  } else {
    if (workoutFinished) {
      return <CompletedWorkout onSaveWorkout={onFinishWorkout}/>;
    } else if (Object.keys(workout).length > 0) {
      return (
        <View style={{ ...styles.container, justifyContent: "flex-start" }}>
          <WorkoutRoutineHeader
            workout={workout}
            completedExercises={completedExercises}
          />
          <View style={styles.workoutMainBody}>
            <WorkoutExerciseSlider
              workout={workout}
              exerciseIndex={currentExerciseIndex}
              onExerciseSelectionChange={exerciseSelectionChange}
            />
            {enableRestTime ? (
              <Stopwatch
                defaultValue={totalTime}
                onFinish={handleOnCompleteRest}
              />
            ) : (
              <WorkoutSetDetail
                workout={workout}
                currentSetDetails={currentSetDetails}
                currentExercise={currentExercise}
                currentSet={currentSet}
                currentSetWeight={currentSetWeight}
                currentReps = {workout.routine.exercises[currentExerciseIndex]}
                setCurrentSetWeight={setCurrentSetWeight}
                onChangeSet={handleOnChangeSet}
                onCompleteSet={handleOnCompleteSet}
                isLastRoutineExercise={
                  workout.routine.exercises.length == currentExerciseIndex + 1
                }
              />
            )}
            <WorkoutSetRating />
          </View>
        </View>
      );
    } else {
      return (
        <View style={{...styles.container, rowGap: 25}}>
          <CustomText
            text={
              "You must select a routine in 'Routines' and hit 'play' button"
            }
            style={{ color: "white", width: "70%", textAlign: "center" }}
          />
          <StandarIconButton
            onPress={()=>navigation.navigate("RoutinesNavigator")}
            text="Go to Routines"
            icon={icons.routine}
            buttonProperties={{ width: "80%", backgroundColor: colors.foreground.secondary }}
          />
        </View>
      );
    }
  }
};

export default Workout;
