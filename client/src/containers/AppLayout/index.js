import React from "react";
import "../../index.css";
import Routes from "../../app/index";
import IndexPage from "../../app/dashboard";
const AppLayout = () => (
  <IndexPage>
    <Routes />
  </IndexPage>
);

export default AppLayout;
