import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { SEND_CREDENTIALS } from "../constants/ActionTypes";
import { controllerAutenticar } from "../services/service";
import {
  save_auth_success,
  message_auth,
  save_auth_data_success,
} from "../actions/auth";

const signInRequest = async (data) =>
  await controllerAutenticar(data)
    .then((response) => response)
    .catch((error) => error);

function* signInData({ payload }) {
  let signInResposne = null;
  try {
    signInResposne = yield call(signInRequest, payload);
    if (signInResposne != null && signInResposne.success) {
      localStorage.setItem("user", signInResposne.success);
      localStorage.setItem("token", signInResposne.value.token);
      localStorage.setItem("tokenExpiration", signInResposne.value.expiration);
      yield put(save_auth_success(true));
      yield put(save_auth_data_success(signInResposne.value.message));
    } else {
      yield put(message_auth(signInResposne.error.message));
    }
  } catch (error) {
    yield put(message_auth(signInResposne.error.message));
  }
}

export function* signIn() {
  yield takeEvery(SEND_CREDENTIALS, signInData);
}

export default function* rootSaga() {
  yield all([fork(signIn)]);
}
