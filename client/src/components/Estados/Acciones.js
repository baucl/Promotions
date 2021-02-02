import React from "react";
import { Space, Button, Tooltip, Popconfirm } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  FireOutlined,
} from "@ant-design/icons";

const Acciones = ({
  record,
  getIdFromTableHelper,
  changeHotSaleModal,
  save,
  cancel,
  edit,
  editable,
  handleEditPromotionHelper,
  handleDeletePromotionHelper,
}) => {
  return (
    <Space size="middle">
      <Tooltip
        title={
          Date.parse(record.ExpirationDate) > new Date().getTime() &&
          record.Visible
            ? "Visible"
            : "No Visible"
        }
      >
        <Button
          value={record.id}
          onClick={(e) => getIdFromTableHelper(e)}
          disabled={
            Date.parse(record.ExpirationDate) > new Date().getTime()
              ? false
              : true
          }
          type="dashed"
          shape="circle"
          size="small"
          icon={
            Date.parse(record.ExpirationDate) > new Date().getTime() &&
            record.Visible ? (
              <EyeOutlined />
            ) : (
              <EyeInvisibleOutlined />
            )
          }
        />
      </Tooltip>
      {record.Schedules != null ? (
        <Tooltip
          title={
            record.Schedules[0].Enabled
              ? "Visible (HOT SALE)"
              : "No Visible (HOT SALE)"
          }
        >
          <Button
            onClick={(e) => changeHotSaleModal(e, record)}
            disabled={
              record.Schedules != null &&
              Date.parse(record.ExpirationDate) > new Date().getTime()
                ? false
                : true
            }
            type="dashed"
            shape="circle"
            size="small"
            icon={
              <FireOutlined
                className={
                  record.Visible &&
                  Date.parse(record.ExpirationDate) > new Date().getTime() &&
                  record.Schedules != null &&
                  record.Schedules[0].Enabled
                    ? "text-warning"
                    : "text-muted"
                }
              />
            }
          />
        </Tooltip>
      ) : null}
      {editable ? (
        <span>
          <a
            href="javascript:;"
            onClick={() => save(record.id)}
            style={{
              marginRight: 8,
            }}
          >
            Guardar
          </a>
          <Popconfirm
            title="Desea cancelar la edici&oacute;n?"
            onConfirm={cancel}
            okText="Confirmar"
            cancelText="Cancelar"
          >
            <a>Cancelar</a>
          </Popconfirm>
        </span>
      ) : (
        <Tooltip title="Editar">
          <Popconfirm
            value={record.id}
            title="Tipo de edici&oacute;n"
            onConfirm={(e) => edit(e, record)}
            onCancel={(e) => handleEditPromotionHelper(e, record)}
            okText={`Parcial`}
            cancelText={`Completa`}
          >
            <Button
              type="dashed"
              shape="circle"
              size="small"
              icon={<EditOutlined />}
            />
          </Popconfirm>
        </Tooltip>
      )}
      <Tooltip title="Eliminar">
        <Button
          value={record.id}
          disabled={false}
          danger
          type="dashed"
          shape="circle"
          size="small"
          icon={<DeleteOutlined />}
          onClick={handleDeletePromotionHelper}
        />
      </Tooltip>
    </Space>
  );
};
export default Acciones;
