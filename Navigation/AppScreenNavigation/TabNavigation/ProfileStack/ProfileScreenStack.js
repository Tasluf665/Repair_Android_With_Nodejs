import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileMainScreen from "../../../../components/ProfileScreenComponent/ProfileMainScreen";
import { MyDetailsStack } from "./MyDetailsStack";
import { DeliveryAddressStack } from "./DeliveryAddressStack";
import HistoryStack from "./HistoryStack";
import CommonWebView from "../../../../components/HomeScreenComponent/NonFunctionalComponent/CommonWebView";
import Colors from "../../../../Constant/Colors";

const Stack = createNativeStackNavigator();

export const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMainScreen" component={ProfileMainScreen} />
      <Stack.Screen name="MyDetailsStack" component={MyDetailsStack} />
      {/* <Stack.Screen name="OrderStack" component={OrderStack} /> */}
      <Stack.Screen
        name="DeliveryAddressStack"
        component={DeliveryAddressStack}
      />
      <Stack.Screen name="HistoryStack" component={HistoryStack} />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.Primary_Helper },
          headerShown: true,
        }}
        name="Privacy"
        component={CommonWebView}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.Primary_Helper },
          headerShown: true,
        }}
        name="Help"
        component={CommonWebView}
      />
    </Stack.Navigator>
  );
};
