import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  refresh_token: null,
  didTryAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        refresh_token: action.refresh_token,
        didTryAutoLogin: true,
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true,
      };
    default:
      return { ...state };
  }
};
