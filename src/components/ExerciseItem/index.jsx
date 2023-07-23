import {
  View,
  FlatList,
  Vibration,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CustomText } from "..";
import { colors } from "../../theme";
import { icons } from "../../theme/icons";
import { styles } from "./styles";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeExercise } from "../../store/exercises/exercises.slice";

const screenWidth = Dimensions.get("window").width
const exerciseItemWidth = screenWidth * 0.93


const ExerciseComponent = ({ item }) => {
  return (
    <LinearGradient
      // Button Linear Gradient
      colors={["#2C383A", colors.foreground.black]}
      end={{ x: 1.5, y: 0 }}
      style={{...styles.container, width: exerciseItemWidth}}
    >
      <View style={styles.mainBody}>
        <View style={styles.textsContainer}>
          <View
            style={{
              ...styles.categoryContainer,
              backgroundColor: colors.background.primary,
            }}
          >
            <CustomText
              style={styles.categoryText}
              text={item.category.name.toUpperCase()}
            />
          </View>
          <CustomText
            style={styles.nameText}
            text={item.name}
            fontWeigth="Medium"
          />
        </View>
      </View>
      <LinearGradient
        style={{...styles.decoration, width: exerciseItemWidth}}
        end={{ x: 0.8, y: 0 }}
        colors={[
          colors.palette[item.category.color],
          colors.background.secondary,
        ]}
      />
    </LinearGradient>
  );
};

const MainComponent = ({ item }) => {
  if (item.key == 0) return (<DeleteComponent/>)
  if (item.key == 1) return (<EditComponent/>)
  return (<ExerciseComponent item={item}/>)
};

const DeleteComponent = () => {
  return <View style={styles.deleteComponent}>
    <Image source={icons.delete} style={styles.icon}/>
  </View>;
};

const EditComponent = () => {
  return <View style={styles.editComponent}>
    <Image source={icons.edit} style={styles.icon}/>
  </View>;
};

const itemLayout = ({ index }) => {
  if (index == 0) return { length: 50, offset: 0, index };
  if (index == 2) return { length: 50, offset: 50 + exerciseItemWidth, index };
  return { length: exerciseItemWidth, offset: 50, index };
};



const ExerciseItem = ({ item, navigation }) => {
  const dispatch = useDispatch()

  const listRef = useRef();
  const [startPosition, setStartPosition] = useState(0);
  const [readyToTrigger, setReadyToTrigger] = useState(false)
  const [deltaMovement, setDeltaMovement] = useState(0)
  const renderItems = [{key: 0}, item, {key: 1}]

  useEffect(()=>{
    if (deltaMovement>45 && !readyToTrigger) {
      setReadyToTrigger(true)
    };
  }, [deltaMovement])

  const handleOnDeleteExercise = ({exercise}) => {
    Alert.alert(
      "Delete exercise",
      "Are you shure about to delete this exercise",
      [
        {
          text: "Cancel",
          onPress: () => {
            resetButtonPosition()
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(removeExercise(exercise));
          },
        },
      ]
    );
  };

  const resetButtonPosition = () => {
    listRef.current.scrollToIndex({
      index: 1,
      animated: true,
    });
  }

  const onPullRelease = ({ event }) => {
    //const delta = Math.abs(startPosition - event.nativeEvent.contentOffset.x);
    if (deltaMovement != 0) {
      resetButtonPosition()
      setReadyToTrigger(false)
    }
    if (readyToTrigger) {
      if (startPosition - event.nativeEvent.contentOffset.x < 0){
        navigation.navigate("Edit Exercise", { exercise: item})
      }else{
        handleOnDeleteExercise({exercise: item})
      }
    }
  };

  return (
    <View style={{...styles.item, width: exerciseItemWidth}}>
    <FlatList
      ref={(ref) => (listRef.current = ref)}
      bounces={false}
      bouncesZoom={false}
      style={styles.item}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={true}
      onScrollBeginDrag={(event) => setStartPosition(event.nativeEvent.contentOffset.x)}
      onScroll={(event)=>{setDeltaMovement(Math.abs(startPosition - event.nativeEvent.contentOffset.x))}}
      onScrollEndDrag={(event) => onPullRelease({ event })}
      initialScrollIndex={1}
      getItemLayout={(data, index) => itemLayout({ index })}
      horizontal={true}
      data={renderItems}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => MainComponent({ item })}
    />
    </View>
  );
};

export default ExerciseItem;
