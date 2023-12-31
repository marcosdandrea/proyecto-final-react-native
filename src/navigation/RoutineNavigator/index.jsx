import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ExercisesExplorer, Routines } from "../../screens";
import { AddButton, Header, IconButton } from "../../components";
import EditExercise from "../../screens/Exercises.Edit";
import DeleteExercise from "../../components/DeleteExerciseButton";
import { colors } from "../../theme";
import { icons } from "../../theme/icons";
import ExercisesSets from "../../screens/Exercise.Sets";
import RoutineEdit from "../../screens/Routine.Edit";

const StackNavigator = createNativeStackNavigator();

const BackButton = ({ route, navigation }) => {
  return (
    <IconButton
      backgroundColor="transparent"
      icon={icons.back}
      size={30}
      iconTintColor={colors.background.primary}
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
};



const RoutineNavigator = () => {
  return (
    <StackNavigator.Navigator initialRouteName="Routines">
      <StackNavigator.Screen
        name="Routines"
        options={({ navigation, route }) => ({
          header: () => (
            <Header title={"Routines"}>
              <AddButton onPress={()=>navigation.navigate("Routine Editor")}/>
            </Header>
          ),
        })}
        component={Routines}
      />

      <StackNavigator.Screen
        name="Edit Exercise"
        options={({ navigation, route }) => ({
          presentation: "modal",
          headerRight: () => DeleteExercise({ navigation, route }),
          headerLeft: () => BackButton({ navigation, route }),
        })}
        component={EditExercise}
      />

      <StackNavigator.Screen
        name="Exercise Explorer"
        options={({ navigation, route }) => ({
          presentation: "card",
          headerTitle: "Exercise Explorer",
          headerLeft: () => BackButton({ navigation, route }),
        })}
        component={ExercisesExplorer}
      />

      <StackNavigator.Screen
        name="Exercises Sets"
        options={{
          animation: "fade",
          animationTypeForReplace: "pop",
          presentation: "transparentModal",
          headerShown: false,
        }}
        component={ExercisesSets}
      />

      <StackNavigator.Screen
        name="Routine Editor"
        options={{
          animation: "fade",
          animationTypeForReplace: "pop",
          presentation: "transparentModal",
          headerShown: false,
        }}
        component={RoutineEdit}
      />
    </StackNavigator.Navigator>

    
  );
};

export default RoutineNavigator;
