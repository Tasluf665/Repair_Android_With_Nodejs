import React from "react";
import HomePageNotificationIcon from "../../../../components/Common/HomePageNotificationIcon";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../../../screens/HomeScreen/HomeScreen";
import OrderFormScreen from "../../../../screens/HomeScreen/OrderFormScreen";
import CommonWebView from "../../../../components/HomeScreenComponent/NonFunctionalComponent/CommonWebView";
import { NotificationStack } from "./NotificationStack";
import Colors from "../../../../Constant/Colors";

import * as Notifications from "expo-notifications";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { increaseNotificationCount } from "../../../../store/actions/notification";

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  const notificationCount = useSelector(
    (state) => state.notification.notificationCount
  );

  React.useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        dispatch(increaseNotificationCount());
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        navigation.navigate("NotificationStack");
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.Primary,
        },
      }}
    >
      <Stack.Screen
        name="HomeStackScreen"
        component={HomeScreen}
        options={() => ({
          headerRight: () => (
            <HomePageNotificationIcon notificationCount={notificationCount} />
          ),
          title: "",
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen name="OrderFormStackScreen" component={OrderFormScreen} />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.Primary_Helper },
        }}
        name="Offer"
        component={CommonWebView}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.Primary_Helper },
          headerShown: false,
        }}
        name="NotificationStack"
        component={NotificationStack}
      />
    </Stack.Navigator>
  );
};
