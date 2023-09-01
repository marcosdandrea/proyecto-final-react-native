import { Image, View } from "react-native";
import styles from "./styles";
import { images } from "../../theme/images";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "../CustomText";

const ProfilePicture = ({
  style,
  onChagePicture,
  profilePicture,
  showChangeText = true,
}) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <TouchableOpacity onPress={onChagePicture}>
        <View style={{ ...styles.profileContainer }}>
          <Image
            style={styles.profilePic}
            source={profilePicture ? { uri: profilePicture } : images.avatar}
          />
        </View>
        {showChangeText ? (
          <CustomText
            text={"Change Profile Picture"}
            style={styles.changeProfilePictureText}
          />
        ) : (
          <></>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePicture;
