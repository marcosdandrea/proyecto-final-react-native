import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import {
  DashboardNavigator,
  ExercisesNavigator,
  ProfileNavigator,
  RoutinesNavigator,
  WorkoutNavigator,
} from "..";
import { Fonts } from "../../../assets/fonts/FontProvider";
import colors from "../../theme/colors";
import { icons } from "../../theme/icons";
import { Image, View } from "react-native";
import { MainButtonTab } from "../../components";

const BottomTab = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
        <BottomTab.Navigator
          initialRouteName="ExercisesNavigator"
          screenOptions={{
            headerShown: false,
            tabBarLabelStyle: {
              fontFamily: Fonts.Bold,
              fontSize: 12,
            },
            tabBarStyle: {
              borderTopWidth: 1,
              borderTopColor: colors.background.disabled,
              backgroundColor: colors.background.secondary,
            },
            tabBarActiveTintColor: colors.foreground.white,
            tabBarInactiveTintColor: colors.background.disabled,
            tabBarIconStyle: {
              fontSize: 22,
            },
          }}
        >
          <BottomTab.Screen
            name="DashboardNavigator"
            options={{
              tabBarLabel: "Dashboard",
              tabBarIcon: ({ focused, color, size }) => (
                <MaterialCommunityIcons
                  name={focused ? "view-dashboard" : "view-dashboard-outline"}
                  size={22}
                  color={color}
                />
              ),
            }}
            component={DashboardNavigator}
          />
          <BottomTab.Screen
            name="RoutinesNavigator"
            options={{
              tabBarLabel: "Routines",
              tabBarIcon: ({ focused, color, size }) => (
                <FontAwesome5 name={"tasks"} size={22} color={color} />
              ),
            }}
            component={RoutinesNavigator}
          />
          <BottomTab.Screen
            name="WorkoutNavigator"
            options={{
              tabBarBadge: 45,
              tabBarBadgeStyle: {
                top: -20,
                left: 10,
                backgroundColor: colors.background.primary,
              },
              tabBarLabel: "",
              tabBarIcon: ({ focused }) => (
                <MainButtonTab
                  focused={focused}
                  size={70}
                  tabBarColor={colors.background.secondary}
                />
              ),
            }}
            component={WorkoutNavigator}
          />
          <BottomTab.Screen
            name="ExercisesNavigator"
            options={{
              tabBarLabel: "Exercises",
              tabBarIcon: ({ focused, color, size }) => (
                <Image
                  source={icons.exercises}
                  style={{
                    width: 22,
                    height: 22,
                    tintColor: focused
                      ? colors.foreground.white
                      : colors.background.disabled,
                  }}
                />
              ),
            }}
            component={ExercisesNavigator}
          />
          <BottomTab.Screen
            name="ProfileNavigator"
            options={{
              tabBarLabel: "You",
              tabBarIcon: ({ focused, color, size }) => (
                <FontAwesome5 name={"user-circle"} size={22} color={color} />
              ),
            }}
            component={ProfileNavigator}
          />
        </BottomTab.Navigator>
  );
};

export default TabsNavigator;
