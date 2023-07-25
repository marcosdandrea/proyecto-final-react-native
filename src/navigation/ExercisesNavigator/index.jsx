import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import { View } from "react-native";

import Exercises from "../../screens/Exercises";
import Header from "../../components/Header/Header";
import AddButton from "../../components/AddButton";
import EditExercise from "../../screens/Exercises.Edit";
import DeleteExercise from "../../components/DeleteExerciseButton";
import { IconButton } from "../../components";
import { icons } from "../../theme/icons";
import { colors } from "../../theme";

const ExerciseView = ({ route, navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Exercises route={route} navigation={navigation} />
    </View>
  );
};

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

function ExercisesNavigator() {
  return (
    <Stack.Navigator initialRouteName="Exercises">
      <Stack.Screen
        name="Exercises"
        options={({ route, navigation }) => ({
          presentation: "card",
          header: () => (
            <Header title={route.name}>
              <AddButton
                onPress={() =>
                  navigation.navigate("Create Exercise", { exercise: {} })
                }
              />
            </Header>
          ),
        })}
        component={ExerciseView}
      />

      <Stack.Screen
        name="Create Exercise"
        options={({ navigation, route }) => ({
          presentation: "modal",
          headerLeft: () => BackButton({ navigation, route }),
        })}
        component={EditExercise}
      />

      <Stack.Screen
        name="Edit Exercise"
        options={({ navigation, route }) => ({
          presentation: "modal",
          headerRight: () => DeleteExercise({ navigation, route }),
          headerLeft: () => BackButton({ navigation, route }),
        })}
        component={EditExercise}
      />
    </Stack.Navigator>
  );
}

export default ExercisesNavigator;
