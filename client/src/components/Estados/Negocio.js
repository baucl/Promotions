import React, { useEffect, useState } from "react";

const Negocios = ({ text }) => {
  const [negocio, setNegocio] = useState(null);
  useEffect(() => {
    switch (text) {
      case "WM":
        setNegocio("Walmart");
        break;
      case "IU":
        setNegocio("IUD\u00DA");
        break;
      default:
        setNegocio("Sin asignar");
        break;
    }
  }, [text]);
  return <span>{negocio}</span>;
};
export default Negocios;
