export const ADD_ORDER_REQUEST = "ADD_ORDER_REQUEST";
export const ADD_ORDER_SUCCESS = "ADD_ORDER_SUCCESS";
export const ADD_ORDER_FAILURE = "ADD_ORDER_FAILURE";
export const FETCH_ORDER_FAILURE = "FETCH_ORDER_FAILURE";
export const FETCH_ORDER_REQUEST = "FETCH_ORDER_REQUEST";
export const FETCH_ORDER_SUCCESS = "FETCH_ORDER_SUCCESS";
import setting from "../../Constant/setting";

export const fetchOrder = () => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_ORDER_REQUEST });
    const token = getState().auth.token;

    try {
      const response = await fetch(`${setting.apiUrl}/api/users/orders/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      const result = await response.json();

      if (result && result.error) {
        throw result.error;
      }

      dispatch({
        type: FETCH_ORDER_SUCCESS,
        order: result.data,
      });
    } catch (error) {
      dispatch({ type: FETCH_ORDER_FAILURE, error: error });
    }
  };
};

export const addOrder = (order) => {
  return async (dispatch, getState) => {
    dispatch({ type: ADD_ORDER_REQUEST });
    const token = getState().auth.token;

    try {
      const response = await fetch(`${setting.apiUrl}/api/orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(order),
      });

      const result = await response.json();

      if (result && result.error) {
        throw result.error;
      } else {
        dispatch({
          type: ADD_ORDER_SUCCESS,
          order: result.data,
        });
      }
    } catch (error) {
      dispatch({ type: ADD_ORDER_FAILURE, error: error });
    }
  };
};
