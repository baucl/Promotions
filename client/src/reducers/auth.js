import {
  ACTION_AUTH_SUCCESS,
  MESSAGE_AUTH,
  SAVE_AUTH_DATA_SUCCESS,
} from "../constants/ActionTypes";

const initialAuth = {
  success: false,
  message: null,
  data: null,
};

export default (state = initialAuth, action) => {
  switch (action.type) {
    case ACTION_AUTH_SUCCESS: {
      return {
        ...state,
        success: action.payload,
      };
    }
    case MESSAGE_AUTH: {
      return {
        ...state,
        message: action.payload,
      };
    }
    case SAVE_AUTH_DATA_SUCCESS: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default:
      return state;
  }
};
