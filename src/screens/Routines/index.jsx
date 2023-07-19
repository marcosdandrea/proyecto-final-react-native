import { View, FlatList, Dimensions } from "react-native";
import colors from "../../theme/colors";
import { useContext, useEffect, useRef, useState } from "react";
import DatabaseContext from "../../contexts/DatabaseContext";
import { icons } from "../../theme/icons";
import {
  InputTextLabeled,
  RoutineViewList,
  IconButton,
  RoutineItem,
} from "../../components";
import styles from "./styles";

const Routines = () => {
  const { routines } = useContext(DatabaseContext);
  const [routineList, setRoutineList] = useState([]);
  const [filterRoutinesByText, setFilterRoutinesByText] = useState("");
  const [currentRoutineData, setCurrentRoutineData] = useState({});

  useEffect(() => {
    setRoutineList(routines);
  }, [routines]);

  useEffect(() => {
    if (filterRoutinesByText == "") {
      setRoutineList(routines);
      return;
    }

    setRoutineList((prev) => {
      return [...prev].filter(
        (routine) =>
          routine.name
            .toLowerCase()
            .indexOf(filterRoutinesByText.toLowerCase()) > -1
      );
    });
  }, [filterRoutinesByText]);

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length == -1) return;
    const currentItem = viewableItems[0]?.item.key;
    if (currentItem == undefined) return;
    const routine = routines.find((sets) => sets.key == currentItem);
    setCurrentRoutineData(routine);
  };

  const viewabilityConfig = { itemVisiblePercentThreshold: 100 };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <InputTextLabeled
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
          renderItem={({ item, index }) => RoutineItem({ item, index })}
        />
      </View>
      <View style={styles.routineContainer}>
        <View style={styles.routines}>
          <RoutineViewList exercisesData={currentRoutineData.exercises} />
        </View>
      </View>
    </View>
  );
};

export default Routines;
