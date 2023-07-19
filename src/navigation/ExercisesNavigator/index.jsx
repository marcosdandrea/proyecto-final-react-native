import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import { View } from "react-native";

import Exercises from "../../screens/Exercises";
import Header from "../../components/Header/Header";
import AddButton from "../../components/AddButton";
import EditExercise from "../../screens/Exercises.Edit";
import DeleteExercise from "../../components/DeleteExerciseButton";

const ExerciseView = ({route, navigation}) => {
  return(
    <View style={{flex: 1}}>
      <Exercises route={route} navigation={navigation}/>
    </View>
  )
}

function ExercisesNavigator() {
  return (
    <Stack.Navigator initialRouteName="Exercises">

      <Stack.Screen name="Exercises"
        options={({ route, navigation }) => ({
          presentation: "card",
          header: () => (
            <Header title={route.name}>
              <AddButton onPress={() => navigation.navigate("Edit Exercise")} />
            </Header>
          ),
        })}
        component={ExerciseView}/>

      <Stack.Screen name="Edit Exercise"
        options={({ navigation, route }) => ({
          presentation: "modal",
          headerRight: () => DeleteExercise({ navigation, route }),
        })}
        component={EditExercise}/>
      
    </Stack.Navigator>
  );
}

export default ExercisesNavigator;
