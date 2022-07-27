import React from "react";
import { Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";

import { OrderStack } from "./OrderStack/OrderStack";
import TabNavigation from "./TabNavigation/TabNavigation";
import Colors from "../../Constant/Colors";
import CustomDrawer from "./CustomDrawer";

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigation}
        options={{
          headerShown: false,
          drawerIcon: ({ tintColor }) => (
            <FontAwesome name="home" size={26} color={Colors.Secondary} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Cart"
        component={OrderStack}
        options={{
          headerShown: false,
          drawerIcon: ({ tintColor }) => (
            <FontAwesome
              name="shopping-cart"
              size={26}
              color={Colors.Secondary}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
