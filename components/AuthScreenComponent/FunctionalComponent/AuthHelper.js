//Youtube Video For Google Auth https://www.youtube.com/watch?v=QT0PXhH9uTg&t=659s
//Youtube Video For Facebook Auth https://www.youtube.com/watch?v=xmevqnn_ipw
//Use Firebase 9.6.11. Higher version may show error

import * as Google from "expo-google-app-auth";
import axios from "axios";

export async function GoogleSignIn(androidClientId, scopes = []) {
  try {
    const result = await Google.logInAsync({
      androidClientId: androidClientId,
      scopes: scopes.length === 0 ? ["profile", "email"] : scopes,
    });

    if (result.type === "success") {
      try {
        const response = await axios.post(
          `${process.env.BACKEND_BASE_URL}/api/users/google`,
          {
            name: result.user.name,
            email: result.user.email,
            googleId: result.user.id,
            accessToken: result.accessToken,
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
    const response = await axios.post(
      `${process.env.BACKEND_BASE_URL}/api/users`,
      {
        name,
        email,
        password,
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
