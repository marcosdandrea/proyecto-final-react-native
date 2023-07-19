import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Routines } from "../../screens";
import { AddButton, Header } from "../../components";

const StackNavigator = createNativeStackNavigator();

const RoutineNavigator = () => {
  return (
    <StackNavigator.Navigator initialRouteName="Routines">
      <StackNavigator.Screen 
      name="Routines" 
      options={{
        header: ()=>
            <Header title={"Routines"}>
                <AddButton/>
            </Header>
      }}
      component={Routines} />
    </StackNavigator.Navigator>
  );
};

export default RoutineNavigator;
