import React, { useEffect, useState } from "react";
import { Row, Col, Divider, Modal, Alert } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const ModalHotSale = ({
  showModalHotSale,
  handleOkModalHotSale,
  confirmLoadingHotSale,
  handleCloseModalHotSale,
  imgHotSaleChange,
  isAssignANewHotSale,
  assignANewHotSaleData,
}) => {
  const [imgChangeNegocio, setImgChangeNegocio] = useState(null);
  const [imgChangeOldID, setImgChangeOldID] = useState(null);
  const [imgChangeNewID, setImgChangeNewID] = useState(null);
  const [imgChangeOld, setImgChangeOld] = useState(null);
  const [imgChangeNew, setImgChangeNew] = useState(null);
  const [imgMimeTypeNew, setImgMimeTypeNew] = useState(null);
  const [imgMimeTypeAssign, setImgMimeTypeAssign] = useState(null);
  const [imgChangeAssignID, setImgChangeAssignID] = useState(null);
  const [imgChangeNegocioAssign, setImgChangeNegocioAssign] = useState(null);
  const [imgChangeAssign, setImgChangeAssign] = useState(null);

  useEffect(() => {
    if (
      imgHotSaleChange !== null &&
      imgHotSaleChange.imgDisable !== null &&
      imgHotSaleChange.imgEnable !== null &&
      isAssignANewHotSale === false
    ) {
      setImgChangeOld(imgHotSaleChange.imgDisable.HotSale.Image.Payload);
      setImgChangeNew(imgHotSaleChange.imgEnable.HotSale.Image.Payload);
      setImgChangeOldID(imgHotSaleChange.imgDisable.id);
      setImgChangeNewID(imgHotSaleChange.imgEnable.id);
      setImgMimeTypeNew(imgHotSaleChange.imgEnable.HotSale.Image.MimeType);
      switch (imgHotSaleChange.imgDisable.Negocio) {
        case "IU":
          setImgChangeNegocio("IUD\u00DA");
          break;
        default:
          setImgChangeNegocio("Walmart");
          break;
      }
    }
    if (
      isAssignANewHotSale &&
      assignANewHotSaleData !== null &&
      assignANewHotSaleData.HotSale !== null
    ) {
      setImgMimeTypeAssign(assignANewHotSaleData.HotSale.Image.MimeType);
      setImgChangeAssign(assignANewHotSaleData.HotSale.Image.Payload);
      setImgChangeAssignID(assignANewHotSaleData.id);
      switch (assignANewHotSaleData.Negocio) {
        case "IU":
          setImgChangeNegocioAssign("IUD\u00DA");
          break;
        default:
          setImgChangeNegocioAssign("Walmart");
          break;
      }
    }
  }, [imgHotSaleChange, assignANewHotSaleData]);

  return (
    <Modal
      title={
        <span className="row">
          <ExclamationCircleOutlined
            style={{ fontSize: 23 }}
            className="text-warning pr-3 pl-3"
          />{" "}
          Desea realizar esta acci&oacute;n?
        </span>
      }
      visible={showModalHotSale}
      onOk={handleOkModalHotSale}
      confirmLoading={confirmLoadingHotSale}
      onCancel={handleCloseModalHotSale}
      okText="Confirmar"
      cancelText="Cancelar"
    >
      <Alert
        description={`Solo estar\u00E1 visible una, promoci\u00F3n de tipo "HOT SALE" dentro de la applicaci\u00F3n.`}
        type="info"
        showIcon
      />
      {isAssignANewHotSale ? (
        <Row gutter={[8, 8]} className="justify-content-center">
          <Divider orientation="center">
            <span className="small">
              <div>
                {`Una vez confirmado, se asignar\u00E1 al negocio ${imgChangeNegocioAssign} `}
                <br />
                {`el banner en el HOT SALE con ID ${imgChangeAssignID}`}
              </div>
            </span>
          </Divider>
          <Col className="col-11">
            <img
              className="shadow rounded"
              alt="example"
              style={{ width: "100%" }}
              src={`data:${imgMimeTypeAssign};base64,${imgChangeAssign}`}
            />
          </Col>
        </Row>
      ) : (
        <Row gutter={[8, 8]} className="justify-content-center">
          <Divider orientation="left">
            <span className="small">{`Una vez confirmado, se ocultar\u00E1 el banner HOT SALE ID ${imgChangeOldID}`}</span>
          </Divider>
          <Col className="col-9">
            <img
              className="shadow rounded"
              alt="example"
              style={{ width: "100%" }}
              src={`data:${imgMimeTypeNew};base64,${imgChangeOld}`}
            />
          </Col>
          <Divider orientation="left">
            <span className="small">{`Se mostrar\u00E1 el banner ID ${imgChangeNewID}. Negocio ${imgChangeNegocio}`}</span>
          </Divider>
          <Col className="col-9">
            <img
              className="shadow rounded"
              alt="example"
              style={{ width: "100%" }}
              src={`data:${imgMimeTypeNew};base64,${imgChangeNew}`}
            />
          </Col>
        </Row>
      )}
    </Modal>
  );
};
export default ModalHotSale;
