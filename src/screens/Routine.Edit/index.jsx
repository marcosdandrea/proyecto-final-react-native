import { ActivityIndicator, View } from "react-native";
import { styles } from "./style";
import {
  CustomText,
  IconButton,
  InputTextLabeled,
  StandarIconButton,
} from "../../components";
import { icons } from "../../theme/icons";
import { colors } from "../../theme";
import { useEffect, useState } from "react";
import {
  useDeleteRoutineMutation,
  useGetSingleRoutineQuery,
  useSaveRoutineMutation,
} from "../../store/routines/routines.API";
import uuid from "react-native-uuid";

const RoutineEdit = ({ navigation, route }) => {
  const { routine, promptDelete = false } =
    route?.params || {};

  const handleGoBack = () => navigation.goBack();
  const [saveRoutine] = useSaveRoutineMutation();
  const [deleteRoutine] = useDeleteRoutineMutation();
  const [modalTitle, setModalTitle] = useState("Create Routine");
  const [routineName, setRoutineName] = useState("New Routine");
  const [buttonLabel, setButtonLabel] = useState("Save Routine");
  const [enableButton, setEnableButton] = useState(true);
  const [inputError, setInputError] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);


  useEffect(() => {
    if (!routine) return;
    setModalTitle("Edit Routine");
    setRoutineName(routine.name);
    setButtonLabel("Change Routine Name");

    if (!promptDelete) return;
    setConfirmDelete(true);
  }, [routine, promptDelete]);

  const handleOnDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    if (routine) {
      deleteRoutine({ key: routine.key });
      navigation.goBack();
    } else {
      navigation.goBack();
    }
  };

  const onChangeRoutineName = (value) => {
    setRoutineName(value);
    if (value == "") {
      setInputError("Cannot be empty");
      setEnableButton(false);
    } else {
      setInputError("");
      setEnableButton(true);
    }
  };

  const onSaveRoutine = () => {
    let routineToSave = undefined;
    const key = routine?.key || uuid.v4();

    routineToSave = routine
      ? { exercises: routine.exercises, name: routineName }
      : { exercises: [], name: routineName };

    saveRoutine({ routine: routineToSave, key });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <IconButton
              icon={icons.back}
              onPress={handleGoBack}
              backgroundColor={colors.background.secondary}
            />
            <CustomText text={modalTitle} style={styles.modalTitle} />

            <IconButton
              onPress={handleOnDelete}
              icon={icons.delete}
              buttonProps={{ opacity: confirmDelete ? 0 : 1 }}
              disabled={confirmDelete}
              backgroundColor={colors.background.secondary}
            />
          </View>

          {confirmDelete ? (
            <View style={styles.warningBox}>
              <CustomText
                text={
                  "Are you sure you want to delete this routine? All its content will be deleted along with it."
                }
                style={styles.warningText}
              />
              <StandarIconButton
                onPress={handleOnDelete}
                icon={icons.delete}
                text={"Delete"}
                buttonProperties={{
                  backgroundColor: colors.foreground.primary,
                }}
              />
            </View>
          ) : (
            <View style={styles.mainContainer}>
              <InputTextLabeled
                label={"Routine Name"}
                error={inputError}
                onChangeText={onChangeRoutineName}
                value={routineName}
                style={styles.routineNameInput}
                containerBackgroundColor={colors.background.secondary}
              />
              <StandarIconButton
                onPress={onSaveRoutine}
                enabled={enableButton}
                icon={icons.save}
                text={buttonLabel}
                enable={enableButton}
                buttonProperties={{
                  backgroundColor: enableButton
                    ? colors.foreground.secondary
                    : colors.foreground.informative,
                }}
              />
            </View>
          )}
        </View>
      
    </View>
  );
};

export default RoutineEdit;
