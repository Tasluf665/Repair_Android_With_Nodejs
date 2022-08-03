import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInWithEmail from "../../components/AuthScreenComponent/SignInWithEmail";
import SignUpWithEmail from "../../components/AuthScreenComponent/SignUpWithEmail";

const Stack = createNativeStackNavigator();

export const AuthScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignInWithEmail" component={SignInWithEmail} />
      <Stack.Screen name="SignUpWithEmail" component={SignUpWithEmail} />
    </Stack.Navigator>
  );
};
