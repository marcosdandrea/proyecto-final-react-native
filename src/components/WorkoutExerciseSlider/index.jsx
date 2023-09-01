import { Dimensions, View } from "react-native";
import { styles } from "./styles";
import WorkoutExerciseItem from "../WorkoutExerciseItem";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import {
  useGetCategoriesQuery,
  useGetExercisesQuery,
} from "../../store/exercises/exercises.API";

const WorkoutExerciseSlider = ({ workout, onExerciseSelectionChange, exerciseIndex }) => {
  const ref = useRef()
  const [exerciseList, setExerciseList] = useState([]);
  const viewabilityConfig = { itemVisiblePercentThreshold: 100 };
  const [viewableItems, setViewableItems] = useState([]);
  const { data: exercises } = useGetExercisesQuery();
  const { data: categories } = useGetCategoriesQuery();

  useEffect(() => {
    if (!workout || !exercises || !categories) return;

    const exerciseList = workout.routine.exercises.map(ex => {
      return({
      exerciseID: ex.exerciseID,
      name: exercises[ex.exerciseID].name,
      category: categories[exercises[ex.exerciseID].category]
    })}
    )

    setExerciseList(exerciseList)

  }, [workout, exercises, categories]);

  useEffect(() => {
    scrollToIndex(exerciseIndex)
  }, [exerciseIndex])

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length == -1) return;
    setViewableItems(viewableItems);
  };
  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  useEffect(() => {

    const selection = viewableItems[0]?.item.exerciseID;
    if (selection) onExerciseSelectionChange(selection);
  }, [viewableItems]);

  const scrollToIndex = index => {
    if (exerciseList.length > 0)
    ref?.current?.scrollToIndex({
        animated: true,
        index: index,
    });
}

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        contentContainerStyle={styles.listContainer}
        data={exerciseList}
        horizontal={true}
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").width - 55}
        showsHorizontalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        renderItem={WorkoutExerciseItem}
      />
    </View>
  );
};

export default WorkoutExerciseSlider;
