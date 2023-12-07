import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import AppContainer from "./AppContainer";
import { RootSiblingParent } from "react-native-root-siblings";

import { rootReducer } from "./data/Reducer";

const store = configureStore({
  reducer: rootReducer,
});

export default function App() {
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </RootSiblingParent>
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
