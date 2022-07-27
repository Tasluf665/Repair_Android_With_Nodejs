import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthScreen from "../../screens/AuthScreen/AuthScreen";
import { AuthScreenStack } from "./AuthScreenStack";

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthStack" component={AuthScreen} />
      <Stack.Screen name="AuthScreenStack" component={AuthScreenStack} />
    </Stack.Navigator>
  );
};
