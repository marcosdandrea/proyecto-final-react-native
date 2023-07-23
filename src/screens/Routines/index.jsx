import { View, FlatList, Dimensions, Text } from "react-native";
import colors from "../../theme/colors";
import { useContext, useEffect, useRef, useState } from "react";
import DatabaseContext from "../../contexts/DatabaseContext";
import { icons } from "../../theme/icons";
import {
  InputTextLabeled,
  IconButton,
  RoutineItem,
  StandarIconButton,
} from "../../components";
import RoutineViewList from "../../components/RoutineViewList";
import styles from "./styles";

const Routines = ({ navigation }) => {
  const { routines } = useContext(DatabaseContext);
  const [routineList, setRoutineList] = useState([]);
  const [filterError, setFilterError] = useState();
  const [filterRoutinesByText, setFilterRoutinesByText] = useState("");
  const [currentRoutineData, setCurrentRoutineData] = useState({});
  const [viewableItems, setViewableItems] = useState([]);

  useEffect(() => {
    if (filterRoutinesByText == "") {
      setFilterError("");
      showCurrentSelectedRoutine();
      setRoutineList(routines);
      return;
    }

    setRoutineList(() => {
      const newData = routines.filter(
        (routine) =>
          routine.name
            .toLowerCase()
            .indexOf(filterRoutinesByText.toLowerCase()) > -1
      );
      if (newData.length > 0) {
        showCurrentSelectedRoutine();
        setFilterError("");
        return newData;
      }
      setFilterError("No routines match");
      setRoutineList([]);
      setCurrentRoutineData({ exercises: [] });
      return newData;
    });
  }, [filterRoutinesByText, routines]);

  useEffect(() => showCurrentSelectedRoutine(), [viewableItems]);

  const showCurrentSelectedRoutine = () => {
    const currentItem = viewableItems[0]?.item.key;
    if (currentItem == undefined) return;
    const routine = routines.find((sets) => sets.key == currentItem);
    setCurrentRoutineData(routine);
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length == -1) return;
    setViewableItems(viewableItems);
  };

  const viewabilityConfig = { itemVisiblePercentThreshold: 100 };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <InputTextLabeled
          error={filterError}
          label={"Find a Routine"}
          Button={() =>
            IconButton({
              icon: icons.search,
              backgroundColor: colors.background.primary,
            })
          }
          value={filterRoutinesByText}
          onChangeText={setFilterRoutinesByText}
          containerBackgroundColor={colors.background.primary}
        />
      </View>
      <View>
        <FlatList
          data={routineList}
          horizontal={true}
          contentContainerStyle={styles.horizontalGalleryContent}
          snapToAlignment="start"
          decelerationRate={"fast"}
          snapToInterval={Dimensions.get("window").width - 45 + 15}
          showsHorizontalScrollIndicator={false}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          renderItem={({ item, index }) =>
            RoutineItem({ item, index, navigation })
          }
        />
      </View>
      <View style={styles.routineContainer}>
        <View style={styles.routines}>
          <RoutineViewList
            exercisesData={currentRoutineData.exercises}
            navigation={navigation}
          />
        </View>
        <StandarIconButton
          icon={icons.delete}
          text="Delete Routine"
          iconTint={colors.foreground.primary}
          textProperties={{ color: colors.foreground.primary }}
          buttonProperties={{ width: "90%" }}
        />
      </View>
    </View>
  );
};

export default Routines;
