import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { get_all_promotions } from "../../actions/promotion";
import {
  PicCenterOutlined,
  GiftOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
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
    <Layout style={{ minHeight: "100vh", background: "linear-gradient(to right,#3c71b5,#753c90)!important" }}>
      <Header className="ant-layout" >
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="horizontal" >
          <Item key="1" icon={<PicCenterOutlined style={{ fontSize: 22 }} />}>
            <Link style={{ textDecoration: "none" }} to="/listado-promociones">
              Estados
            </Link>
          </Item>
          <Item key="2" icon={<GiftOutlined style={{ fontSize: 22 }} />}>
            <Link style={{ textDecoration: "none" }} to="/nueva-promocion">
              Nueva Promoci&oacute;n
            </Link>
          </Item>
          <Item key="3" icon={<ShoppingCartOutlined style={{ fontSize: 22 }} />}>
            <Link style={{ textDecoration: "none" }} to="/alta-producto">
              Alta Producto
            </Link>
          </Item>
          <Item key="4" icon={<LoginOutlined style={{ fontSize: 22 }} />} className="d-flex align-items-center float-right">
            <Link
              style={{ textDecoration: "none" }}
              to="/login"
              onClick={deleteLocalStorageInfo}
            >
              Salir
            </Link>
          </Item>
        </Menu>
      </Header>
      <Content style={{ margin: "0 16px" }}>{children}</Content>
      <Footer style={{ textAlign: "center" }} className="bg-white py-3">
        {`IUD\u00DA © ${new Date().getFullYear()}`}
      </Footer>
    </Layout>
  );
};

export default IndexPage;
