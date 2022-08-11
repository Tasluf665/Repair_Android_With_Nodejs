import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";

export const setDidTryAl = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, token, refresh_token) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
      refresh_token: refresh_token,
    });

    saveDataToStorage(token, userId, refresh_token);
  };
};

export const authRefreshToken = (refreshToken) => {
  return async (dispatch, getState) => {
    if (refreshToken) {
      try {
        const response = await fetch(
          `${process.env.BACKEND_BASE_URL}/api/auth/newToken`,
          {
            headers: {
              "Content-Type": "application/json",
              "refresh-token": refreshToken,
            },
            method: "POST",
          }
        );

        const result = await response.json();

        if (!result.error) {
          dispatch({
            type: AUTHENTICATE,
            userId: result.data._id,
            token: result.data.token,
            refresh_token: result.data.refreshToken,
          });
        } else {
          dispatch(logout());
        }
      } catch (ex) {
        console.log("🚀 ~ file: auth.js ~ line 78 ~ return ~ ex", ex.message);

        dispatch(logout());
      }
    } else {
      dispatch(logout());
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem("userData");
      dispatch({ type: LOGOUT });
    } catch (err) {
      console.log("🚀 ~ file: auth.js ~ line 68 ~ return ~ err", err);
    }
  };
};

const saveDataToStorage = async (token, userId, refresh_token) => {
  try {
    await AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        token: token,
        userId: userId,
        refresh_token: refresh_token,
      })
    );
  } catch (err) {
    console.log("🚀 ~ file: auth.js ~ line 84 ~ saveDataToStorage ~ err", err);
  }
};
