import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const Confirmacion = ({ isEdit, handleOnCloseDrawer, loading }) => {
  return (
    <Result
      status="success"
      title={"Se ha creado la Promoci\u00F3n exitosamente!"}
      extra={[
        <Link to={"/listado-promociones"}>
          <Button type="primary" key="1">
            Estados
          </Button>
        </Link>,
      ]}
    />
  );
};

export default Confirmacion;
