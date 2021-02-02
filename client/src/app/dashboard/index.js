import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { get_all_promotions } from "../../actions/promotion";
import {
  PicCenterOutlined,
  GiftOutlined,
  LoginOutlined,
} from "@ant-design/icons";

const IndexPage = ({ children }) => {
  const { Item } = Menu;
  const { allPromotion } = useSelector(({ promotions }) => promotions);
  const dispatch = useDispatch();
  const { Header, Content, Footer } = Layout;

  const deleteLocalStorageInfo = () => {
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    allPromotion === null && dispatch(get_all_promotions());
  }, [allPromotion]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="ant-layout" >
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="horizontal" >
          <Item key="1" icon={<PicCenterOutlined style={{ fontSize: 22 }} />}>
            <Link style={{ textDecoration: "none" }} to="/listado-promociones">
              Estados
            </Link>
          </Item>
          <Item key="2" icon={<GiftOutlined style={{ fontSize: 22 }} />}>
            <Link style={{ textDecoration: "none" }} to="/promocion">
              Nueva Promoci&oacute;n
            </Link>
          </Item>
          <Item key="3" icon={<LoginOutlined style={{ fontSize: 22 }} />} className="d-flex align-items-center float-right">
            <Link
              style={{ textDecoration: "none" }}
              to="/signin"
              onClick={deleteLocalStorageInfo}
            >
              Salir
            </Link>
          </Item>
        </Menu>
      </Header>
      <Content style={{ margin: "0 16px" }}>{children}</Content>
      <Footer style={{ textAlign: "center" }} className="bg-white py-3">
        {`Promociones - IUD\u00DA © ${new Date().getFullYear()}`}
      </Footer>
    </Layout>
  );
};

export default IndexPage;
