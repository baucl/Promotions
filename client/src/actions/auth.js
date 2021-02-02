import {
  SEND_CREDENTIALS,
  ACTION_AUTH_SUCCESS,
  MESSAGE_AUTH,
  SAVE_AUTH_DATA_SUCCESS,
} from "../constants/ActionTypes";

export const send_credentials = (data) => {
  return {
    type: SEND_CREDENTIALS,
    payload: data,
  };
};

export const save_auth_success = (isSuccess) => {
  return {
    type: ACTION_AUTH_SUCCESS,
    payload: isSuccess,
  };
};

export const message_auth = (data) => {
  return {
    type: MESSAGE_AUTH,
    payload: data,
  };
};

export const save_auth_data_success = (data) => {
  return {
    type: SAVE_AUTH_DATA_SUCCESS,
    payload: data,
  };
};
