import { Image, TextInput, View } from "react-native";
import { styles } from "./styles";
import IconButton from "../IconButton";
import { icons } from "../../theme/icons";
import { colors } from "../../theme";
import CustomText from "../CustomText";
import StandarIconButton from "../StandarIconButton";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const WorkoutParamItem = ({
  currentExercise,
  currentSet,
  isLastRoutineExercise,
  incrementStep,
  handleOnCompleteSet,
  currentWeigth,
  setCurrentWeigth,
  currentReps
}) => {

  const { workout } = useSelector((store) => store.workout) || {};

  const [currentSetDetails, setCurrentSetDetails] = useState(undefined);
  const [setDone, setSetDone] = useState(false)
  const [isRecord, setIsRecord] = useState(false)

  const handleOnChangeValue = ({ increment }) => {
    increment
      ? setCurrentWeigth((prev) => prev + incrementStep)
      : setCurrentWeigth((prev) =>
          prev - incrementStep < 0 ? 0 : prev - incrementStep
        );
  };

  useEffect(() =>{
    setCurrentSetDetails(
      workout.routine.exercises.find((e) => e.exerciseID == currentExercise)
      );
  }, [workout, currentExercise])


  useEffect(()=>{
    if (!currentSetDetails || !currentSetDetails?.completedSets) {
      setSetDone(false)
      return
    }

    currentSetDetails.completedSets[currentSet-1] 
      ? setSetDone(true)
      : setSetDone(false)

  }, [currentSetDetails, currentSet])


  return (
    <View style={styles.container}>
      <CustomText text={`Reps: ${currentReps.sets[currentSet-1]}`} style={styles.prevValueText} />
      {
        setDone ?
        <View style={styles.badge}>
          <Image source={icons.done} style={styles.badgeIcon} />
        </View>
        : <></>
      }
      {
        isRecord ?
        <View style={styles.badgeCrown}>
          <Image source={icons.trophy} style={styles.badgeIcon} />
        </View>
        : <></>
      }
      <View style={styles.controlsContainer}>
        <IconButton
          onPress={() => handleOnChangeValue({ increment: false })}
          icon={icons.minus}
          size={15}
          backgroundColor={colors.background.secondary}
        />
        <TextInput
          style={styles.inputParamValue}
          value={`${String(currentWeigth)} kg`}
        />
        <IconButton
          onPress={() => handleOnChangeValue({ increment: true })}
          icon={icons.plus}
          size={15}
          backgroundColor={colors.background.secondary}
        />
      </View>
      <StandarIconButton
        text={isLastRoutineExercise ? "Finish Workout" : "Finish Set"}
        icon={icons.done}
        buttonProperties={styles.finishSetButton}
        onPress={handleOnCompleteSet}
      />
    </View>
  );
};

export default WorkoutParamItem;
