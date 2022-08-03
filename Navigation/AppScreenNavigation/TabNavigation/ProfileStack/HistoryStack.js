import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HistoryMainScreen from "../../../../components/ProfileScreenComponent/HistoryScreen/HistoryMainScreen";
import OrderTrackScreen from "../../../../screens/OrderScreen/OrderTrackScreen";

const Stack = createNativeStackNavigator();

export default HistoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HistoryMainScreen"
        component={HistoryMainScreen}
        options={{ title: "History" }}
      />
      <Stack.Screen
        name="OrderTrackScreen"
        component={OrderTrackScreen}
        options={{ headerShown: true, title: "Track Order" }}
      />
    </Stack.Navigator>
  );
};
