import { View, Text, FlatList } from "react-native";
import styles from "./styles";
import CustomText from "../../components/CustomText";
import { useGetWorkoutsQuery } from "../../store/workout/workout.api";
import { useEffect, useState } from "react";
import Constants  from "expo-constants";

function toMs(ms) {
  const sec = Math.floor(ms / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);

  const secLeft = sec % 60;
  const minLeft = min % 60;

  const formatHHMMSS = `${String(hr).padStart(2, "0")}:${String(
    minLeft
  ).padStart(2, "0")}:${String(secLeft).padStart(2, "0")}`;
  return formatHHMMSS;
}

const WorkoutsExecutionItem = ({ item }) => {
  const woDate = new Date(item.startTime);
  const now = new Date().getTime();
  const daysPassed = Math.floor((now - woDate) / 1000 / 60 / 60 / 24);

  const woEnd = new Date(item.endTime);
  const duration = toMs(woEnd - woDate);

  return (
    <View style={styles.item.container}>
      <CustomText text={item.routine.name} style={styles.item.routineName} />
      <CustomText text={`${daysPassed} days ago`} style={styles.item.info} />
      <CustomText text={`Duration: ${duration} hs`} style={styles.item.info} />
    </View>
  );
};

const Dashboard = () => {
  const { data: workouts, isLoading } = useGetWorkoutsQuery();
  const [workoutsData, setWorkoutsData] = useState([]);

  useEffect(() => {
    if (isLoading || !workouts) return;
    const WO = Object.keys(workouts).map((key) => {
      return { ...workouts[key], key };
    });
    setWorkoutsData(WO);
  }, [isLoading, workouts]);

  if (workoutsData.length == 0) {
    return (
      <View style={styles.container}>
        <CustomText
          text={"You haven't complete any Workout yet!"}
          style={styles.text}
        />
      </View>
    );
  } else {
    return (
        <View style={{...styles.container, paddingTop: Constants.statusBarHeight + 15}}>
          <CustomText text={"Executed Workouts"} style={styles.text} />
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            style={styles.flatlist}
            data={workoutsData}
            renderItem={WorkoutsExecutionItem}
          />
        </View>
    );
  }
};

export default Dashboard;
