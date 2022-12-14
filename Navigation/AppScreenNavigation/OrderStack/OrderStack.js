import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OrderScreen from "../../../screens/OrderScreen/OrderScreen";
import OrderTrackScreen from "../../../screens/OrderScreen/OrderTrackScreen";
import PaymentScreen from "../../../screens/PaymentScreen/PaymentScreen";
import SSLCOMMERZ_Web_View from "../../../components/PaymentScreenComponent/WebView/SSLCOMMERZ_Web_View";

const Stack = createNativeStackNavigator();

export const OrderStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrderStackScreen"
        component={OrderScreen}
        options={() => ({
          title: "My Cart",
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="OrderTrackScreen"
        component={OrderTrackScreen}
        options={{ title: "Order" }}
      />

      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{ title: "Payment" }}
      />
      <Stack.Screen
        name="SSLCOMMERZ_Web_View"
        component={SSLCOMMERZ_Web_View}
        options={{ title: "Payment" }}
      />
    </Stack.Navigator>
  );
};
