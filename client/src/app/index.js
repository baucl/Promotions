import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Promociones from "./dashboard/Promociones";
import Estados from "./dashboard/Estados";
import NotFound from "../components/404";
import { withRouter } from "react-router";

const Routes = () => (
  <Switch>
    <Route exact path={"/listado-promociones"} component={Estados} />
    <Route exact path={"/promocion"} component={Promociones} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default withRouter(Routes);
