import { CONFIG_INITIAL } from "../constants/ActionTypes";

export const config_initial = (id) => {
  return {
    type: CONFIG_INITIAL,
    payload: id,
  };
};
