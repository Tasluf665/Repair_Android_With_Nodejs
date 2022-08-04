import {
  FETCH_NOTIFICATION_FAILURE,
  FETCH_NOTIFICATION_REQUEST,
  FETCH_NOTIFICATION_SUCCESS,
  INCREASE_NOTIFICATION_COUNT,
  RESET_NOTIFICATION_COUNT,
} from "../actions/notification";

const initialState = {
  notificationLoading: false,
  notifications: [],
  notificationError: null,
  notificationCount: 0,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATION_REQUEST: {
      return {
        ...state,
        notificationLoading: true,
        notificationError: null,
      };
    }
    case FETCH_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        notifications: action.notifications,
        notificationLoading: false,
        notificationError: null,
      };
    }
    case FETCH_NOTIFICATION_FAILURE:
      return {
        ...state,
        notificationLoading: true,
        notificationError: action.error,
      };
    case INCREASE_NOTIFICATION_COUNT:
      return {
        ...state,
        notificationCount: state.notificationCount + 1,
      };
    case RESET_NOTIFICATION_COUNT:
      return {
        ...state,
        notificationCount: 0,
      };
    default:
      return state;
  }
};

export default notificationReducer;
