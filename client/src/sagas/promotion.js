import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { save_action_success, save_all_promotions } from "../actions/promotion";
import {
  DELETE_PROMOTION_BY_ID,
  GET_ALL_PROMOTIONS,
  PUT_PROMOTION_DATA,
  CHANGE_HOTSALE_BANNER,
  ASSIGN_A_NEW_HOT_SALE,
  CREATE_A_NEW_PROMOTION,
} from "../constants/ActionTypes";
import {
  controllerGetAllPromotions,
  controllerUpdatePromotion,
  controllerDeletePromotion,
  controllerCreatePromotion,
} from "../services/service";

const getallPromotionsRequest = async () =>
  await controllerGetAllPromotions()
    .then((response) => response)
    .catch((error) => error);

const deletePromotionByIdRequest = async (id) =>
  await controllerDeletePromotion(id)
    .then((response) => response)
    .catch((error) => error);

const createANewPromotionRequest = async (data) =>
  await controllerCreatePromotion(data)
    .then((response) => response)
    .catch((error) => error);

const putPromotionRequest = async (data) =>
  await controllerUpdatePromotion(data)
    .then((response) => response)
    .catch((error) => error);

const putChangePromotionRequest = async ({ imgDisable, imgEnable }) =>
  await Promise.all([
    controllerUpdatePromotion(imgDisable),
    controllerUpdatePromotion(imgEnable),
  ])
    .then((response) => response)
    .catch((error) => error);

function* getAllPromotionsData() {
  try {
    const all = yield call(getallPromotionsRequest);
    if (all != null && all.success) {
      yield put(save_all_promotions(all));
    } else {
      yield put(save_all_promotions(all));
    }
  } catch (error) {
    yield put(save_all_promotions(all));
  }
}

function* deletePromotionByIdData({ payload }) {
  try {
    let Id = payload;
    const deletePromotion = yield call(deletePromotionByIdRequest, Id);
    if (deletePromotion != null && deletePromotion.success) {
      yield put(save_action_success(deletePromotion.success));
    } else {
      yield put(save_action_success(false));
    }
  } catch (error) {
    yield put(save_action_success(false));
  }
}

function* createANewPromotionData({ payload }) {
  try {
    const createPromotion = yield call(createANewPromotionRequest, payload);
    if (createPromotion != null && createPromotion.success) {
      yield put(save_action_success(createPromotion.success));
    } else {
      yield put(save_action_success(false));
    }
  } catch (error) {
    yield put(save_action_success(false));
  }
}

function* putPromotionData({ payload }) {
  try {
    const putPromotion = yield call(putPromotionRequest, payload);
    if (putPromotion != null && putPromotion.success) {
      yield put(save_action_success(putPromotion.success));
    } else {
      yield put(save_action_success(false));
    }
  } catch (error) {
    yield put(save_action_success(false));
  }
}

function* putChangePromotionData({ payload }) {
  try {
    const putChangePromotion = yield call(putChangePromotionRequest, payload);
    if (
      putChangePromotion[0] != null &&
      putChangePromotion[1] != null &&
      putChangePromotion[0].success &&
      putChangePromotion[1].success
    ) {
      yield put(save_action_success(putChangePromotion[0].success));
    } else {
      yield put(save_action_success(false));
    }
  } catch (error) {
    yield put(save_action_success(false));
  }
}

export function* getAllPromotions() {
  yield takeEvery(GET_ALL_PROMOTIONS, getAllPromotionsData);
}

export function* deletePromotionById() {
  yield takeEvery(DELETE_PROMOTION_BY_ID, deletePromotionByIdData);
}

export function* createANewPromotion() {
  yield takeEvery(CREATE_A_NEW_PROMOTION, createANewPromotionData);
}

export function* putPromotion() {
  yield takeEvery(PUT_PROMOTION_DATA, putPromotionData);
}

export function* putChangePromotion() {
  yield takeEvery(CHANGE_HOTSALE_BANNER, putChangePromotionData);
}

export function* assignANewHotSalePromotion() {
  yield takeEvery(ASSIGN_A_NEW_HOT_SALE, putPromotionData);
}

export default function* rootSaga() {
  yield all([
    fork(getAllPromotions),
    fork(deletePromotionById),
    fork(putPromotion),
    fork(putChangePromotion),
    fork(assignANewHotSalePromotion),
    fork(createANewPromotion),
  ]);
}
