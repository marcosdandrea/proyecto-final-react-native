import IconButton from "../IconButton";
import { useContext } from "react";
import { Alert } from "react-native";
import DatabaseContext from "../../contexts/DatabaseContext";
import { icons } from "../../theme/icons";

const DeleteExercise = ({navigation, route }) => {
    const { deleteExercise } = useContext(DatabaseContext)
  
    const handleOnDeleteExercise = () => {
        const exerciseID = route.params.exerciseID
        console.log (exerciseID)
        Alert.alert("Delete exercise", "Are you shure about to delete this exercise",[
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                deleteExercise({exerciseID})
                navigation.goBack()
            }},
          ]);
    
    }
  
    return(
      <IconButton onPress={handleOnDeleteExercise} icon={icons.delete}/>
    )
  }

  export default DeleteExercise