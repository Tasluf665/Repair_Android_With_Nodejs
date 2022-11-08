//Youtube Video For Google Auth https://www.youtube.com/watch?v=QT0PXhH9uTg&t=659s
//Youtube Video For Facebook Auth https://www.youtube.com/watch?v=xmevqnn_ipw
//Use Firebase 9.6.11. Higher version may show error
//New Google Auth by expo-auth-session https://www.youtube.com/watch?v=YX7IWOQIKA0&t=439s

//Expo push notification token fetched problem. It's the problem with expo. Nothing to do. This problem only occure in expo-cli. Work perfectly when we delpoyed. Ref: https://github.com/expo/expo/issues/18570
//Notifications.requestPermissionsAsync(); This function throw error in expo cli

//When we deploy, to use Google sing we have to follow some steps. ref: https://docs.expo.dev/versions/v43.0.0/sdk/google/

import axios from "axios";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import setting from "../../../Constant/setting";

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

export async function GoogleSignIn(authentication) {
  try {
    const myProfile = await axios.get(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${authentication.accessToken}` },
      }
    );

    const expoPushToken = await registerForPushNotificationsAsync();

    const response = await axios.post(`${setting.apiUrl}/api/users/google`, {
      name: myProfile.data.name,
      email: myProfile.data.email,
      googleId: myProfile.data.id,
      accessToken: authentication.accessToken,
      expoPushToken,
    });

    return response.data;
  } catch (error) {
    console.log(
      "🚀 ~ file: AuthHelper.js ~ line 67 ~ GoogleSignIn ~ error",
      error
    );
  }
}

export async function EmailSignIn(email, password) {
  try {
    const response = await axios.post(`${setting.apiUrl}/api/auth`, {
      email,
      password,
    });
    return response.data;
  } catch (ex) {
    return { error: ex.response ? ex.response.data.error : ex.message };
  }
}

export async function EmailSignUp(name, email, password) {
  try {
    const expoPushToken = await registerForPushNotificationsAsync();

    const response = await axios.post(`${setting.apiUrl}/api/users`, {
      name,
      email,
      password,
      expoPushToken,
    });

    return response.data;
  } catch (ex) {
    return { error: ex.response ? ex.response.data.error : ex.message };
  }
}

export async function ForgotPassword(email) {
  try {
    const response = await axios.post(
      `${setting.apiUrl}/api/auth/forgot-password`,
      {
        email,
      }
    );

    return response.data;
  } catch (ex) {
    return { error: ex.response ? ex.response.data.error : ex.message };
  }
}
