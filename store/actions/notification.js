export const FETCH_NOTIFICATION_FAILURE = "FETCH_NOTIFICATION_FAILURE";
export const FETCH_NOTIFICATION_REQUEST = "FETCH_NOTIFICATION_REQUEST";
export const FETCH_NOTIFICATION_SUCCESS = "FETCH_NOTIFICATION_SUCCESS";
export const INCREASE_NOTIFICATION_COUNT = "INCREASE_NOTIFICATION_COUNT";
export const RESET_NOTIFICATION_COUNT = "RESET_NOTIFICATION_COUNT";

export const fetchNotification = () => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_NOTIFICATION_REQUEST });
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    fetch(
      `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}/Notifications.json?auth=${token}`
    )
      .then((response) => response.json())
      .then((notification) => {
        if (notification && notification.error) {
          throw notification.error;
        }

        dispatch({
          type: FETCH_NOTIFICATION_SUCCESS,
          notification: notification != null ? notification.reverse() : [],
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_NOTIFICATION_FAILURE, error: error });
      });
  };
};

export const increaseNotificationCount = () => {
  return (dispatch) => {
    dispatch({
      type: INCREASE_NOTIFICATION_COUNT,
    });
  };
};

export const resetNotificationCount = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_NOTIFICATION_COUNT,
    });
  };
};
