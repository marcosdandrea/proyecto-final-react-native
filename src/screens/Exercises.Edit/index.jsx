import { View, Text, Button, TouchableOpacity } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useEffect, useState } from "react";
import Toast from "react-native-root-toast";
import { InputTextLabeled, StandarIconButton } from "../../components";
import colors from "../../theme/colors";
import { styles } from "./styles";
import { icons } from "../../theme/icons";
import {
  useAddNewExercisesMutation,
  useGetCategoriesQuery,
  useGetExercisesQuery,
  useSaveExercisesMutation,
} from "../../store/exercises/exercises.API";

const EditExercise = ({ navigation, route }) => {
  const { exercise } = route.params || { exercise: undefined };
  const { data: _categories } = useGetCategoriesQuery();
  const [createExercise] = useAddNewExercisesMutation();
  const [saveExercise] = useSaveExercisesMutation();
  const { data: exercises, isLoading: loadingExercises } =
    useGetExercisesQuery();

  const [categories, setCategories] = useState([]);
  const [exerciseName, setExerciseName] = useState(
    exercises[exercise.key]?.name || ""
  );
  const [exerciseCategory, setExerciseCategory] = useState();
  const [exerciseDescription, setExerciseDescription] = useState(
    exercises[exercise.key]?.description || ""
  );
  const [exerciseUnit, setExerciseUnit] = useState(
    exercises[exercise.key]?.unit || ""
  );
  const [exerciseIncrement, setExerciseIncrement] = useState(
    exercises[exercise.key]?.increment || ""
  );

  useEffect(() => {
    const newCategories = Object.keys(_categories).map((key) => {
      return { ..._categories[key], key };
    });
    setCategories(newCategories);
  }, [_categories]);

  useEffect(() => {
    if (loadingExercises) return;
    if (
      Object.keys(categories).length == 0 ||
      Object.keys(exercise).length == 0
    )
      return;
    setExerciseCategory(
      categories.find(
        (category) => category.key == exercises[exercise.key].category
      )
    );
  }, [exercises, exercise, categories]);

  const handleSaveExercise = async () => {
    const data = {
      name: exerciseName,
      description: exerciseDescription,
      category: exerciseCategory.key,
      unit: exerciseUnit,
      increment: exerciseIncrement,
    };
    try {
      exercise.key
        ? await saveExercise({ data, key: exercise.key })
        : await createExercise({ data });
      Toast.show("Exercise saved", {
        duration: Toast.durations.SHORT,
      });
      navigation.goBack();
    } catch (e) {
      console.warn(e);
    }
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
          data={["kg", "seg", "unit", "repeticiones"]}
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
