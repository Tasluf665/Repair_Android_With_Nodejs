import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeStack } from "./HomeStack/HomeStack";
import { ProfileStack } from "./ProfileStack/ProfileScreenStack";
import { OrderStack } from "../OrderStack/OrderStack";
import Colors from "../../../Constant/Colors";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "HomeTab") {
            iconName = "home";
          } else if (route.name === "OrderTab") {
            iconName = "shopping-cart";
          } else if (route.name === "ProfileTab") {
            iconName = "person";
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.Primary,
        tabBarInactiveTintColor: Colors.Secondary,
        tabBarLabelStyle: { fontFamily: "RobotoSlabBold", fontSize: 11 },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: "Home" }}
      />

      <Tab.Screen
        name="OrderTab"
        component={OrderStack}
        options={{ title: "cart" }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
