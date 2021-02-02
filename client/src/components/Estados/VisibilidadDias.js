import React, { useEffect, useState } from "react";
import moment from "moment";
import { Tag } from "antd";

const VisibilidadDias = ({ record }) => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    if (
      record !== null &&
      record.Schedules !== null &&
      !moment(new Date()).isAfter(record.ExpirationDate) &&
      Array.isArray(record.Schedules) &&
      record.Schedules.length > 0 &&
      Array.isArray(record.Schedules[0].Days) &&
      record.Schedules[0].Days.length > 0 &&
      record.Schedules[0].Enabled
    ) {
      setDays(record.Schedules[0].Days);
    }
  }, [record]);

  const showDays = (day) => {
    let shortNameDay = null;
    switch (day) {
      case 0:
        shortNameDay = "D";
        break;
      case 1:
        shortNameDay = "L";
        break;
      case 2:
        shortNameDay = "M";
        break;
      case 3:
        shortNameDay = "M";
        break;
      case 4:
        shortNameDay = "J";
        break;
      case 5:
        shortNameDay = "V";
        break;
      case 6:
        shortNameDay = "S";
        break;
      default:
        shortNameDay = null;
        break;
    }
    return shortNameDay;
  };

  return days.map((day, i) => {
    let dayEnabledHotSale =
      day === new Date().getDay() && record.Schedules[0].Enabled;
    return (
      <span className="small" key={i}>
        <Tag
          color={dayEnabledHotSale ? "gold" : "default"}
          className={dayEnabledHotSale ? "mr-0 font-weight-bold" : "mr-0"}
          key={day}
        >
          {showDays(day)}
        </Tag>
      </span>
    );
  });
};

export default VisibilidadDias;
