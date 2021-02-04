import React from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  Switch,
  DatePicker,
  Popover,
  Divider,
  TreeSelect,
} from "antd";
import moment from "moment";
import {
  CloseOutlined,
  CheckOutlined,
  InfoCircleOutlined,
  FireOutlined,
  ShoppingOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { treeData } from "../../../helpers/Promociones/treeData";

const GeneralForm = ({
  onFinish,
  dataUpdate,
  isRequiredFecha,
  changeNegocio,
}) => {
  const { Option } = Select;
  const { Item } = Form;
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;
  const { SHOW_PARENT } = TreeSelect;
  const tProps = {
    treeData,
    value: null,
    onChange: null,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Seleccione",
    style: {
      width: "100%",
    },
  };

  return (
    <Form
      layout="vertical"
      hideRequiredMark
      className="pt-3"
      onFinish={onFinish}
      initialValues={dataUpdate}
    >
      <Divider orientation="left">
        GENERAL <ShoppingOutlined className="text-success" />
      </Divider>
      <Row gutter={16}>
        <Col span={12}>
          <Item
            name="Name"
            label="Titulo"
            rules={[{ required: true, message: "Por favor ingrese un titulo" }]}
            initialValue={dataUpdate.Name}
          >
            <Input placeholder="Ingrese un titulo" />
          </Item>
        </Col>
        <Col span={12}>
          <Item
            name="Negocio"
            label="Negocio"
            rules={[
              {
                required: true,
                message: "Por favor seleccione un negocio",
              },
            ]}
          >
            <Select placeholder="Seleccione" onChange={changeNegocio}>
              <Option value="WM">Walmart</Option>
              <Option value="IU">IUD&Uacute;</Option>
            </Select>
          </Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Item
            name="fechaIF"
            label={
              <>
                <span className="pr-2">Fecha</span>
                <Popover
                  content={
                    <>
                      <span>
                        Inicio: Representa la fecha y hora desde cuando la
                        promoci&oacute;n tiene vigencia.
                      </span>
                      <br />
                      <span>
                        Expiraci&oacute;n: Representa la fecha y hora en que
                        expira la promoci&oacute;n.
                      </span>
                    </>
                  }
                >
                  <InfoCircleOutlined className="text-info" />
                </Popover>
              </>
            }
            rules={[
              {
                required: isRequiredFecha,
                message: "Debe elegir un rango de fechas/horas.",
              },
            ]}
            initialValue={[
              moment(dataUpdate.DateFrom, "YYYY-MM-DDTHH:mm:ss"),
              moment(dataUpdate.ExpirationDate, "YYYY-MM-DDTHH:mm:ss"),
            ]}
          >
            <RangePicker
              className="col-12"
              placeholder={["Inicio", "Expiraci\u00F3n"]}
              ranges={{
                Hoy: [moment(), moment()],
                "Mes en curso": [
                  moment().startOf("month"),
                  moment().endOf("month"),
                ],
              }}
              showTime
              format="YYYY-MM-DDTHH:mm:ss"
            />
          </Item>
        </Col>
        <Col span={12}>
          <Item
            name="Description"
            label="Descripcion"
            rules={[{ required: false }]}
          >
            <Input placeholder="Breve descrpici&oacute;n..." />
          </Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <div className="ml-2">
            <Item name="Visible" label="Visible">
              <Switch
                defaultChecked={
                  dataUpdate !== null ? dataUpdate.Visible : false
                }
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              />
            </Item>
          </div>
        </Col>
      </Row>
      <Divider orientation="left">
        HOT SALE <FireOutlined className="text-warning" />
      </Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Item
            name="Days"
            label={
              <>
                <span className="pr-2">Dias</span>
                <Popover
                  content={
                    <a>D&iacute;as en los que se quiere mostrar el HotSale.</a>
                  }
                >
                  <InfoCircleOutlined className="text-info" />
                </Popover>
              </>
            }
            rules={[
              {
                required: false,
                message:
                  "Por favor seleccione los dias en lo que desea mostrar el banner de HOT SALE",
              },
            ]}
            initialValue={
              dataUpdate != null &&
              dataUpdate.Schedules != null &&
              dataUpdate.Schedules.length > 0
                ? dataUpdate.Schedules[0].Days
                : []
            }
          >
            <TreeSelect
              {...tProps}
              defaultValue={
                dataUpdate != null &&
                dataUpdate.Schedules != null &&
                dataUpdate.Schedules.length > 0
                  ? dataUpdate.Schedules[0].Days
                  : []
              }
            />
          </Item>
        </Col>
      </Row>
      <Divider orientation="left">
        <div>
          LEGALES <FileTextOutlined className="text-info" />
        </div>
      </Divider>
      <Row gutter={16}>
        <Col span={24}>
          <Item
            name="Legal"
            rules={[
              {
                required: true,
                message: "Por favor ingrese los legales",
              },
            ]}
          >
            <TextArea rows={4} placeholder="Legales..." />
          </Item>
        </Col>
      </Row>

      <Row className="float-right">
        <Button type="primary" htmlType="submit">
          Siguiente
        </Button>
      </Row>
    </Form>
  );
};

export default GeneralForm;
