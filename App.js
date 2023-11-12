import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppContainer from "./AppContainer";

import { rootReducer } from "./data/Reducer";

const store = configureStore({
  reducer: rootReducer,
});

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
