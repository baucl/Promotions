import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Promociones from "./dashboard/Promociones";
import Estados from "./dashboard/Estados";
import Producto from "./dashboard/Producto";
import NotFound from "../components/404";
import { withRouter } from "react-router";

const Routes = () => (
  <Switch>
    <Route exact path={"/listado-promociones"} component={Estados} />
    <Route exact path={"/nueva-promocion"} component={Promociones} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default withRouter(Routes);
