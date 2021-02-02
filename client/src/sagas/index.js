import { all } from "redux-saga/effects";
import config from "./config";
import promotion from "./promotion";
import auth from "./auth";

export default function* rootSaga(getState) {
  yield all([config(), promotion(), auth()]);
}
