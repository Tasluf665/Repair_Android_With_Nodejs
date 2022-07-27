import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DeliveryAddressMainScreen from "../../../../components/ProfileScreenComponent/DeliveryAddress/DeliveryAddressMainScreen";
import AddNewAddressScreen from "../../../../components/ProfileScreenComponent/DeliveryAddress/AddNewAddressScreen";
import RegionScreen from "../../../../components/ProfileScreenComponent/DeliveryAddress/RegionScreen";
import CityScreen from "../../../../components/ProfileScreenComponent/DeliveryAddress/CityScreen";
import AreaScreen from "../../../../components/ProfileScreenComponent/DeliveryAddress/AreaScreen";

const Stack = createNativeStackNavigator();

export const DeliveryAddressStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="DeliveryAddressMainScreen"
        component={DeliveryAddressMainScreen}
      />
      <Stack.Screen
        name="AddNewAddressScreen"
        component={AddNewAddressScreen}
      />
      <Stack.Screen name="RegionScreen" component={RegionScreen} />
      <Stack.Screen name="CityScreen" component={CityScreen} />
      <Stack.Screen name="AreaScreen" component={AreaScreen} />
    </Stack.Navigator>
  );
};
