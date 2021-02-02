import {
  SAVE_ALL_PROMOTIONS,
  SAVE_GENERAL_INFO,
  SAVE_HOT_SALE_INFO,
  SAVE_BENEFICIOS_INFO,
  SAVE_DETALLES_INFO,
  SAVE_SUBIDA_IMAGEN_INFO,
  SAVE_CONFIRMACION_INFO,
  ACTION_SUCCESS,
  TAB_INDEX,
} from "../constants/ActionTypes";

const initialPromotion = {
  allPromotion: null,
  generalInfo: null,
  hotSaleInfo: null,
  beneficiosInfo: null,
  detallesInfo: null,
  subidaImagenInfo: null,
  confimacionInfo: null,
  actionSuccess: false,
  tabIndex: 0,
};

export default (state = initialPromotion, action) => {
  switch (action.type) {
    case SAVE_ALL_PROMOTIONS: {
      return {
        ...state,
        allPromotion: action.payload,
      };
    }
    case SAVE_GENERAL_INFO: {
      return {
        ...state,
        generalInfo: action.payload,
      };
    }
    case SAVE_HOT_SALE_INFO: {
      return {
        ...state,
        hotSaleInfo: action.payload,
      };
    }
    case SAVE_BENEFICIOS_INFO: {
      return {
        ...state,
        beneficiosInfo: action.payload,
      };
    }
    case SAVE_DETALLES_INFO: {
      return {
        ...state,
        detallesInfo: action.payload,
      };
    }
    case SAVE_SUBIDA_IMAGEN_INFO: {
      return {
        ...state,
        subidaImagenInfo: action.payload,
      };
    }
    case SAVE_CONFIRMACION_INFO: {
      return {
        ...state,
        confimacionInfo: action.payload,
      };
    }
    case ACTION_SUCCESS: {
      return {
        ...state,
        actionSuccess: action.payload,
      };
    }
    case TAB_INDEX: {
      return {
        ...state,
        tabIndex: action.payload,
      };
    }
    default:
      return state;
  }
};
