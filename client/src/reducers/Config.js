import { CONFIG_INITIAL } from "../constants/ActionTypes";

const initialConfig = {
  id: null,
};

export default (state = initialConfig, action) => {
  switch (action.type) {
    case CONFIG_INITIAL: {
      return {
        ...state,
        id: action.payload,
      };
    }
    default:
      return state;
  }
};
