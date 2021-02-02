import React from "react";
import "antd/dist/antd.css";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";

import configureStore, { history } from "./store";
import App from "./containers/App";

export const store = configureStore();

const MainApp = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route render={() => <App />} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default MainApp;
