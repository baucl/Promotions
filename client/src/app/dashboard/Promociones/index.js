import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Tabs, Spin, message } from "antd";
import {
  CheckOutlined,
  ControlOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import moment from "moment";
import GeneralForm from "../../../components/Promociones/New/GeneralForm";
import SubidaImagenForm from "../../../components/Promociones/New/SubidaImagenForm";
import Confirmacion from "../../../components/Promociones/New/Confirmacion";
import {
  create_a_new_promotion,
  save_confirmacion_info,
  save_general_info,
} from "../../../actions/promotion";
import { objPromotion } from "../../../helpers/promotionObj";
const Promociones = ({ dataUpdate, handleOnCloseDrawer }) => {
  const dispatch = useDispatch();
  const {
    allPromotion,
    generalInfo,
    subidaImagenInfo,
    actionSuccess,
  } = useSelector(({ promotions }) => promotions);
  const { TabPane } = Tabs;
  let isUpload = true;
  let resultCompleteForm = null;
  const [tabIndex, setTabIndex] = useState("0");
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingRequestForm, setLoadingRequestForm] = useState(false);
  const [isRequiredFecha, setIsRequiredFecha] = useState(true);
  const [formIsComplete, setFormIsComplete] = useState(false);
  const [datePickerInfo, setDatePickerInfo] = useState({
    ini: null,
    end: null,
  });
  const [enabledTabs, setEnabledTabs] = useState({
    general: false,
    hotSale: true,
    subidaImagen: true,
    confirmacion: true,
  });

  useEffect(() => {
    //#region Titulo
    document.title = "Nueva Promoci\u00F3n - IUD\u00DA";
    //#endregion
    
    if (allPromotion != null) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    generalInfo !== null &&
      setEnabledTabs({
        hotSale: false,
        subidaImagen: false,
        confirmacion: true,
      });
    if (formIsComplete) {
      setEnabledTabs({
        hotSale: false,
        subidaImagen: false,
        confirmacion: false,
      });
    }
    if (actionSuccess) {
      setTabIndex("2");
    }
  }, [allPromotion, generalInfo, formIsComplete, actionSuccess]);

  const handleTabPanel = (index) => {
    setTabIndex(index);
  };

  const onChange = (checked) => setCheck(checked);

  const onFinishGeneral = (values) => {
    try {
      if (datePickerInfo.ini !== null && datePickerInfo.end !== null) {
        values.fechaIF = {
          ["inicio"]: datePickerInfo.ini,
          ["expiracion"]: datePickerInfo.end,
        };
        values["Visible"] = check;
        setTabIndex("1");
        dispatch(save_general_info(values));
      } else {
        setIsRequiredFecha(true);
      }
    } catch (error) {
      message.error('No se pudo realizar la alta de "General" correctamente');
    }
  };

  const onFinishSubidaImagen = (_, img) => {
    try {
      if (img.fileList !== undefined && img.fileList.length === 0) {
        message.warning("Debe seleccionar una imagen");
      } else if (img.fileList !== undefined && img.fileList.length > 1) {
        message.info("Solo esta permitido cargar una foto");
        return;
      } else {
        isUpload = false;
        setFormIsComplete(true);
        resultCompleteForm = objPromotion(
          allPromotion,
          generalInfo,
          subidaImagenInfo
        );
        resultCompleteForm !== null &&
          dispatch(create_a_new_promotion(resultCompleteForm));
      }
    } catch (error) {
      message.error("No se pudo completar el alta correctamente");
    }
  };

  const onFinishConfirmacion = (values) => {
    setLoadingRequestForm(true);
    dispatch(save_confirmacion_info(values));
    setEnabledTabs(...enabledTabs);
  };

  const hanleChangeDatePicker = (_, newDate) => {
    if (newDate !== null && Array.isArray(newDate) && newDate) {
      setDatePickerInfo({
        ini: moment(newDate[0]).format(),
        end: moment(newDate[1]).format(),
      });
      setIsRequiredFecha(false);
    }
  };

  return (
    <div className={dataUpdate === undefined ? "bg-white m-4 shadow p-5" : ""}>
      <Spin tip="Cargando..." style={{ height: "100vh" }} spinning={loading}>
        <Tabs activeKey={tabIndex} onChange={handleTabPanel} centered>
          <TabPane
            tab={
              <span>
                <ControlOutlined />
                Configuraci&oacute;n
              </span>
            }
            disabled={enabledTabs.general}
            key={"0"}
          >
            <GeneralForm
              dataUpdate={dataUpdate}
              onChange={onChange}
              hanleChangeDatePicker={hanleChangeDatePicker}
              onFinish={onFinishGeneral}
              datePickerInfoIni={datePickerInfo.ini}
              datePickerInfoEnd={datePickerInfo.end}
              check={check}
              isRequiredFecha={isRequiredFecha}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <UploadOutlined />
                Subida de Imagen
              </span>
            }
            disabled={enabledTabs.subidaImagen}
            key={"1"}
          >
            <SubidaImagenForm
              onFinish={onFinishSubidaImagen}
              dataUpdate={dataUpdate}
              loading={loadingRequestForm}
              imgPromoIsUpload={isUpload}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <CheckOutlined />
                Confirmaci&oacute;n
              </span>
            }
            disabled={enabledTabs.confirmacion}
            key={"2"}
          >
            <Form
              layout="vertical"
              hideRequiredMark
              className="pt-3"
              onFinish={onFinishConfirmacion}
            >
              <Confirmacion
                loading={false}
                isEdit={false}
                handleOnCloseDrawer={handleOnCloseDrawer}
              />
            </Form>
          </TabPane>
        </Tabs>
      </Spin>
    </div>
  );
};
export default Promociones;
