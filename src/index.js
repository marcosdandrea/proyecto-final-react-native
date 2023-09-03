import { dropTable, init } from "./database";
import { StyleSheet, View } from "react-native";
import { SectionContextProvider } from "./contexts/SectionContext";
import { DatabaseContextProvider } from "./contexts/DatabaseContext";
import FontProvider from "../assets/fonts/FontProvider";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider } from "react-redux";
import { store } from "./store";
import RootNavigator from "./navigation/RootNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();


export default function App() {

  (async () => {
    try {
      //await dropTable()
      await init();
      console.log("Database initialization successful");
      setTimeout(()=>SplashScreen.hideAsync(), 1000)
    } catch (err) {
      console.error(err);
    }
  })()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  return (
    <RootSiblingParent>
      <StatusBar style="light"/>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <FontProvider>
          <Provider store={store}>
            <View style={styles.container}>
              <DatabaseContextProvider>
                <SectionContextProvider>
                  <RootNavigator />
                </SectionContextProvider>
              </DatabaseContextProvider>
            </View>
          </Provider>
        </FontProvider>
      </GestureHandlerRootView>
    </RootSiblingParent>
  );
}
