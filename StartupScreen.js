import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { authenticate, setDidTryAl } from "./store/actions/auth";
import Colors from "./Constant/Colors";
import setting from "./Constant/setting";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  console.log(setting.apiUrl);

  useEffect(() => {
    const tryLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");

        if (!userData) {
          dispatch(setDidTryAl());
          return;
        }

        const transformedData = JSON.parse(userData);
        const { token, userId, refresh_token } = transformedData;

        if (!token || !userId) {
          dispatch(setDidTryAl());
          return;
        }
        await dispatch(authenticate(userId, token, refresh_token));
      } catch (err) {
        console.log("In StatupScreen: ", err.message);
      }
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.Primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
