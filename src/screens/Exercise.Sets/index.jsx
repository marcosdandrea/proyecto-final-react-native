import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import {
  AddButton,
  CustomText,
  IconButton,
  CustomQuickTip,
} from "../../components";
import { icons } from "../../theme/icons";
import { colors } from "../../theme";
import { useContext, useEffect, useRef, useState } from "react";
import {
  useAddExerciseToRoutineMutation,
  usePatchRoutineExerciseMutation,
} from "../../store/routines/routines.API";
import { useGetExercisesQuery } from "../../store/exercises/exercises.API";
import { QuickTipContext } from "../../components/CustomQuickTip";

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
  const options = [
    { key: 0, value: 1.25 },
    { key: 1, value: 2.5 },
    { key: 2, value: 5 },
    { key: 3, value: 10 },
    { key: 4, value: 15 },
    { key: 5, value: 20 },
  ]

  const onSelectQuickTip = (selected) => {
    props.onEditWeight({ index: props.index, value: selected.value })
  }

  const onReduceValue = () => {
    if (props.item.sets == 0) return
    const value = parseInt(props.item.weight)-1
    props.onEditWeight({ index: props.index, value })
  }

  const onIncreaseValue = () => {
    const value = parseInt(props.item.weight)+1
    props.onEditWeight({ index: props.index, value })
  }

  return (
    <View style={styles.setGroup.repsContainer}>
      <AddButton
        style={styles.setGroup.button}
        icon={icons.remove}
        onPress={onReduceValue}
      />
      <View style={styles.setGroup.texts}>
        <CustomText text="Weight" style={styles.setGroup.label} />
        <CustomText text={props.item.weight} style={styles.setGroup.labelItem} />
      </View>
      <AddButton
        style={styles.setGroup.button}
        onPress={onIncreaseValue}
      />
      <QuickTipButton 
      options={options}
      callback={onSelectQuickTip}
      />
    </View>
  );
};

const Rest = ({ props }) => {
  const options = [
    { key: 0, value: 15 },
    { key: 1, value: 30 },
    { key: 2, value: 45 },
    { key: 3, value: 60 },
  ]

  const onSelectQuickTip = (selected) => {
    props.onEditRest({ index: props.index, value: selected.value })
  }

  const onReduceValue = () => {
    if (props.item.sets == 0) return
    const value = parseInt(props.item.rest)-1
    props.onEditRest({ index: props.index, value })
  }

  const onIncreaseValue = () => {
    const value = parseInt(props.item.rest)+1
    props.onEditRest({ index: props.index, value })
  }

  return (
    <View style={styles.setGroup.repsContainer}>
      <AddButton
        style={styles.setGroup.button}
        icon={icons.remove}
        onPress={onReduceValue}
      />
      <View style={styles.setGroup.texts}>
        <CustomText text="Rest" style={styles.setGroup.label} />
        <CustomText text={props.item.rest} style={styles.setGroup.labelItem} />
      </View>
      <AddButton
        style={styles.setGroup.button}
        onPress={onIncreaseValue}
      />
      <QuickTipButton 
      options={options}
      callback={onSelectQuickTip}
      />
    </View>
  );
};

const Reps = ({ props }) => {
  const options = [
    { key: 0, value: 6 },
    { key: 1, value: 8 },
    { key: 2, value: 10 },
    { key: 3, value: 12 },
    { key: 4, value: 15 },
  ];

  const onSelectQuickTip = (selected) => {
    props.onEditSets({ index: props.index, value: selected.value })
  }

  const onReduceValue = () => {
    if (props.item.sets == 0) return
    const value = parseInt(props.item.sets)-1
    props.onEditSets({ index: props.index, value })
  }

  const onIncreaseValue = () => {
    const value = parseInt(props.item.sets)+1
    props.onEditSets({ index: props.index, value })
  }

  return (
    <View style={styles.setGroup.repsContainer}>
      <AddButton
        style={styles.setGroup.button}
        icon={icons.remove}
        onPress={onReduceValue}
      />
      <View style={styles.setGroup.texts}>
        <CustomText text="Reps" style={styles.setGroup.label} />
        <CustomText text={props.item.sets} style={styles.setGroup.labelItem} />
      </View>
      <AddButton
        style={styles.setGroup.button}
        onPress={onIncreaseValue}
      />
      <QuickTipButton 
      options={options}
      callback={onSelectQuickTip}
      />
    </View>
  );
};

