import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { CONFIG_INITIAL } from "../constants/ActionTypes";

const configInitialRequest = async () => await undefined;

function* config() {
  try {
    const signOutUser = yield call(configInitialRequest);
    if (signOutUser === undefined) {
      yield put(null);
    } else {
      yield put(null);
    }
  } catch (error) {
    yield put(null);
  }
}

export function* configInitial() {
  yield takeEvery(CONFIG_INITIAL, config);
}

export default function* rootSaga() {
  yield all([fork(configInitial)]);
}
