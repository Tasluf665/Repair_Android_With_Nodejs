export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_ADDRESS = "UPDATE_USER_ADDRESS";
export const DELETE_USER_ADDRESS = "DELETE_USER_ADDRESS";
export const UPDATE_USER_ADDRESS_UPDATE = "UPDATE_USER_ADDRESS_UPDATE";
export const SET_DEFAULT = "SET_DEFAULT";

export const fetchUser = () => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_USER_REQUEST });
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    fetch(
      `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}/Details.json?auth=${token}`
    )
      .then((response) => response.json())
      .then((user) => {
        if (user && user.error) {
          throw user.error;
        }

        let targetObj = [];
        if (user && user.address) {
          for (let item in user.address) {
            user.address[item].key = item;
            targetObj.push(user.address[item]);
          }
        }

        dispatch({
          type: FETCH_USER_SUCCESS,
          name: user && user.name ? user.name : "Not Set",
          mobile: user && user.mobile ? user.mobile : "Not Set",
          email: user && user.email ? user.email : "Not Set",
          gender: user && user.gender ? user.gender : "Not Set",
          birthday: user && user.birthday ? user.birthday : "Not Set",
          address: targetObj,
          defaultAddress:
            user && user.address && user.address.default
              ? user.address.default.default
              : null,
        });
      })
      .catch((error) => dispatch({ type: FETCH_USER_FAILURE, error: error }));
  };
};

export const updateUserDetails = (obj) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    fetch(
      `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}/Details.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [obj.name]: obj.value,
        }),
      }
    )
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
    const userId = getState().auth.userId;

    if (address.key) {
      fetch(
        `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}/Details/address/${address.key}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(address),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.error) {
            throw data.error;
          }

          if (address.isEnable) {
            fetch(
              `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}/Details/address/default.json?auth=${token}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ default: address.key }),
              }
            )
              .then((response) => response.json())
              .then((data) => {
                dispatch({
                  type: SET_DEFAULT,
                  key: address.key,
                });
              });
          }

          dispatch({
            type: UPDATE_USER_ADDRESS_UPDATE,
            address: address,
          });
        })
        .catch((error) => {
          console.log(error);
          dispatch({ type: FETCH_USER_FAILURE, error: error });
        });
    } else {
      fetch(
        `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}/Details/address.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(address),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.error) {
            throw data.error;
          }
          address.key = data.name;

          if (address.isEnable) {
            fetch(
              `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}/Details/address/default.json?auth=${token}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ default: data.name }),
              }
            )
              .then((response) => response.json())
              .then((data) => {
                dispatch({
                  type: SET_DEFAULT,
                  key: address.key,
                });
              });
          }

          dispatch({
            type: UPDATE_USER_ADDRESS,
            address: address,
          });
        })
        .catch((error) => {
          console.log(error);
          dispatch({ type: FETCH_USER_FAILURE, error: error });
        });
    }
  };
};

export const deleteUserAddress = (key) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const defaultAddress = getState().user.defaultAddress;

    if (defaultAddress === key) {
    } else {
      fetch(
        `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/${userId}/Details/address/${key}.json?auth=${token}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.error) {
            throw data.error;
          }
          dispatch({
            type: DELETE_USER_ADDRESS,
            key,
          });
        })
        .catch((error) => {
          console.log(error);
          dispatch({ type: FETCH_USER_FAILURE, error: error });
        });
    }
  };
};
