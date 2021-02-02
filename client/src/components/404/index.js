import React from "react";
import { Result, Button } from "antd";

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Disculpa, no se pudo encontrar la p&aacute;gina que buscas."
      extra={<Button type="primary" href="/listado-promociones">Volver</Button>}
    />
  );
};
export default NotFound;
