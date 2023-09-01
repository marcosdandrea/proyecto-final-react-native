import { ScrollView, View } from "react-native";
import styles from "./styles";
import {
  InputTextLabeled,
  ProfilePicture,
  StandarIconButton,
} from "../../components";
import {
  requestCameraPermissionsAsync,
  launchCameraAsync,
} from "expo-image-picker";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetUserDataQuery,
  useUpdateUserDataMutation,
} from "../../store/user/user.API";
import { colors } from "../../theme";
import { icons } from "../../theme/icons";

const Profile = () => {
  const { localId: userID } = useSelector((store) => store.auth.user);
  const {
    data: userData,
    isSuccess,
    isError,
  } = useGetUserDataQuery({ userID });
  const [updateUserData] = useUpdateUserDataMutation();

  const [profilePicture, setProfilePicture] = useState();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (!userData) return;
    setProfilePicture(userData.profilePic);
    setAddress(userData.address);
    setName(userData.name);
    setCity(userData.city);
    setCountry(userData.country);
    setPhoneNumber(userData.phoneNumber);
  }, [isSuccess]);

  const handleChangeProfilePicture = async () => {
    try {
      const permision = await verifyPermissions();
      if (!permision) {
        alert("Permission to access camera was denied");
        return;
      }
      await takePictureAsync();
    } catch (e) {
      console.log(e);
    }
  };

  const updateProfileData = async (contentData) => {
    console.log ("Saving", userID, contentData);
    updateUserData({
      userID: userID,
      data: { ...contentData },
    });
  };

  const takePictureAsync = async () => {
    const result = await launchCameraAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
      base64: true,
    });
    if (result.canceled == false)
      setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`);
    updateProfileData({
      profilePic: `data:image/jpeg;base64,${result.assets[0].base64}`,
    });
  };

  const verifyPermissions = async () => {
    try {
      const { status } = await requestCameraPermissionsAsync();
      return status == "granted";
    } catch {
      (error) => {
        console.log(error);
        return false;
      };
    }
  };

  const handleSaveForm = async () => {
    updateProfileData({
      name,
      address,
      city,
      country,
      phoneNumber,
    });
  };

  return (
    <View style={styles.container}>
      <ProfilePicture
        onChagePicture={handleChangeProfilePicture}
        profilePicture={profilePicture}
      />
      <View style={styles.formContainer}>
        <ScrollView contentContainerStyle={styles.formScrollView} >
        <InputTextLabeled
          label={"Name"}
          autoCapitalize="words"
          containerBackgroundColor={colors.background.primary}
          onChangeText={setName}
          value={name}
        />
        <InputTextLabeled
          label={"Address"}
          containerBackgroundColor={colors.background.primary}
          onChangeText={setAddress}
          value={address}
        />
        <InputTextLabeled
          label={"City"}
          containerBackgroundColor={colors.background.primary}
          onChangeText={setCity}
          value={city}
        />
        <InputTextLabeled
          props={{autoComplete: "country"}}
          label={"Country"}
          containerBackgroundColor={colors.background.primary}
          onChangeText={setCountry}
          value={country}
        />
        <InputTextLabeled
          props={{inputMode: "tel", keyboardType: "phone-pad"}}
          label={"Phone Number"}
          containerBackgroundColor={colors.background.primary}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
        />
        <StandarIconButton
          text="Save Profile"
          icon={icons.save}
          onPress={handleSaveForm}
        />
        </ScrollView>
      </View>
    </View>
  );
};

export default Profile;
