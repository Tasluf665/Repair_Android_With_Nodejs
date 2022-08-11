export const FETCH_NOTIFICATION_FAILURE = "FETCH_NOTIFICATION_FAILURE";
export const FETCH_NOTIFICATION_REQUEST = "FETCH_NOTIFICATION_REQUEST";
export const FETCH_NOTIFICATION_SUCCESS = "FETCH_NOTIFICATION_SUCCESS";
export const INCREASE_NOTIFICATION_COUNT = "INCREASE_NOTIFICATION_COUNT";
export const RESET_NOTIFICATION_COUNT = "RESET_NOTIFICATION_COUNT";

export const fetchNotification = () => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_NOTIFICATION_REQUEST });
    const token = getState().auth.token;

    try {
      const response = await fetch(
        `${process.env.BACKEND_BASE_URL}/api/users/notifications/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      const data = await response.json();

      if (data && data.error) {
        throw data.error;
      }

      dispatch({
        type: FETCH_NOTIFICATION_SUCCESS,
        notifications:
          data.notifications != null ? data.notifications.reverse() : [],
      });
    } catch (error) {
      dispatch({ type: FETCH_NOTIFICATION_FAILURE, error: error });
    }
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
