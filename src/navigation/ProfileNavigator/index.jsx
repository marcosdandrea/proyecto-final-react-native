import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Profile } from "../../screens"

const StackNavigator = createNativeStackNavigator()

const ProfileNavigator = () => {
    return (
        <StackNavigator.Navigator initialRouteName="Profile">
            <StackNavigator.Screen name="Profile" component={Profile}/>
        </StackNavigator.Navigator>
    )
}

export default ProfileNavigator