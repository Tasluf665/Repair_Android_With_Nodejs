//Youtube Video For Google Auth https://www.youtube.com/watch?v=QT0PXhH9uTg&t=659s
//Youtube Video For Facebook Auth https://www.youtube.com/watch?v=xmevqnn_ipw
//Use Firebase 9.6.11. Higher version may show error

//Expo push notification token fetched problem. It's the problem with expo. Nothing to do. This problem only occure in expo-cli. Work perfectly when we delpoyed. Ref: https://github.com/expo/expo/issues/18570
//Notifications.requestPermissionsAsync(); This function throw error in expo cli

//When we deploy, to use Google sing we have to follow some steps. ref: https://docs.expo.dev/versions/v43.0.0/sdk/google/

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
      // androidStandaloneAppClientId:
      //   process.env.ANDROID_STANDAL_ONE_APP_CLIENT_ID,
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
        return response.data;
      } catch (ex) {
        return { error: ex.response ? ex.response.data.error : ex.message };
      }
    } else {
      return { error: "Permission Denied" };
    }
  } catch (err) {
    console.log("🚀 ~ file: AuthHelper.js ~ line 77 ~ GoogleSignIn ~ err", err);
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
    return response.data;
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

    return response.data;
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

    return response.data;
  } catch (ex) {
    return { error: ex.response ? ex.response.data.error : ex.message };
  }
}
