import React, { useEffect, useState } from "react";
import moment from "moment";
import { Tag } from "antd";

const Expiracion = ({ date }) => {
  const [color, setColor] = useState("success");
  const [name, setName] = useState("Habilitado");
  const DIASDEVENCIMIENTO = 8;

  useEffect(() => {
    if (Date.parse(date) > new Date().getTime()) {
      if (new Date().getDate() - DIASDEVENCIMIENTO > Math.abs(moment(new Date()).diff(new Date(date), "days"))) {
        setColor("gold");
        setName("Por Expirar");
      } else {
        setColor("success");
        setName("Habilitado");
      }
    } else {
      setColor("error");
      setName("No Habilitado");
    }
  }, [date]);

  return (
    <span>
      <Tag color={color} key={date}>
        {name}
      </Tag>
    </span>
  );
};
export default Expiracion;
