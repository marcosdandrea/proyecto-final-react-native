import { View } from "react-native";
import { styles } from "./styles";
import CustomText from "../CustomText";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSetsLeft } from "../../store/workout/workout.slice";

const WorkoutRoutineHeader = ({ workout, completedExercises }) => {
  const dispatch = useDispatch()
  const mainComponentRef = useRef();
  const [progressBarMaxWidth, setProgressBarMaxWidth] = useState(0);
  const [progressBarWidth, setProgressBardWidth] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState("00:00:00");

  useEffect(() => {
    let totalSets = 0
    workout.routine.exercises.forEach(ex => totalSets+= ex.sets.length)
    const progressStep = progressBarMaxWidth / totalSets;
    setProgressBardWidth(completedExercises * progressStep);
    dispatch(setSetsLeft(totalSets - completedExercises));
    setStartTime(()=>Date.now());
  }, [completedExercises, workout, progressBarMaxWidth]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mainComponent = mainComponentRef.current;
      if (!mainComponent) return;
      mainComponent.measure((x, y, width, height) => {
        setProgressBarMaxWidth(width);
        setProgressBardWidth(-width);
      });
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const time = Date.now() - startTime;
      setTimeElapsed(() => {
        const hours = String(Math.floor(time / 3600000)).padStart(2, "0");
        const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2,"0");
        const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2,"0");
        return `${hours}:${minutes}:${seconds}`;
      });
    }, 900);

    return () => clearInterval(timer);
  }, [startTime]);

  return (
    <View style={styles.container} ref={mainComponentRef}>
      <View style={styles.header}>
        <CustomText text={workout.routine.name} style={styles.routineTitle} />
        <CustomText text={timeElapsed} style={styles.routineTime} />
      </View>
      <View style={styles.footer}>
        <CustomText text={`${workout.routine.exercises.length} exercises`} style={styles.totalExercises} />
        {/* <CustomText text={"est: 93 min"} style={styles.estimatedTimeLeft} /> */}
      </View>
      <View style={{ ...styles.progressBar, width: progressBarWidth }} />
    </View>
  );
};

export default WorkoutRoutineHeader;
