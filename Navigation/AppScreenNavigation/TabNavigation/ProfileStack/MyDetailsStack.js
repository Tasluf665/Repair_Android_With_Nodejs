import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MyDetailsMainScreen from "../../../../components/ProfileScreenComponent/MyDetailsScreen.js/MyDetailsMainScreen";

const Stack = createNativeStackNavigator();

export const MyDetailsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MyDetailsMainScreen"
        component={MyDetailsMainScreen}
      />
    </Stack.Navigator>
  );
};
