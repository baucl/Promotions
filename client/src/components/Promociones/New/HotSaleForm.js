import React from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  Switch,
  Popover,
  TreeSelect,
  TimePicker,
} from "antd";
import {
  CloseOutlined,
  CheckOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";

export const treeData = [
  {
    title: "Domingo",
    value: 0,
    key: "0",
  },
  {
    title: "Lunes",
    value: 1,
    key: "1",
  },
  {
    title: "Martes",
    value: 2,
    key: "2",
  },
  {
    title: "Mi\u00E9rcoles",
    value: 3,
    key: "3",
  },
  {
    title: "Jueves",
    value: 4,
    key: "4",
  },
  {
    title: "Viernes",
    value: 5,
    key: "5",
  },
  {
    title: "S\u00E1bado",
    value: 6,
    key: "6",
  },
];

const HotSaleForm = ({ onFinish, dataUpdate }) => {
  const { Option } = Select;
  const { Item } = Form;
  const { SHOW_PARENT } = TreeSelect;
  const tProps = {
    treeData,
    value: null /*this.state.value*/,
    onChange: null /*this.onChange*/,
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
      initialValues={dataUpdate != null ? dataUpdate.HotSale : null}
    >
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
                required: true,
                message: "Por favor seleccione los dias",
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
                  : null
              }
            />
          </Item>
        </Col>
      </Row>

      <Row gutter={16}>
        {/*<Col span={12}>
          <Item
            name="scheduleType"
            label={
              <>
                <span className="pr-2">Tipo de Horario</span>
                <Popover
                  content={
                    <>
                      <a>
                        Representa el tipo de Horario.
                        <br />
                        -Diario
                        <br />
                        -Puntual (One time)
                        <br />
                        -Semanal (Weekly)
                        <br />
                        -Mensual
                      </a>
                      <br />
                      <a>Se recominda seleccionar "Semanal".</a>
                    </>
                  }
                >
                  <InfoCircleOutlined className="text-info" />
                </Popover>
              </>
            }
            rules={[{ required: true, message: "Por favor ingrese un tipo" }]}
            initialValue={
              dataUpdate != null &&
              dataUpdate.Schedules != null &&
              dataUpdate.Schedules.length > 0
                ? dataUpdate.Schedules[0].ScheduleType
                : null
            }
          >
            <Select placeholder="Seleccione">
              <Option value="D">Diario</Option>
              <Option value="O">Puntual</Option>
              <Option value="W">Semanal</Option>
              <Option value="M">Mensual</Option>
            </Select>
          </Item>
        </Col>
        <Col span={4}>
          <Item
            name="TimeFrom"
            label={
              <>
                <span className="pr-2">Tipo de Horario</span>
                <Popover
                  content={
                    <>
                      <a>
                        Hora desde cuando la promoci&oacute;n estar&aacute;
                        vigente.
                      </a>
                      <br />
                      <a>Se recominda configurar a las "00:00".</a>
                    </>
                  }
                >
                  <InfoCircleOutlined className="text-info" />
                </Popover>
              </>
            }
            rules={[
              {
                required: false,
                message: "Por favor seleccione una hora",
              },
            ]}
            initialValue={moment(
              dataUpdate != null &&
                dataUpdate.Schedules != null &&
                dataUpdate.Schedules.length > 0
                ? dataUpdate.Schedules[0].TimeFrom.toString()
                : "00:00",
              "HH:mm"
            )}
          >
            <TimePicker
              placeholder="Seleccione"
              format={"HH:mm"}
              defaultOpen={false}
              defaultPickerValue={
                dataUpdate != null &&
                dataUpdate.Schedules != null &&
                dataUpdate.Schedules.length > 0
                  ? moment(dataUpdate.Schedules[0].TimeFrom.toString(), "HH:mm")
                  : moment("00:00", "HH:mm")
              }
            />
          </Item>
            </Col>
        <Col span={4}>
          <Item
            name="DurationMins"
            label={
              <>
                <span className="pr-2">Duracion</span>
                <Popover
                  content={
                    <>
                      <a>Duraci&oacute;n en minutos de la promoci&oacute;n.</a>
                    </>
                  }
                >
                  <InfoCircleOutlined className="text-info" />
                </Popover>
              </>
            }
            rules={[
              {
                required: true,
                message: "Por favor seleccione una duracion",
              },
            ]}
            initialValue={
              dataUpdate != null &&
              dataUpdate.Schedules != null &&
              dataUpdate.Schedules.length > 0
                ? dataUpdate.Schedules[0].DurationMins
                : null
            }
          >
            <Select placeholder="Seleccione">
              <Option value={0}>Sin Caducidad</Option>
            </Select>
          </Item>
        </Col>
        <Col span={12}>
          <Item
            name="Priority"
            label={
              <>
                <span className="pr-2">Prioridad</span>
                <Popover
                  content={
                    <>
                      <a>
                        Determina la prioridad de displaying dentro de la misma
                        secci&oacute;n.
                      </a>
                    </>
                  }
                >
                  <InfoCircleOutlined className="text-info" />
                </Popover>
              </>
            }
            rules={[
              {
                required: true,
                message: "Por favor seleccione una prioridad",
              },
            ]}
          >
            <Select placeholder="Seleccione">
              <Option value="1">Alta</Option>
              <Option value="2">Media</Option>
              <Option value="3">Baja</Option>
            </Select>
          </Item>
        </Col>*/}
      </Row>
      <Row className="float-right">
        <Button type="primary" htmlType="submit">
          Siguiente
        </Button>
      </Row>
    </Form>
  );
};

export default HotSaleForm;
