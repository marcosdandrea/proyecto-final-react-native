import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {Auth} from "../../screens"

const StackNavigator = createNativeStackNavigator()

const AuthNavigator = () => {
    return (
        <StackNavigator.Navigator initialRouteName="Profile">
            <StackNavigator.Screen 
                name="Profile" 
                component={Auth}
                options={{
                    headerShown: false
                }}/>
        </StackNavigator.Navigator>
    )
}

export default AuthNavigator