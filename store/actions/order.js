export const ADD_ORDER_REQUEST = "ADD_ORDER_REQUEST";
export const ADD_ORDER_SUCCESS = "ADD_ORDER_SUCCESS";
export const ADD_ORDER_FAILURE = "ADD_ORDER_FAILURE";
export const FETCH_ORDER_FAILURE = "FETCH_ORDER_FAILURE";
export const FETCH_ORDER_REQUEST = "FETCH_ORDER_REQUEST";
export const FETCH_ORDER_SUCCESS = "FETCH_ORDER_SUCCESS";

export const fetchOrder = () => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_ORDER_REQUEST });
    const token = getState().auth.token;

    try {
      const response = await fetch(
        `${process.env.BACKEND_BASE_URL}/api/users/orders/`,
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
        type: FETCH_ORDER_SUCCESS,
        order: data.orders,
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
      const response = await fetch(
        `${process.env.BACKEND_BASE_URL}/api/orders/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify(order),
        }
      );

      const data = await response.json();

      if (data && data.error) {
        throw data.error;
      } else {
        dispatch({
          type: ADD_ORDER_SUCCESS,
          order: data.order,
        });
      }
    } catch (error) {
      dispatch({ type: ADD_ORDER_FAILURE, error: error });
    }
  };
};

export const makePayment = (paymentInfo) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    fetch(
      `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}/Orders/${paymentInfo.orderId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentInfo),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.error) {
          throw data.error;
        } else {
          console.log("Payment is Successfull");
        }
      })
      .catch((error) => {
        console.log("Payment is Unsuccessfull");
      });
  };
};
