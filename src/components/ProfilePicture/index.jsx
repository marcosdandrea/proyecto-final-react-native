import { Image, View } from "react-native";
import styles from "./styles";
import { images } from "../../theme/images";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "../CustomText";

const ProfilePicture = ({onChagePicture, profilePicture}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image style={styles.profilePic} source={{uri: profilePicture}} />
      </View>
      <TouchableOpacity onPress={onChagePicture}>
        <CustomText
          text={"Change Profile Picture"}
          style={styles.changeProfilePictureText}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePicture;
