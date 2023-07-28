import { View, FlatList, Dimensions, ActivityIndicator } from "react-native";
import colors from "../../theme/colors";
import { useEffect, useRef, useState } from "react";
import { icons } from "../../theme/icons";
import {
  InputTextLabeled,
  IconButton,
  RoutineItem,
  StandarIconButton,
} from "../../components";
import RoutineViewList from "../../components/RoutineViewList";
import styles from "./styles";
import { useSelector } from "react-redux";
import { useGetRoutinesQuery } from "../../store/routines/routines.API";

const Routines = ({ navigation }) => {
  //const _routines = useSelector((state)=> state.routines)
  const {
    data: _routines,
    error: getRoutinesError,
    isLoading: routinesIsLoading,
  } = useGetRoutinesQuery();
  const [routines, setRoutines] = useState();

  useEffect(()=>{
    if (routinesIsLoading) return
    const routines = Object.keys(_routines).map((key) => {
      return { ..._routines[key], key };
    });
    setRoutines(routines)
  }, [routinesIsLoading])


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
      {routinesIsLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.foreground.primary} />
        </View>
      ) : (
        <View style={{flex: 1}}>
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
                currentRoutine={currentRoutineData.exercises}
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
      )}
    </View>
  );
};

export default Routines;
