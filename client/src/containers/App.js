import React, { useEffect } from "react";
import moment from "moment";
import { createBrowserHistory } from "history";
import { Redirect, Route, Switch } from "react-router-dom";
import AppLayout from "../containers/AppLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "../containers/SignIn";

const RestrictedRoute = ({
  component: Component,
  authUser,
  expiresJWT,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      authUser && expiresJWT ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const App = () => {
  const history = createBrowserHistory();
  const isAuth = localStorage.getItem("user") !== null;
  const expires =
    localStorage.getItem("tokenExpiration") !== null &&
    !moment(new Date()).isAfter(localStorage.getItem("tokenExpiration"));

  return (
    <div className="app-main">
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <RestrictedRoute
          path="/"
          authUser={isAuth}
          expiresJWT={expires}
          component={AppLayout}
        />
      </Switch>
    </div>
  );
};

export default App;
