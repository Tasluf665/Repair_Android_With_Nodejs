import {
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILURE,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAILURE,
} from "../actions/order";

const initialState = {
  orderLoading: false,
  order: [],
  orderError: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_REQUEST:
      return {
        ...state,
        orderLoading: true,
        orderError: null,
      };
    case ADD_ORDER_SUCCESS:
      const addOrder = [...state.order];
      addOrder.push(action.order);
      return {
        ...state,
        order: addOrder,
        orderLoading: false,
        orderError: null,
      };
    case ADD_ORDER_FAILURE:
      return {
        ...state,
        orderLoading: true,
        orderError: action.error,
      };
    case FETCH_ORDER_REQUEST: {
      return {
        ...state,
        orderLoading: true,
        orderError: null,
      };
    }
    case FETCH_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderLoading: false,
        orderError: null,
      };
    }
    case FETCH_ORDER_FAILURE:
      return {
        ...state,
        orderLoading: true,
        orderError: action.error,
      };
    default:
      return state;
  }
};

export default orderReducer;
