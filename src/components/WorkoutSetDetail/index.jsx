import { ActivityIndicator, View } from "react-native";
import { styles } from "./styles";
import CustomText from "../CustomText";
import WorkoutParamItem from "../WorkoutParamItem";
import IconButton from "../IconButton";
import { icons } from "../../theme/icons";

const WorkoutSetDetail = ({
  currentSet,
  onChangeSet,
  currentExercise,
  onCompleteSet,
  currentSetDetails,
  isLastRoutineExercise,
  currentSetWeight,
  setCurrentSetWeight,
}) => {
  const handleOnCompleteSet = () => {
    onCompleteSet({
      exerciseID: currentExercise,
      setIndex: currentSet,
      params: currentSetWeight,
    });
  };

  return (
    <View style={styles.container}>
      {currentSetDetails ? (
        <View>
          <View style={styles.setTitle}>
            {currentSet > 1 ? (
              <IconButton
                onPress={() => onChangeSet({ increment: false })}
                buttonProps={{...styles.setNavigationButton, left: 5}}
                icon={icons.back}
              />
            ) : (
              <></>
            )}
            <CustomText
              text={`Set ${currentSet} / ${
                currentSetDetails?.sets?.length || 0
              }`}
              style={styles.title}
            />
            {
              currentSetDetails.sets.length != currentSet ?
              <IconButton
                onPress={() => onChangeSet({ increment: true })}
                buttonProps={{...styles.setNavigationButton, right: 5}}
                icon={icons.back}
                iconStyle={{ transform: [{ rotate: "180deg" }] }}
              />
              : <></>
            }
          </View>
          <View style={styles.setParams}>
            <WorkoutParamItem
              currentExercise={currentExercise}
              currentSet={currentSet}
              currentSetDetails={currentSetDetails}
              currentWeigth={currentSetWeight}
              setCurrentWeigth={setCurrentSetWeight}
              handleOnCompleteSet={handleOnCompleteSet}
              unit={"kg"}
              incrementStep={1.25}
              isLastRoutineExercise={isLastRoutineExercise}
            />
          </View>
        </View>
      ) : (
        <ActivityIndicator size={"large"} />
      )}
    </View>
  );
};

export default WorkoutSetDetail;
