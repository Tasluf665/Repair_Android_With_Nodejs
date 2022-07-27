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
        let xhr = new XMLHttpRequest();
        xhr.open(
          "POST",
          "https://securetoken.googleapis.com/v1/token?key=AIzaSyA5CiWXB6Kbnpp_dHn-k-yHC9T3wACNBLY"
        );

        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );

        xhr.onreadystatechange = function () {
          if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            const result = JSON.parse(this.response);

            dispatch({
              type: AUTHENTICATE,
              userId: result.user_id,
              token: result.id_token,
              refresh_token: result.refresh_token,
            });
            saveDataToStorage(
              result.id_token,
              result.user_id,
              result.refresh_token
            );
          } else {
            // dispatch(logout());
          }
        };
        xhr.send(`grant_type=refresh_token&refresh_token=${refreshToken}`);
      } catch (err) {
        console.log(err.message);
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
      console.log("User log out error. ", err.message);
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
    console.log("In auth action at saveDataToStorage function: ", err.message);
  }
};
