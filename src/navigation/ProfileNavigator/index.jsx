import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Profile } from "../../screens";
import Progress from "../../screens/Progress";
import { Header, ProfilePicture } from "../../components";
import { useGetUserDataQuery } from "../../store/user/user.API";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NewProgress from "../../screens/Progress.new";

const StackNavigator = createNativeStackNavigator();

const ProfileHeader = ({ route, navigation }) => {
  const { localId: userID } = useSelector((store) => store.auth.user);
  const { data: userData, isSuccess } = useGetUserDataQuery({ userID });

  const [profilePicture, setProfilePicture] = useState();

  useEffect(() => {
    if (userData) setProfilePicture(userData.profilePic);
  }, [isSuccess]);

  return (
    <Header title={"Profile"}>
      <ProfilePicture
        style={{ width: 30, height: 320 }}
        showChangeText={false}
        onChagePicture={() => {
          navigation.navigate("Profile");
        }}
        profilePicture={profilePicture}
      />
    </Header>
  );
};

const ProfileNavigator = () => {
  return (
    <StackNavigator.Navigator initialRouteName="Progress">
      <StackNavigator.Screen name="Profile" component={Profile} />
      <StackNavigator.Screen
        name="Progress"
        component={Progress}
        options={{
          header: ({ route, navigation }) =>
            ProfileHeader({ route, navigation }),
        }}
      />
      <StackNavigator.Screen
        name="New Progress"
        component={NewProgress}
        options={{
          headerShown: false
        }}
      />
    </StackNavigator.Navigator>
  );
};

export default ProfileNavigator;
