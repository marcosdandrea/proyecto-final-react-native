import {
  Animated,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import { AddButton, CustomText, IconButton } from "../../components";
import { icons } from "../../theme/icons";
import { colors } from "../../theme";
import { useEffect, useState } from "react";
import { useCardAnimation } from "@react-navigation/stack";

const Notes = ({ props }) => {
  return (
    <View style={{ ...styles.setGroup.repsContainer }}>
      <Image source={icons.notes} style={styles.setGroup.notesIcon} />
      <TextInput
        style={styles.setGroup.exerciseNotes}
        onChangeText={(text) => props.onEditNotes({ index: props.index, text })}
        multiline={true}
        value={props.item.notes}
      />
    </View>
  );
};

const Weight = ({ props }) => {
  return (
    <View style={{ ...styles.setGroup.repsContainer }}>
      <AddButton
        onPress={() => props.onEditWeight({ index: props.index, cmd: "down" })}
        style={styles.setGroup.button}
        icon={icons.remove}
      />
      <View style={styles.setGroup.texts}>
        <CustomText text="Weight" style={styles.setGroup.label} />
        <CustomText
          text={props.item.weight}
          style={styles.setGroup.labelItem}
        />
      </View>
      <AddButton
        onPress={() => props.onEditWeight({ index: props.index, cmd: "up" })}
        style={styles.setGroup.button}
      />
    </View>
  );
};

const Rest = ({ props }) => {
  return (
    <View style={{ ...styles.setGroup.repsContainer }}>
      <AddButton
        style={styles.setGroup.button}
        icon={icons.remove}
        onPress={() => props.onEditRest({ index: props.index, cmd: "down" })}
      />
      <View style={styles.setGroup.texts}>
        <CustomText text="Rest" style={styles.setGroup.label} />
        <CustomText text={props.item.rest} style={styles.setGroup.labelItem} />
      </View>
      <AddButton
        onPress={() => props.onEditRest({ index: props.index, cmd: "up" })}
        style={styles.setGroup.button}
      />
    </View>
  );
};

const Reps = ({ props }) => {
  return (
    <View style={styles.setGroup.repsContainer}>
      <AddButton
        style={styles.setGroup.button}
        icon={icons.remove}
        onPress={() => props.onEditSets({ index: props.index, cmd: "down" })}
      />
      <View style={styles.setGroup.texts}>
        <CustomText text="Reps" style={styles.setGroup.label} />
        <CustomText text={props.item.sets} style={styles.setGroup.labelItem} />
      </View>
      <AddButton
        style={styles.setGroup.button}
        onPress={() => props.onEditSets({ index: props.index, cmd: "up" })}
      />
    </View>
  );
};

const SelectiveItemList = ({ props }) => {
  return props.viewMode == 0 ? (
    <Reps props={props} />
  ) : props.viewMode == 1 ? (
    <Rest props={props} />
  ) : props.viewMode == 2 ? (
    <Weight props={props} />
  ) : (
    <Notes props={props} />
  );
};

const itemGroup = (props) => {
  return (
    <View style={styles.setGroup.container}>
      <View style={styles.setGroup.setLabelContainer}>
        <CustomText style={styles.setGroup.setLabel} text={props.index + 1} />
      </View>

      <SelectiveItemList props={props} />

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => props.onDeleteSet({ index: props.index })}
      >
        <Image source={icons.delete} style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );
};

