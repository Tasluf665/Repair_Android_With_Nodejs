import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import authReducer from "./store/reducer/auth";
import userReducer from "./store/reducer/user";
import orderReducer from "./store/reducer/order";
import notificationReducer from "./store/reducer/notification";

import AppContainer from "./Navigation/AppContainer";

export default function App() {
  const [loaded] = useFonts({
    RobotoSlabLight: require("./assets/Fonts/RobotoSlab-Light.ttf"),
    RobotoSlabRegular: require("./assets/Fonts/RobotoSlab-Regular.ttf"),
    RobotoSlabSemiBold: require("./assets/Fonts/RobotoSlab-SemiBold.ttf"),
    RobotoSlabBold: require("./assets/Fonts/RobotoSlab-Bold.ttf"),
  });

  const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    order: orderReducer,
    notification: notificationReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AppContainer />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
