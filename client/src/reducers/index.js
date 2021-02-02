import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import Config from "./Config";
import promotion from "./promotion";
import auth from "./auth";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    config: Config,
    auth: auth,
    promotions: promotion,
  });
