import { StyleSheet, View } from "react-native";
import { SectionContextProvider } from "./contexts/SectionContext";
import { DatabaseContextProvider } from "./contexts/DatabaseContext";
import FontProvider from "../assets/fonts/FontProvider";
import 'react-native-random-uuid'
import { RootNavigator } from "./navigation";

export default function App() {
  const styles = StyleSheet.create({
    container: {
      flex: 1      
    },
  });

  return (
    <FontProvider>
      <View style={styles.container}>
        <DatabaseContextProvider>
          <SectionContextProvider>
            <RootNavigator/>
          </SectionContextProvider>
        </DatabaseContextProvider>
      </View>
    </FontProvider>
  );
}
