import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Tabs, Spin, message } from "antd";
import {
  CheckOutlined,
  ControlOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import moment from "moment";
import GeneralForm from "./GeneralForm";
import SubidaImagenForm from "./SubidaImagenForm";
import Confirmacion from "./Confirmacion";
import {
  put_promotion_data,
  save_confirmacion_info,
  save_general_info,
} from "../../../actions/promotion";
import { EditValuesForm } from "../../../helpers/Estados/Edit";
import { assignSameHotSaleAlert } from "../../../helpers/Estados/assignHotSaleEdit";
const PromocionesEdicion = ({ dataUpdate, handleOnCloseDrawer }) => {
  const dispatch = useDispatch();
  const {
    allPromotion,
    generalInfo,
    subidaImagenInfo,
    actionSuccess,
  } = useSelector(({ promotions }) => promotions);

  const { TabPane } = Tabs;
  let isUpload = true;
  let isAssignHotSale = false;
  let resultCompleteForm = null;
  const [tabIndex, setTabIndex] = useState("0");
  const [loading, setLoading] = useState(false);
  const [loadingRequestForm, setLoadingRequestForm] = useState(false);
  const [isRequiredFecha, setIsRequiredFecha] = useState(true);
  const [formIsComplete, setFormIsComplete] = useState(false);

  var assignNegocioResult = {
    equalsNegocio: false,
    negocio: null,
  };
  
  const [enabledTabs, setEnabledTabs] = useState({
    general: false,
    hotSale: true,
    subidaImagen: true,
    confirmacion: true,
  });

  useEffect(() => {
    //#region Titulo
    document.title = "Edici\u00F3n - IUD\u00DA";
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

  const changeNegocio = (negocio) => {
    const { isEqualsNegocio, negocioResult } = assignSameHotSaleAlert(
      allPromotion,
      dataUpdate,
      negocio
    );
    assignNegocioResult.equalsNegocio = isEqualsNegocio;
    assignNegocioResult.negocio = negocioResult;

    if (assignNegocioResult.equalsNegocio) {
      showIsEqualsNegocio();
    } else {
      isAssignHotSale = false;
    }
  };

  const showIsEqualsNegocio = () =>
    message.warning(
      `No se puede asignar mas de un "HOT SALE" para el negocio ${assignNegocioResult.negocio}`
    );

  const onFinishGeneral = (values) => {
    try {
      if (values.fechaIF[0] !== null && values.fechaIF[1] !== null) {
        if (assignNegocioResult.equalsNegocio) {
          showIsEqualsNegocio();
          return;
        } else {
          values.fechaIF = {
            inicio: moment(values.fechaIF[0]).format(),
            expiracion: moment(values.fechaIF[1]).format(),
          };
          setTabIndex("1");
          dispatch(save_general_info(values));
        }
      } else {
        setIsRequiredFecha(true);
      }
    } catch (error) {
      message.error('No se pudo realizar la alta de "General" correctamente');
    }
  };

  const onFinishSubidaImagen = (_, img, newEdit) => {
    console.log(subidaImagenInfo);
    try {
      if (img.fileList !== undefined && img.fileList.length === 0) {
        message.warning("Debe seleccionar una imagen");
      } else if (img.fileList !== undefined && img.fileList.length > 1) {
        message.info("Solo esta permitido cargar una foto");
        return;
      } else if (
        subidaImagenInfo !== null ||
        (newEdit !== null && newEdit.imgData !== null && newEdit.type !== null)
      ) {
        isUpload = false;
        setFormIsComplete(true);
        resultCompleteForm = EditValuesForm(
          dataUpdate,
          generalInfo,
          subidaImagenInfo || newEdit
        );
        resultCompleteForm !== null &&
          dispatch(put_promotion_data(resultCompleteForm));
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
              changeNegocio={changeNegocio}
              dataUpdate={dataUpdate}
              onFinish={onFinishGeneral}
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
export default PromocionesEdicion;
