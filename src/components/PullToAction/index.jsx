import {
  View,
  FlatList,
  Vibration,
} from "react-native";
import { styles } from "./styles";
import { useState, useRef, useEffect, useCallback } from "react";

const PullToAction = ({
  onRightPull,
  onLeftPull,
  LeftComponent,
  RightComponent,
  sideComponentsWidth,
  MainComponent,
  mainComponentWidth,
  vibrate
}) => {
  const listRef = useRef();
  const [startPosition, setStartPosition] = useState(0);
  const [readyToTrigger, setReadyToTrigger] = useState(false);
  const [deltaMovement, setDeltaMovement] = useState(0);
  const renderItems = [{key: 0}, {key: 1}, {key: 2}];
  const [isTouching, setIsTouching] = useState(false)

  const ItemComponent = ({ item }) => {
    if (item.key == 0) return <LeftComponent/>;
    if (item.key == 1) return <MainComponent/>
    return <RightComponent />;
  };

  const itemLayout = ({ index }) => {
    if (index == 0) return { length: sideComponentsWidth, offset: 0, index };
    if (index == 1) return { length: mainComponentWidth, offset: sideComponentsWidth, index };
    return { length: sideComponentsWidth, offset: sideComponentsWidth + mainComponentWidth, index };
  };

  useEffect(() => {
    if (!isTouching) return
    if (deltaMovement > sideComponentsWidth/3 && !readyToTrigger) {
      if (vibrate) Vibration.vibrate(60)
      setReadyToTrigger(true);
    }
  }, [deltaMovement]);

  const resetButtonPosition = () => {
    listRef.current.scrollToIndex({
      index: 1,
      animated: true,
    });
  };

  const onPullReleaseAction = ({ event }) => {
    setIsTouching(false)
    if (readyToTrigger) 
    startPosition - event.nativeEvent.contentOffset.x > 0 ? onRightPull() : onLeftPull()         
    resetButtonPosition();
    setReadyToTrigger(false);
  };

  return (
    <View style={{ ...styles.item, width: mainComponentWidth }}>
      <FlatList
        ref={(ref) => (listRef.current = ref)}
        bounces={false}
        bouncesZoom={false}
        overScrollMode={"never"}
        style={styles.item}
        decelerationRate={0} 
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        onScrollBeginDrag={(event) =>
          {
            setIsTouching(true)
            setStartPosition(event.nativeEvent.contentOffset.x)
          }
        }
        onScroll={(event) => {
          setDeltaMovement(
            Math.abs(startPosition - event.nativeEvent.contentOffset.x)
          );
        }}
        onScrollEndDrag={(event) => onPullReleaseAction({ event })}
        initialScrollIndex={1}
        getItemLayout={(data, index) => itemLayout({ index })}
        horizontal={true}
        data={renderItems}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => ItemComponent({ item })}
      />
    </View>
  );
};

export default PullToAction;
