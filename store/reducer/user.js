import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_ADDRESS,
  DELETE_USER_ADDRESS,
  UPDATE_USER_ADDRESS_UPDATE,
  SET_DEFAULT,
} from "../actions/user";

const initialState = {
  userLoading: false,
  name: "Not Set",
  mobile: "Not Set",
  email: "Not Set",
  gender: "Not Set",
  birthday: "Not Set",
  address: [],
  userError: null,
  defaultAddress: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        userLoading: true,
        userError: null,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        name: action.name,
        mobile: action.mobile,
        email: action.email,
        gender: action.gender,
        birthday: action.birthday,
        address: action.address,
        defaultAddress: action.defaultAddress,
        userLoading: false,
        userError: null,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        userLoading: true,
        userError: action.error,
      };
    case UPDATE_USER:
      return {
        ...state,
        [action.obj.name]: action.obj.value,
        userLoading: false,
        userError: null,
      };
    case UPDATE_USER_ADDRESS:
      const addAddress = [...state.address];
      addAddress.push(action.address);
      return {
        ...state,
        address: addAddress,
        userLoading: false,
        userError: null,
      };
    case UPDATE_USER_ADDRESS_UPDATE:
      const updateAddress = [...state.address];

      let targetObj = updateAddress.map((item) => {
        if (item.key === action.address.key) {
          item = action.address;
        }
        return item;
      });

      return {
        ...state,
        address: targetObj,
        userLoading: false,
        userError: null,
      };
    case DELETE_USER_ADDRESS:
      const currentAddress = [...state.address];
      let deleteObj = currentAddress.filter((item) => item.key != action.key);
      return {
        ...state,
        address: deleteObj,
        userLoading: false,
        userError: null,
      };
    case SET_DEFAULT:
      return {
        ...state,
        defaultAddress: action.key,
        userLoading: false,
        userError: null,
      };
    default:
      return state;
  }
};

export default userReducer;
