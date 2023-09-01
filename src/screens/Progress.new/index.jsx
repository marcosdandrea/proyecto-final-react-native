import { Alert, Image, ScrollView, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import {
  CustomText,
  IconButton,
  InputTextLabeled,
  StandarIconButton,
} from "../../components";
import { colors } from "../../theme";
import { useState } from "react";
import { icons } from "../../theme/icons";
import * as ImagePicker from "expo-image-picker"
import {
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
  launchCameraAsync,
  launchImageLibraryAsync
} from "expo-image-picker";
import { images } from "../../theme/images";
import { useDispatch, useSelector } from "react-redux";
import { _addProgress } from "../../store/progress/progress.services";
import { getProgress } from "../../database";
import Constants from "expo-constants"

const NewProgress = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const loadProgress = route.params?.progress || null;
  const progresses = useSelector(state => state.progress)

  if (loadProgress) {
    console.warn(loadProgress)
    getProgress({ id: loadProgress })
      .then((progress) => {
        setHeight(progress.rows._array[0].height);
        setWeight(progress.rows._array[0].weight);
        setFrontPic(progress.rows._array[0].frontPic);
        setBackPic(progress.rows._array[0].backPic);
        setSidePic(progress.rows._array[0].sidePic);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [frontPic, setFrontPic] = useState();
  const [backPic, setBackPic] = useState();
  const [sidePic, setSidePic] = useState();
  const date = new Date();
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const [today] = useState(date.toLocaleDateString("es-ES", options));

  const takePictureAsync = async (view) => {
    try {
      const authorized = await verifyCameraPermissions();
      if (!authorized) return;
      const result = await launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [9, 16],
        quality: 0.6,
        base64: true,
      });

      if (result.canceled != false) return;
      const image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      view == "front"
        ? setFrontPic(image)
        : view == "side"
        ? setSidePic(image)
        : setBackPic(image);
    } catch (e) {
      console.warn(e.message);
    }
  };

  const verifyCameraPermissions = async () => {
    try {
      const { status } = await requestMediaLibraryPermissionsAsync() //requestCameraPermissionsAsync();
      return status == "granted";
    } catch {
      (error) => {
        console.log(error);
        return false;
      };
    }
  };

  const onHandleSave = () => {
    if (height.length === 0 || weight.length === 0) {
      Alert.alert("Please enter a height and weight");
      return;
    }
    if (!sidePic || !frontPic || !backPic) {
      Alert.alert("Please take all three pictures before saving");
      return;
    }
    const date = new Date().getTime();
    const props = { date, weight, height, frontPic, sidePic, backPic }
    dispatch((dispatch, getState) => _addProgress(dispatch, getState, props))
    navigation.goBack()
  };

  return (
    <View style={{...styles.container, paddingTop: Constants.statusBarHeight + 15}}>
      <View style={styles.header}>
        <IconButton icon={icons.back} onPress={()=>navigation.goBack()} backgroundColor="transparent" buttonProps={styles.goBack}/>
        <CustomText text={loadProgress ? "Your Records" : "Your Progress"} style={styles.title} />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        horizontal={false}
      >
      {loadProgress ? (
        <></>
      ) : (
        <CustomText
          style={styles.text}
          text={
            "Write in your weight and height, along with uploading three photos: front, back, and side profiles, for precise visual tracking. We recommend taking these photos on an empty stomach, preferably in the morning, for consistent results. Your data is private and will aid you on your fitness journey."
          }
        />
      )}
      <CustomText text={today} style={styles.date} />
      {loadProgress ? (
        <View style={styles.progressData}>
          <CustomText style={styles.progressLabel} text="Heigth (cm): " />
          <CustomText style={styles.progressValue} text={height} />
        </View>
      ) : (
        <InputTextLabeled
          onChangeText={setHeight}
          props={styles.inputText}
          value={String(height)}
          label={"Height"}
          keyboardType="decimal-pad"
          containerBackgroundColor={colors.background.primary}
        />
      )}
      {loadProgress ? (
        <View style={styles.progressData}>
          <CustomText style={styles.progressLabel} text="Weigth (kg): " />
          <CustomText style={styles.progressValue} text={weight} />
        </View>
      ) : (
        <InputTextLabeled
          onChangeText={setWeight}
          props={styles.inputText}
          value={String(weight)}
          label={"Weight"}
          keyboardType="decimal-pad"
          containerBackgroundColor={colors.background.primary}
        />
      )}
      <View style={styles.picturesContainer}>
        <View>
          <TouchableOpacity onPress={() => takePictureAsync("front")} style={styles.pictureContainerIndividual}>
            <Image
              style={styles.picture}
              resizeMode="contain"
              source={frontPic ? { uri: frontPic } : images.front}
            />
          </TouchableOpacity>
          <CustomText text={"Front"} style={styles.text} />
        </View>
        <View>
          <TouchableOpacity onPress={() => takePictureAsync("side")} style={styles.pictureContainerIndividual}>
            <Image
              style={styles.picture}
              resizeMode="contain"
              source={sidePic ? { uri: sidePic } : images.side}
            />
          </TouchableOpacity>
          <CustomText text={"Side"} style={styles.text} />
        </View>
        <View>
          <TouchableOpacity onPress={() => takePictureAsync("back")} style={styles.pictureContainerIndividual}>
            <Image
              style={styles.picture}
              resizeMode="contain"
              source={backPic ? { uri: backPic } : images.back}
            />
          </TouchableOpacity>
          <CustomText text={"Back"} style={styles.text} />
        </View>
      </View>
      {loadProgress ? (
        <></>
      ) : (
        <StandarIconButton
          buttonProperties={styles.button}
          text="Save"
          onPress={onHandleSave}
          icon={icons.save}
        />
      )}
      </ScrollView>
    </View>
  );
};

export default NewProgress;
