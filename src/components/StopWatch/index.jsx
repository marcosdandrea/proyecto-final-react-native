import { View } from "react-native";
import { styles } from "./style";
import CustomText from "../CustomText";
import { useEffect, useState } from "react";
import StandarIconButton from "../StandarIconButton";
import { icons } from "../../theme/icons";
import { colors } from "../../theme";

const Stopwatch = ({ onFinish, defaultValue }) => {
  const [totalTime, setTotalTime] = useState(defaultValue || 200);
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [timeLeft, setTimeLeft] = useState(0);

  const updateTime = () => {
    const end = startTime + totalTime * 1000;
    const now = new Date().getTime();
    end > now ? setTimeLeft(end - now) : onFinish();
  };

  useEffect(() => {
    const timer = setInterval(updateTime, 200);

    return () => clearInterval(timer);
  }, [totalTime, startTime]);

  const addTime = (add) => {
    setTotalTime((prev) => prev + add);
  };

  const removeTime = (remove) => {
    setTotalTime((prev) => prev - remove);
  };

  function msToMMSS(ms) {
    var minutes = Math.floor(ms / 60000); // 1 minuto = 60,000 ms
    var seconds = ((ms % 60000) / 1000).toFixed(0); // El residuo en segundos
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  }

  return (
    <View style={styles.container}>
      <CustomText text={msToMMSS(timeLeft)} style={styles.timer} />
      <View style={styles.buttonsContainer}>
        <StandarIconButton
          onPress={() => addTime(10)}
          text=""
          icon={icons.add}
          buttonProperties={{
            ...styles.button,
            backgroundColor: colors.foreground.secondary,
          }}
        />
        <StandarIconButton
          onPress={() => removeTime(10)}
          text=""
          icon={icons.minus}
          buttonProperties={{
            ...styles.button,
            backgroundColor: colors.foreground.primary,
          }}
        />
      </View>
      <StandarIconButton
        onPress={onFinish}
        text="Finish Rest"
        icon={icons.stop}
        buttonProperties={{ backgroundColor: colors.foreground.terciary }}
      />
    </View>
  );
};

export default Stopwatch;
