import { NavigationContainer } from '@react-navigation/native'
import TabsNavigator from '../TabsNavigator'

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <TabsNavigator/>
        </NavigationContainer>
    )
}

export default RootNavigator