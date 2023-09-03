import {
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import { createContext, useState } from "react";
import { icons } from "../../theme/icons";
import CustomText from "../CustomText";

const MenuItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={()=>onPress({item})} style={styles.menuItem.container}>
      <Image style={styles.menuItem.image} source={icons.bolt} />
      <CustomText text={item.value} style={styles.menuItem.text} />
    </TouchableOpacity>
  );
};

const FloatingMenu = ({ optionList, show, openPoint = {x:0, y: 0}, onPressItem }) => {
  return (
    <View
      style={{
        ...styles.floatingMenu.container,
        display: show ? "flex" : "none",
        left: openPoint.x - 50,
        top: openPoint.y,
      }}
    >
      <FlatList
        data={optionList}
        renderItem={({ item }) => MenuItem({ item, onPress: onPressItem })}
        contentContainerStyle={styles.floatingMenu.list}
      />
    </View>
  );
};

const QuickTipContext = createContext();

const CustomQuickTip = ({ children }) => {
  const [btnPosition, setBtnPosition] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const [callback, setCallback] = useState({f: ()=>{}})
  const [optionList, setOptionList] = useState([]);

  const handleOnPressItem = ({ item }) => {
    callback.f(item);
    setShow(false);
  };

  return (
    <QuickTipContext.Provider
      value={{ setShow, setBtnPosition, setCallback, setOptionList }}>
      <FloatingMenu
        show={show}
        optionList={optionList}
        openPoint={btnPosition}
        onPressItem={handleOnPressItem}
      />
      <Pressable
        style={{ ...styles.backdrop, display: show ? "flex" : "none" }}
        onPress={() => setShow(false)}
      />

      {children}
    </QuickTipContext.Provider>
  );
};

export default CustomQuickTip;
export { QuickTipContext };
