import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Workout } from "../../screens";
import { AddButton, Header } from "../../components";
import { icons } from "../../theme/icons";
import { colors } from "../../theme";
import { useSelector } from "react-redux";
import FinishWorkout from "../../components/FinishWorkout";

const StackNavigator = createNativeStackNavigator();

const RoutineHeader = ({ route, navigation }) => {
  const workout = useSelector((store) => store.workout.workout || {}) ;

  return (
    <Header title={"Workout"}>
      {Object.keys(workout).length > 0 ? (
        <AddButton
          icon={icons.stop}
          style={{ backgroundColor: colors.foreground.primary }}
          onPress={()=>navigation.navigate("Finish Workout")}
        />
      ) : (
        <></>
      )}
    </Header>
  );
};

const WorkoutNavigator = () => {
  return (
    <StackNavigator.Navigator initialRouteName="Workout">
      <StackNavigator.Screen
        name="Workout"
        component={Workout}
        options={{
          header: ({ route, navigation }) => RoutineHeader({ route, navigation }),
        }}
      />
    <StackNavigator.Screen
        name="Finish Workout"
        component={FinishWorkout}
        options={{
          headerShown: false,
          presentation: "transparentModal"
        }}
      />
    </StackNavigator.Navigator>
  );
};

export default WorkoutNavigator;
