import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {Auth} from "../../screens"

const StackNavigator = createNativeStackNavigator()

const AuthNavigator = () => {
    return (
        <StackNavigator.Navigator initialRouteName="Profile">
            <StackNavigator.Screen name="Profile" component={Auth}/>
        </StackNavigator.Navigator>
    )
}

export default AuthNavigator