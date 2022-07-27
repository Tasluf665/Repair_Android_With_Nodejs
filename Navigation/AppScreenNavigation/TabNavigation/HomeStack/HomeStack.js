import React from "react";
import { Octicons } from "@expo/vector-icons";
import HomePageNotificationIcon from "../../../../components/Common/HomePageNotificationIcon";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../../../screens/HomeScreen/HomeScreen";
import OrderFormScreen from "../../../../screens/HomeScreen/OrderFormScreen";
import { NotificationStack } from "./NotificationStack";
import Colors from "../../../../Constant/Colors";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { increaseNotificationCount } from "../../../../store/actions/notification";

const Stack = createNativeStackNavigator();

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export const HomeStack = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [expoPushToken, setExpoPushToken] = React.useState(null);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();
  const temp = React.useRef();

  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const notificationCount = useSelector(
    (state) => state.notification.notificationCount
  );

  React.useEffect(() => {
    if (expoPushToken) {
      fetch(
        `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            expoPushToken: expoPushToken,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.error) {
            throw data.error;
          }
        })
        .catch((error) => console.log(error));
    }
  }, [expoPushToken]);

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
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
        options={({ navigation }) => ({
          headerLeft: () => (
            <Octicons
              name="three-bars"
              size={24}
              color={Colors.Primary_Helper}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
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
          headerShown: false,
        }}
        name="NotificationStack"
        component={NotificationStack}
      />
    </Stack.Navigator>
  );
};
