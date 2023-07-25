import { View, Text, Button, TouchableOpacity } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputTextLabeled, StandarIconButton } from "../../components";
import colors from "../../theme/colors";
import { styles } from "./styles";
import {
  addExercise,
  saveExercise,
} from "../../store/exercises/exercises.slice";
import { icons } from "../../theme/icons";

const EditExercise = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { exercise } = route.params || { exercise: undefined };
  const _categories = useSelector((state) => state.exercises.categories);
  const [categories, setCategories] = useState([]);

  const [exerciseName, setExerciseName] = useState(exercise.name);
  const [exerciseCategory, setExerciseCategory] = useState();
  const [exerciseDescription, setExerciseDescription] = useState(
    exercise.description
  );
  const [exerciseUnit, setExerciseUnit] = useState(exercise.unit);
  const [exerciseIncrement, setExerciseIncrement] = useState(
    exercise.increment
  );

  useEffect(() => {
    const newCategories = Object.keys(_categories).map((key) => {
      return { ..._categories[key], key };
    });
    setCategories(newCategories);
  }, [_categories]);

  useEffect(() => {
    if (
      Object.keys(categories).length == 0 ||
      Object.keys(exercise).length == 0
    )
      return;
    setExerciseCategory(
      categories.find((category) => category.key == exercise.category.key)
    );
  }, [exercise, categories]);

  const handleSaveExercise = () => {
    const data = {
      name: exerciseName,
      description: exerciseDescription,
      category: exerciseCategory,
      unit: exerciseUnit,
      increment: exerciseIncrement,
      key: exercise.key || 0,
    };
    exercise.key 
      ? dispatch(saveExercise(data)) 
      : dispatch(addExercise(data))
    navigation.goBack();
  };

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
          onSelect={(selectedItem) => setExerciseCategory(selectedItem.key)}
          buttonTextAfterSelection={(selectedItem) => selectedItem.name}
          buttonStyle={styles.dropdown.button}
          buttonTextStyle={styles.dropdown.text}
          dropdownStyle={styles.dropdown.list}
          rowTextStyle={styles.dropdown.text}
          defaultValue={exerciseCategory}
          search
          searchPlaceHolder={"Search here"}
          rowTextForSelection={(item) => item.name}
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
      <StandarIconButton
        icon={icons.done}
        text="Done"
        buttonProperties={{ backgroundColor: colors.foreground.secondary }}
        onPress={handleSaveExercise}
      />
    </View>
  );
};

export default EditExercise;