const ExercisesSets = ({ navigation, route }) => {
  //const { current } = useCardAnimation();

  const { exercise, routine } = route.params;
  const [viewMode, setViewMode] = useState(0);
  const [exerciseData, setExerciseData] = useState(setModel);

  const setModel = [{ rest: 0, sets: 0, weight: 0 }];

  useEffect(() => {
    if (exercise.sets) {
      const _exerciseData = Object.keys(exercise.sets).map((index) => {
        return {
          sets: exercise.sets[index],
          rest: exercise.rest[index],
          weight: exercise.weight[index],
          notes: exercise.notes[index],
        };
      });
      setExerciseData(_exerciseData);
    }
  }, [exercise]);

  const handleOnGoBack = () => {
    navigation.goBack();
  };

  const handleAddNewSet = () => {
    setExerciseData((prev) => {
      if (exerciseData.length != 0) {
        return [...prev, prev[exerciseData.length - 1]];
      } else {
        return setModel;
      }
    });
  };

  const onDeleteSet = ({ index }) => {
    setExerciseData((prev) => {
      const newSetList = [...prev];
      newSetList.splice(index, 1);
      return newSetList;
    });
  };

  const onEditNotes = (note) => {
    setExerciseData((prev) => {
      const newSetList = [...prev];
      newSetList[note.index].notes = note.text;
      return newSetList;
    });
  };

  const onEditSets = (set) => {
    setExerciseData((prev) => {
      const newSetList = [...prev];
      newSetList[set.index].sets =
        set.cmd == "up"
          ? newSetList[set.index].sets + 1
          : newSetList[set.index].sets != 0
          ? newSetList[set.index].sets - 1
          : 0;
      return newSetList;
    });
  };

  const onEditRest = (rest) => {
    setExerciseData((prev) => {
      const newSetList = [...prev];
      newSetList[rest.index].rest =
        rest.cmd == "up"
          ? newSetList[rest.index].rest + 1
          : newSetList[rest.index].rest != 0
          ? newSetList[rest.index].rest - 1
          : 0;
      return newSetList;
    });
  };

  const onEditWeight = (weight) => {
    setExerciseData((prev) => {
      const newSetList = [...prev];
      newSetList[weight.index].weight =
        weight.cmd == "up"
          ? newSetList[weight.index].weight + 0.25
          : newSetList[weight.index].weight != 0
          ? newSetList[weight.index].weight - 0.25
          : 0;
      return newSetList;
    });
  };

  return (
    <Pressable style={styles.container} onPress={navigation.goBack}>
      <Animated.View
        style={{
          ...styles.modal,
          /* transform: [
            {
              scale: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
                extrapolate: "clamp",
              }),
            },
          ], */
        }}
      >
        <View style={styles.header}>
          <IconButton
            icon={icons.back}
            backgroundColor={"transparent"}
            onPress={handleOnGoBack}
          />
          <CustomText style={styles.title} text={"Sets for this exercise"} />
          <View style={{ width: 25 }}></View>
        </View>
        <View style={styles.menuBar}>
          <IconButton
            size={15}
            icon={icons.reps}
            iconStyle={{ width: 22, height: 22 }}
            backgroundColor={colors.background.primary}
            onPress={() => setViewMode(0)}
          />

          <IconButton
            size={15}
            icon={icons.weight}
            iconStyle={{ width: 22, height: 22 }}
            backgroundColor={colors.background.primary}
            onPress={() => setViewMode(2)}
          />

          <IconButton
            size={15}
            icon={icons.rest}
            iconStyle={{ width: 22, height: 22 }}
            backgroundColor={colors.background.primary}
            onPress={() => setViewMode(1)}
          />

          <IconButton
            size={15}
            icon={icons.notes}
            iconStyle={{ width: 22, height: 22 }}
            backgroundColor={colors.background.primary}
            onPress={() => setViewMode(3)}
          />
        </View>
        <FlatList
          style={styles.list}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          data={exerciseData}
          renderItem={({ item, index }) =>
            itemGroup({
              item,
              index,
              viewMode,
              onDeleteSet,
              onEditSets,
              onEditWeight,
              onEditNotes,
              onEditRest,
            })
          }
        />
        <TouchableOpacity style={styles.newSetButton} onPress={handleAddNewSet}>
          <Image source={icons.add} style={styles.newSetIcon} />
          <CustomText text="Add new set" style={styles.newSetButtonText} />
        </TouchableOpacity>
      </Animated.View>
    </Pressable>
  );
};

export default ExercisesSets;
