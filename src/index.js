import { StyleSheet, View } from "react-native";
import MenuBar from "./components/MenuBar";
import { SectionContextProvider } from "./contexts/SectionContext";
import Sections from "./components/Sections";
import { DatabaseContextProvider } from "./contexts/DatabaseContext";
import FontProvider from "../assets/fonts/FontProvider";

export default function App() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <FontProvider>
      <View style={styles.container}>
        <DatabaseContextProvider>
          <SectionContextProvider>
            <Sections />
            <MenuBar />
          </SectionContextProvider>
        </DatabaseContextProvider>
      </View>
    </FontProvider>
  );
}
