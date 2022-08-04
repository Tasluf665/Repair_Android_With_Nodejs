//Youtube Video For Google Auth https://www.youtube.com/watch?v=QT0PXhH9uTg&t=659s
//Youtube Video For Facebook Auth https://www.youtube.com/watch?v=xmevqnn_ipw
//Use Firebase 9.6.11. Higher version may show error

import * as Google from "expo-google-app-auth";
import axios from "axios";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function registerForPushNotificationsAsync() {
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

export async function GoogleSignIn(androidClientId, scopes = []) {
  try {
    const result = await Google.logInAsync({
      androidClientId: androidClientId,
      scopes: scopes.length === 0 ? ["profile", "email"] : scopes,
    });

    const expoPushToken = await registerForPushNotificationsAsync();

    if (result.type === "success") {
      try {
        const response = await axios.post(
          `${process.env.BACKEND_BASE_URL}/api/users/google`,
          {
            name: result.user.name,
            email: result.user.email,
            googleId: result.user.id,
            accessToken: result.accessToken,
            expoPushToken,
          }
        );
        return { success: response.data };
      } catch (ex) {
        return { error: ex.response ? ex.response.data.error : ex.message };
      }
    } else {
      return { error: "Permission Denied" };
    }
  } catch (err) {
    return { error: err.message };
  }
}

export async function EmailSignIn(email, password) {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_BASE_URL}/api/auth`,
      {
        email,
        password,
      }
    );
    return { success: response.data };
  } catch (ex) {
    return { error: ex.response ? ex.response.data.error : ex.message };
  }
}

export async function EmailSignUp(name, email, password) {
  try {
    const expoPushToken = await registerForPushNotificationsAsync();

    const response = await axios.post(
      `${process.env.BACKEND_BASE_URL}/api/users`,
      {
        name,
        email,
        password,
        expoPushToken,
      }
    );

    return { success: response.data };
  } catch (ex) {
    return { error: ex.response ? ex.response.data.error : ex.message };
  }
}

export async function ForgotPassword(email) {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_BASE_URL}/api/auth/forgot-password`,
      {
        email,
      }
    );

    return { success: response.data.success };
  } catch (ex) {
    return { error: ex.response ? ex.response.data.error : ex.message };
  }
}
