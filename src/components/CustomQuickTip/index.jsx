import { FlatList, Image, Pressable, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { createContext, forwardRef, useEffect, useRef, useState } from "react";
import { icons } from "../../theme/icons";

const MenuItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={icons.bolt} />
      <CustomText text={item.text} style={styles.menuItem.text} />
    </View>
  );
};

const FloatingMenu = ({ optionList, show, openPoint }) => {
  return (
    <View
      style={{
        ...styles.floatingMenu.container,
        display: show ? "flex" : "none",
        left: openPoint.x - 50,
        top: openPoint.y,
      }}
    >
      <FlatList data={optionList} renderItem={MenuItem} />
    </View>
  );
};

const options = [
  { key: 0, text: 6 },
  { key: 1, text: 8 },
  { key: 2, text: 10 },
  { key: 3, text: 12 },
  { key: 4, text: 15 },
];

const QuickTipContext = createContext();

const CustomQuickTip = ({ children }) => {
  const [btnPosition, setBtnPosition] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [optionList, setOptionList] = useState([]);

  return (
    <QuickTipContext.Provider
      value={{ setShow, setBtnPosition, selectedOption, setOptionList }}
    >
        <FloatingMenu
          show={show}
          optionList={optionList}
          onSelect={setSelectedOption}
          openPoint={btnPosition}
        />
        <Pressable
            style={{ ...styles.backdrop, display: show ? "flex" : "none"}}
            onPress={()=>setShow(false)}
        />

        {children}
        
       
    </QuickTipContext.Provider>
  );
};

export default CustomQuickTip;
export { QuickTipContext };