const QuickTipButton = ({options, callback}) => {
  const quickTip = useContext(QuickTipContext);
  const [thisBtnPosition, setThisBtnPosition] = useState()
  const buttonRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      const button = buttonRef.current;
      button.measure((fx, fy, width, height, px, py) => {
        if (px !== null) 
        setThisBtnPosition({ x: px + 15, y: py + 30});
      });
    }, 0);
  }, []);

  const showQuickTip = ()=>{
    quickTip.setCallback({f: callback})
    quickTip.setOptionList(options)
    quickTip.setBtnPosition(thisBtnPosition);
    quickTip.setShow(prev => !prev);
  }

  return (
    <View ref={buttonRef}>
      <AddButton
        icon={icons.bolt}
        iconStyle={{ width: 20, height: 20, tintColor: "white" }}
        style={styles.setGroup.quickTipButton}
        onPress={showQuickTip}
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
  const { exercise, routine, index, removeExercise } = route.params;
  const [viewMode, setViewMode] = useState(0);
  const setModel = [
    {
      rest: [0],
      sets: [0],
      weight: [0],
      notes: [""],
      exerciseID: exercise.exerciseID || exercise.key,
    },
  ];
  const [exerciseData, setExerciseData] = useState(setModel);

  const [triggerPatchRoutine, {}] = usePatchRoutineExerciseMutation();

  const [addExerciseToRoutine, {}] = useAddExerciseToRoutineMutation();

  useEffect(() => {
    if (exercise.sets) {
      const _exerciseData = Object.keys(exercise.sets).map((index) => {
        return {
          sets: exercise.sets[index],
          rest: exercise.rest[index],
          weight: exercise.weight[index],
          notes: exercise.notes[index],
          exerciseID: exercise.exerciseID,
        };
      });
      setExerciseData(_exerciseData);
    }
  }, [exercise]);


  const handleOnSaveSets = () => {
    if (!exerciseData) return;
    let parsedExercises = {
      notes: [],
      sets: [],
      rest: [],
      weight: [],
      exerciseID: exerciseData[0].exerciseID,
    };
    Object.keys(exerciseData).forEach((set) => {
      parsedExercises.sets[set] = exerciseData[set].sets;
      parsedExercises.rest[set] = exerciseData[set].rest;
      parsedExercises.weight[set] = exerciseData[set].weight;
      parsedExercises.notes[set] = exerciseData[set].notes;
    });
    saveRoutine({ parsedExercises });
    navigation.goBack();
  };

  const saveRoutine = async ({ parsedExercises }) => {
    try {
      triggerPatchRoutine({
        exercise: parsedExercises,
        routineID: routine.key,
        index: index || routine.exercises.length,
      });
    } catch (err) {
      console.warn(err);
    }
  };

  const handleOnGoBack = () => {
    navigation.goBack();
  };

  const handleAddNewSet = () => {
    setExerciseData((prev) => {
      if (exerciseData && exerciseData.length != 0) {
        const newSet = JSON.parse(JSON.stringify(prev[exerciseData.length - 1]))
        return [...prev, newSet];
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
      newSetList[set.index].sets = set.value
      return newSetList;
    });
  };

  const onEditRest = (rest) => {
    setExerciseData((prev) => {
      const newSetList = [...prev];
      newSetList[rest.index].rest = rest.value
      return newSetList;
    });
  };

  const onEditWeight = (weight) => {
    setExerciseData((prev) => {
      const newSetList = [...prev];
      newSetList[weight.index].weight = weight.value
      return newSetList;
    });
  };
  
  const handleOnRemoveExercise = ()=> {
    removeExercise()
    navigation.goBack()
  }
  return (
    
      <Pressable style={styles.container}>
        <CustomQuickTip>
        <View style={styles.modal}>
          <View style={styles.header}>
            <IconButton
              icon={icons.back}
              backgroundColor={"transparent"}
              onPress={handleOnGoBack}
            />
            <CustomText style={styles.title} text={"Sets for this exercise"} />
            <IconButton
              onPress={handleOnSaveSets}
              icon={icons.save}
              iconStyle={{ width: 22, height: 22 }}
              backgroundColor={colors.foreground.secondary}
              borderRadius={5}
              size={15}
            />
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

          <TouchableOpacity
            style={styles.newSetButton}
            onPress={handleAddNewSet}
          >
            <Image source={icons.add} style={styles.newSetIcon} />
            <CustomText text="Add new set" style={styles.newSetButtonText} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={handleOnRemoveExercise}
          >
            <Image source={icons.garbage} style={styles.newSetIcon} />
            <CustomText
              text="Remove exercise"
              style={styles.newSetButtonText}
            />
          </TouchableOpacity>
        </View>
        </CustomQuickTip>
      </Pressable>
      
  );
};

export default ExercisesSets;
