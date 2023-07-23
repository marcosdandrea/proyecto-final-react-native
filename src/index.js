import { StyleSheet, View } from "react-native";
import { SectionContextProvider } from "./contexts/SectionContext";
import { DatabaseContextProvider } from "./contexts/DatabaseContext";
import FontProvider from "../assets/fonts/FontProvider";
import 'react-native-random-uuid'
import { Provider } from "react-redux";
import {store} from "./store"
import RootNavigator from "./navigation/RootNavigation";

export default function App() {
  const styles = StyleSheet.create({
    container: {
      flex: 1      
    },
  });

  return (
    <FontProvider>
      <Provider store={store}>
      <View style={styles.container}>
        <DatabaseContextProvider>
          <SectionContextProvider>
            <RootNavigator/>
          </SectionContextProvider>
        </DatabaseContextProvider>
      </View>
      </Provider>
    </FontProvider>
  );
}
