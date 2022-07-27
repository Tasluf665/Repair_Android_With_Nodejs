import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MyDetailsMainScreen from "../../../../components/ProfileScreenComponent/MyDetailsScreen.js/MyDetailsMainScreen";
import SetPassword from "../../../../components/ProfileScreenComponent/MyDetailsScreen.js/SetPassword";

const Stack = createNativeStackNavigator();

export const MyDetailsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MyDetailsMainScreen"
        component={MyDetailsMainScreen}
      />
      <Stack.Screen name="SetPassword" component={SetPassword} />
    </Stack.Navigator>
  );
};
