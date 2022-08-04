import { Alert } from "react-native";

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_ADDRESS = "UPDATE_USER_ADDRESS";

export const fetchUser = () => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_USER_REQUEST });
    const token = getState().auth.token;

    fetch(`${process.env.BACKEND_BASE_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "x-auth-token": token,
      },
    })
      .then((response) => response.json())
      .then((user) => {
        if (user && user.error) {
          throw user.error;
        }

        dispatch({
          type: FETCH_USER_SUCCESS,
          name: user && user.name ? user.name : "Not Set",
          phone: user && user.phone ? user.phone : "Not Set",
          email: user && user.email ? user.email : "Not Set",
          gender: user && user.gender ? user.gender : "Not Set",
          birthday: user && user.birthday ? user.birthday : "Not Set",
          address: user && user.addressess ? user.addressess : [],
          defaultAddress:
            user && user.defaultAddress ? user.defaultAddress : null,
        });
      })
      .catch((error) => dispatch({ type: FETCH_USER_FAILURE, error: error }));
  };
};

export const updateUserDetails = (obj) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    fetch(`${process.env.BACKEND_BASE_URL}/api/users/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        [obj.name]: obj.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.error) {
          throw data.error;
        }
        dispatch({
          type: UPDATE_USER,
          obj: obj,
        });
      })
      .catch((error) => dispatch({ type: FETCH_USER_FAILURE, error: error }));
  };
};

export const updateUserAddress = (address) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    if (address.addressId) {
      const addressId = address.addressId;
      delete address.addressId;

      try {
        const response = await fetch(
          `${process.env.BACKEND_BASE_URL}/api/users/userAddress/${addressId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
            body: JSON.stringify(address),
          }
        );

        const data = await response.json();

        if (data && data.error) {
          throw data.error;
        }

        dispatch({
          type: UPDATE_USER_ADDRESS,
          data: {
            addressess: data.addressess,
            defaultAddress: data.defaultAddress,
          },
        });
      } catch (error) {
        console.log(error);
        dispatch({ type: FETCH_USER_FAILURE, error: error });
      }
    } else {
      try {
        const response = await fetch(
          `${process.env.BACKEND_BASE_URL}/api/users/userAddress`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
            body: JSON.stringify(address),
          }
        );

        const data = await response.json();

        if (data && data.error) {
          throw data.error;
        }

        dispatch({
          type: UPDATE_USER_ADDRESS,
          data: {
            addressess: data.addressess,
            defaultAddress: data.defaultAddress,
          },
        });
      } catch (error) {
        console.log(error);
        dispatch({ type: FETCH_USER_FAILURE, error: error });
      }
    }
  };
};

export const deleteUserAddress = (addressId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const defaultAddress = getState().user.defaultAddress;

    if (defaultAddress === addressId) {
      Alert.alert("Can't delete default address");
    } else {
      try {
        const response = await fetch(
          `${process.env.BACKEND_BASE_URL}/api/users/userAddress/${addressId}`,
          {
            method: "DELETE",
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
          type: UPDATE_USER_ADDRESS,
          data: {
            addressess: data.addressess,
            defaultAddress: data.defaultAddress,
          },
        });
      } catch (error) {
        dispatch({ type: FETCH_USER_FAILURE, error: error });
      }
    }
  };
};
