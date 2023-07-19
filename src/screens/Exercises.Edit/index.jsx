import { View, Text, StyleSheet, Button } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useContext, useEffect, useState } from "react";
import DatabaseContext from "../../contexts/DatabaseContext";
import {InputTextLabeled} from "../../components";
import colors from "../../theme/colors";

const EditExercise = ({ navigation, route }) => {
  const { exerciseID } = route.params || { exerciseID: undefined };
  const { getSingleExercise, categories, saveExercise } = useContext(DatabaseContext);

  const [exerciseName, setExerciseName] = useState();
  const [exerciseCategory, setExerciseCategory] = useState();
  const [exerciseDescription, setExerciseDescription] = useState();
  const [exerciseUnit, setExerciseUnit] = useState();
  const [exerciseIncrement, setExerciseIncrement] = useState();

  useEffect(() => {
    if (!exerciseID) return;
    const exerciseData = getSingleExercise(exerciseID);
    setExerciseName(exerciseData.name)
    setExerciseCategory(exerciseData.category)
    setExerciseDescription(exerciseData.description)
    setExerciseUnit(exerciseData.unit)
    setExerciseIncrement(exerciseData.increment)
}, [exerciseID]);

  const handleSaveExercise = () => {
    const data = {
      name: exerciseName,
      description: exerciseDescription,
      category: exerciseCategory,
      unit: exerciseUnit,
      increment: exerciseIncrement,
    };
    saveExercise({exerciseID, data});
    navigation.goBack()
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background.secondary,
      paddingHorizontal: 20,
      rowGap: 10,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    label: {
      fontFamily: "Poppins-Regular",
      color: colors.foreground.informative,
    },
    dropdown: {
      button: {
        backgroundColor: colors.background.primary,
        height: 40,
        width: "100%",
      },
      text: {
        fontFamily: "Poppins-Regular",
        color: colors.foreground.white,
      },
      list: {
        backgroundColor: colors.background.primary,
      },
      text: {
        color: colors.foreground.white,
        fontFamily: "Poppins-Regular",
      },
    },
    selectorContainer: {
      paddingBottom: 15,
    },
  });

  return (
    <View style={styles.container}>
      <InputTextLabeled
        label="Exercise Name"
        value={exerciseName}
        onChangeText={setExerciseName}
        containerBackgroundColor={colors.background.secondary}
      />
      <View style={styles.selectorContainer}>
        <Text style={styles.label}>Select a category</Text>
        <SelectDropdown
          onSelect={setExerciseCategory}
          buttonStyle={styles.dropdown.button}
          buttonTextStyle={styles.dropdown.text}
          dropdownStyle={styles.dropdown.list}
          rowTextStyle={styles.dropdown.text}
          defaultValue={exerciseCategory}
          data={categories}
        />
      </View>
      <InputTextLabeled
        label="Description"
        onChangeText={setExerciseDescription}
        value={exerciseDescription}
        containerBackgroundColor={colors.background.secondary}
      />
      <View style={styles.selectorContainer}>
        <Text style={styles.label}>Select an unit</Text>
        <SelectDropdown
          onSelect={setExerciseUnit}
          buttonStyle={styles.dropdown.button}
          buttonTextStyle={styles.dropdown.text}
          dropdownStyle={styles.dropdown.list}
          rowTextStyle={styles.dropdown.text}
          defaultValue={exerciseUnit}
          data={["kg", "seg", "unit"]}
        />
      </View>
      <View style={styles.selectorContainer}>
        <Text style={styles.label}>Select an increment interval</Text>
        <SelectDropdown
          onSelect={setExerciseIncrement}
          buttonStyle={styles.dropdown.button}
          buttonTextStyle={styles.dropdown.text}
          dropdownStyle={styles.dropdown.list}
          rowTextStyle={styles.dropdown.text}
          defaultValue={exerciseIncrement}
          data={["0.25", "0.5", "1", "1.25", "2.5", "5"]}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button onPress={handleSaveExercise} title="save" />
      </View>
    </View>
  );
};

export default EditExercise;
