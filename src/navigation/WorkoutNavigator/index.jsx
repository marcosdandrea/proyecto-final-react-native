import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Workout } from "../../screens"

const StackNavigator = createNativeStackNavigator()

const WorkoutNavigator = () => {
    return (
        <StackNavigator.Navigator initialRouteName="Workout">
            <StackNavigator.Screen name="Workout" component={Workout}/>
        </StackNavigator.Navigator>
    )
}

export default WorkoutNavigator