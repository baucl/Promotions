import {
  GET_ALL_PROMOTIONS,
  SAVE_ALL_PROMOTIONS,
  DELETE_PROMOTION_BY_ID,
  SAVE_GENERAL_INFO,
  SAVE_HOT_SALE_INFO,
  SAVE_BENEFICIOS_INFO,
  SAVE_DETALLES_INFO,
  SAVE_SUBIDA_IMAGEN_INFO,
  SAVE_CONFIRMACION_INFO,
  PUT_PROMOTION_DATA,
  ACTION_SUCCESS,
  TAB_INDEX,
  CHANGE_HOTSALE_BANNER,
  ASSIGN_A_NEW_HOT_SALE,
  CREATE_A_NEW_PROMOTION,
} from "../constants/ActionTypes";

export const get_all_promotions = () => {
  return {
    type: GET_ALL_PROMOTIONS,
    payload: null,
  };
};

export const create_a_new_promotion = (data) => {
  return {
    type: CREATE_A_NEW_PROMOTION,
    payload: data,
  };
};

export const save_all_promotions = (data) => {
  return {
    type: SAVE_ALL_PROMOTIONS,
    payload: data,
  };
};

export const delete_promotion_by_id = (id) => {
  return {
    type: DELETE_PROMOTION_BY_ID,
    payload: id,
  };
};

export const save_general_info = (payload) => {
  return {
    type: SAVE_GENERAL_INFO,
    payload: payload,
  };
};

export const save_hot_sale_info = (payload) => {
  return {
    type: SAVE_HOT_SALE_INFO,
    payload: payload,
  };
};

export const save_beneficios_info = (payload) => {
  return {
    type: SAVE_BENEFICIOS_INFO,
    payload: payload,
  };
};

export const save_detalles_info = (payload) => {
  return {
    type: SAVE_DETALLES_INFO,
    payload: payload,
  };
};

export const save_subida_imagen_info = (payload) => {
  return {
    type: SAVE_SUBIDA_IMAGEN_INFO,
    payload: payload,
  };
};

export const save_confirmacion_info = (payload) => {
  return {
    type: SAVE_CONFIRMACION_INFO,
    payload: payload,
  };
};

export const put_promotion_data = (data) => {
  return {
    type: PUT_PROMOTION_DATA,
    payload: data,
  };
};

export const save_action_success = (info) => {
  return {
    type: ACTION_SUCCESS,
    payload: info,
  };
};

export const tab_index = (index) => {
  return {
    type: TAB_INDEX,
    payload: index,
  };
};

export const change_hotsale_banner = (payload) => {
  payload.imgDisable.Schedules[0].Enabled = false;
  payload.imgEnable.Schedules[0].Enabled = true;
  payload.imgDisable.Order = 2;
  payload.imgEnable.Order = 1;
  return {
    type: CHANGE_HOTSALE_BANNER,
    payload: payload,
  };
};

export const assign_a_new_hotsale_banner = (payload) => {
  payload.Schedules[0].Enabled = true;
  payload.Order = 1;
  return {
    type: ASSIGN_A_NEW_HOT_SALE,
    payload: payload,
  };
};