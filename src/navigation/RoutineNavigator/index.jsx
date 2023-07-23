import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Routines } from "../../screens";
import { AddButton, Header, IconButton } from "../../components";
import EditExercise from "../../screens/Exercises.Edit";
import DeleteExercise from "../../components/DeleteExerciseButton";
import { colors } from "../../theme";
import { icons } from "../../theme/icons";

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
      options={{
        header: ()=>
            <Header title={"Routines"}>
                <AddButton/>
            </Header>
      }}
      component={Routines} />

      <StackNavigator.Screen name="Edit Exercise"
        options={({ navigation, route }) => ({
          presentation: "modal",
          headerRight: () => DeleteExercise({ navigation, route }),
          headerLeft: () => BackButton({ navigation, route }),
        })}
        component={EditExercise}/>
    </StackNavigator.Navigator>
  );
};

export default RoutineNavigator;
