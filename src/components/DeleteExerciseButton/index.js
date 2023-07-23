import IconButton from "../IconButton";
import { Alert } from "react-native";
import { icons } from "../../theme/icons";
import { removeExercise } from "../../store/exercises/exercises.slice";
import { useDispatch } from "react-redux";
import colors from "../../theme/colors";

const DeleteExercise = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { exercise } = route.params;

  const handleOnDeleteExercise = () => {
    Alert.alert(
      "Delete exercise",
      "Are you shure about to delete this exercise",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            //deleteExercise({exerciseID})
            dispatch(removeExercise(exercise));
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <IconButton
      onPress={handleOnDeleteExercise}
      icon={icons.delete}
      iconTintColor={colors.foreground.informative}
      backgroundColor={colors.background.secondary}
    />
  );
};

export default DeleteExercise;
