import { NavigationContainer } from '@react-navigation/native'
import TabsNavigator from '../TabsNavigator'
import AuthNavigator from '../AuthNavigation'
import { useSelector } from 'react-redux'

const RootNavigator = () => {
    const auth = useSelector((state) => state.auth.user);
    return (
        <NavigationContainer>
            {auth?.localId ? <TabsNavigator/> : <AuthNavigator/>}
        </NavigationContainer>
    )
}

export default RootNavigator