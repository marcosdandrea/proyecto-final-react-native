import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dashboard } from "../../screens";

const StackNavigator = createNativeStackNavigator();

const DashboardNavigator = () => {
  return (
    <StackNavigator.Navigator initialRouteName="Dashboard">
      <StackNavigator.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
    </StackNavigator.Navigator>
  );
};

export default DashboardNavigator;
