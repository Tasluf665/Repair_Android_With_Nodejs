import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_ADDRESS,
} from "../actions/user";

const initialState = {
  userLoading: false,
  name: "Not Set",
  phone: "Not Set",
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
        phone: action.phone,
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
      return {
        ...state,
        address: action.data.addressess,
        defaultAddress: action.data.defaultAddress,
        userLoading: false,
        userError: null,
      };
    default:
      return state;
  }
};

export default userReducer;
