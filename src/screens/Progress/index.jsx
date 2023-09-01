import { FlatList, View } from "react-native";
import { CustomText, StandarIconButton } from "../../components";
import { style } from "./style";
import { icons } from "../../theme/icons";
import { useEffect, useState } from "react";
import ProgressItem from "../../components/ProgressItem";
import { deleteProgressById, getAllProgresses } from "../../database";
import { useDispatch, useSelector } from "react-redux";
import {
  _loadProgress,
  _removeProgressById,
} from "../../store/progress/progress.services";

const Progress = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { progress } = useSelector((state) => state.progress);

  const [progressList, setProgressList] = useState([]);

  useEffect(() => {
    setProgressList(progress);
  }, [progress]);

  useEffect(() => {
    dispatch(_loadProgress);
  }, []);

  const handleOnSelectProgress = ({ item }) => {
    navigation.navigate("New Progress", { progress: item.id });
  };

  const deleteProgress = ({ item }) => {
    try {
      const id = item.item.id;
      dispatch((dispatch, getState) =>
        _removeProgressById(dispatch, getState, id)
      );
    } catch (e) {
      console.warn(e.message);
    }
  };

  return (
    <View style={style.container}>
      {progressList.length == 0 ? (
        <CustomText text="You have no progress registered yet, go ahead and register the first one to start tracking your fitness evolution!" style={style.text}/>
      ) : (
        <FlatList
          style={style.flatlist}
          contentContainerStyle={style.flatlistContainer}
          data={progressList}
          keyExtractor={(item) => item.id}
          renderItem={(item) =>
            ProgressItem({
              item,
              onPress: () => handleOnSelectProgress(item),
              onDeleteProgress: () => deleteProgress({ item }),
            })
          }
        />
      )}

      <StandarIconButton
        onPress={() => navigation.navigate("New Progress")}
        buttonProperties={style.standarIcon}
        text="Add new Register"
        icon={icons.add}
      />
    </View>
  );
};

export default Progress;
