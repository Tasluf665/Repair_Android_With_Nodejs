import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "../../../../Constant/Colors";

import NotificationScreen from "../../../../screens/HomeScreen/NotificationScreen";
import OrderTrackScreen from "../../../../screens/OrderScreen/OrderTrackScreen";
const Stack = createNativeStackNavigator();

export const NotificationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.Primary_Helper },
          title: "Notifications",
        }}
        name="NotificationScreen"
        component={NotificationScreen}
      />
      <Stack.Screen
        name="OrderTrackScreen"
        component={OrderTrackScreen}
        options={{ title: "Order" }}
      />
    </Stack.Navigator>
  );
};
