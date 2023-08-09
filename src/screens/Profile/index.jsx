import { View } from "react-native";
import styles from "./styles";
import { ProfilePicture } from "../../components";
import {
  requestCameraPermissionsAsync,
  launchCameraAsync,
} from "expo-image-picker";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetUserDataQuery, useUpdateUserDataMutation} from "../../store/user/user.API";

const Profile = () => {

  const [profilePicture, setProfilePicture] = useState()
  const { localId :  userID} = useSelector(store => store.auth.user)
  const {data: userData, isSuccess, isError} = useGetUserDataQuery({userID})
  const [ updateUserData ] = useUpdateUserDataMutation()

  useEffect(() => {
    if (!userData) return
    setProfilePicture(userData[Object.keys(userData)[0]].profilePic)
  }, [isSuccess])

  const handleChangeProfilePicture = async () => {
    try {
      const permision = await verifyPermissions();
      if (!permision) {
        alert("Permission to access camera was denied");
        return;
      }
      await takePictureAsync()
    } catch (e) {
      console.log(e);
    }
  };

  const saveProfilePicture = async (picture) => {
    setProfilePicture(picture)

    updateUserData({
      userID: userID, 
      firebaseID: Object.keys(userData)[0], 
      name:"", 
      mail: userData.mail, 
      profilePic: picture
    })
  }

  const takePictureAsync = async () => {
    const result = await launchCameraAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: .6,
      base64: true,
    })
    if (result.canceled == false)
    setProfilePicture(`data:image/jpeg;base64, ${result.assets[0].base64}`)
    saveProfilePicture(`data:image/jpeg;base64, ${result.assets[0].base64}`)
  }

  const verifyPermissions = async () => {
    try {
      const {status} = await requestCameraPermissionsAsync();
      return status == "granted";
    } catch {
      (error) => {
        console.log(error);
        return false;
      };
    }
  };

  return (
    <View style={styles.container}>
      <ProfilePicture onChagePicture={handleChangeProfilePicture} profilePicture={profilePicture}/>
    </View>
  );
};

export default Profile;
