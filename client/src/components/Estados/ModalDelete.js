import React, { useEffect, useState } from "react";
import { Modal, Col, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const ModalDelete = ({
  dataPut,
  showModalDelete,
  handleOkModalDelete,
  confirmLoadingDelete,
  handleCloseModalDelete,
}) => {

  const [imgPutVisible, setImgPutVisible] = useState(null);
  const [imgTypePutVisible, setTypeImgPutVisible] = useState(null);

  useEffect(() =>{
    try {
      if (
        dataPut !== null &&
        dataPut.Benefits !== null &&
        dataPut.Benefits.Image !== null
      ) {
        setImgPutVisible(dataPut.Benefits.Image.Payload);
        setTypeImgPutVisible(dataPut.Benefits.Image.MimeType);
      }
    } catch (error) {
      message.error("No se pudo cargar la imagen correctamente");
    }
  },[dataPut]);

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
      visible={showModalDelete}
      onOk={handleOkModalDelete}
      confirmLoading={confirmLoadingDelete}
      onCancel={handleCloseModalDelete}
      okText="Confirmar"
      cancelText="Cancelar"
    >
      <div className="text-center pb-2">
      {`Una vez confirmado, se eliminar\u00E1 la promoci\u00F3n.`}
      </div>
      <Col className="col-12">
        <img
          className="shadow rounded"
          alt="example"
          style={{ width: "100%" }}
          src={`data:${imgTypePutVisible};base64,${imgPutVisible}`}
        />
      </Col>
    </Modal>
  );
};
export default ModalDelete;
