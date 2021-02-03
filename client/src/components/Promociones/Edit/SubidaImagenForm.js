import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Col, Row, Upload, Modal, Spin, Alert } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { save_subida_imagen_info } from "../../../actions/promotion";

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const SubidaImagenForm = ({
  onFinish,
  dataUpdate,
  loading,
  imgPromoIsUpload,
}) => {
  const dispatch = useDispatch();
  const { Item } = Form;
  const [isRequired, setIsRequired] = useState(imgPromoIsUpload);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [imgPromoPreview, setImgPromoPreview] = useState({
    imgData: dataUpdate !== null ? dataUpdate.Details.Image.Payload : null,
    type: dataUpdate !== null ? dataUpdate.Details.Image.MimeType : null,
  });

  const [file, setFile] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList:
      dataUpdate !== null &&
      dataUpdate.Details !== null &&
      dataUpdate.Details.Image.Payload !== ""
        ? [
            {
              uid: "-1",
              name: "Promoci\u00F3n",
              status: "done",
              url: `data:${dataUpdate.Details.Image.MimeType};base64,${dataUpdate.Details.Image.Payload}`,
            },
          ]
        : [],
  });

  useEffect(() => {
    if (
      (imgPromoPreview.imgData !== null && imgPromoPreview.type !== null) ||
      file !== null
    ) {
      setIsRequired(false);
    }
  }, [file, imgPromoPreview]);

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const onClickLoading = () => {
    setLoadingBtn(true);
  };

  const handleCancel = () => setFile({ previewVisible: false });
  const handleChange = async ({ fileList }) => {
    let imgBase64 = null;
    let imgType = null;
    let imgData = null;
    if (fileList.length > 0) {
      if (fileList[0].originFileObj !== undefined) {
        imgBase64 = await getBase64(fileList[0].originFileObj);

        imgType = fileList[0].originFileObj.type;
        imgData = imgBase64.replace(
          `data:${fileList[0].originFileObj.type};base64,`,
          ""
        );
      } else {
        imgType = imgPromoPreview.type;
        imgData = imgPromoPreview.imgData;
      }
      dispatch(
        save_subida_imagen_info({
          type: imgType,
          imgData: imgData,
        })
      );
    } else {
      dispatch(save_subida_imagen_info(null));
    }
    setFile({ fileList });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handlePreview = async (file) => {
    file.preview =
      file.originFileObj !== undefined
        ? await getBase64(file.originFileObj)
        : file.url;
    let typeImg =
      file.originFileObj !== undefined
        ? file.originFileObj.type
        : dataUpdate.Details.Image.MimeType;

    setImgPromoPreview({
      type: typeImg,
      imgData: file.preview.replace(`data:${typeImg};base64,`, ""),
    });
    setFile({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  return (
    <Form
      layout="vertical"
      hideRequiredMark
      className="pt-3"
      onFinish={(e) => onFinish(e, file, imgPromoPreview)}
    >
      {loading ? (
        <Spin tip="Enviando" style={{ height: "100vh" }}>
          <Alert type="info" className="py-5 bg-transparent border-0" />
        </Spin>
      ) : (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Item
                name="fileImg"
                rules={[
                  {
                    required: isRequired,
                    message: "Por favor, suba una imagen",
                  },
                ]}
              >
                <Upload
                  customRequest={dummyRequest}
                  listType="picture-card"
                  fileList={file.fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  accept=".jpg, .svg, .png, .jpeg"
                >
                  {file.fileList != null && file.fileList.length > 0
                    ? null
                    : uploadButton}
                </Upload>
                <Modal
                  visible={file.previewVisible}
                  title={file.previewTitle}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <img
                    className="shadow rounded"
                    alt="example"
                    style={{ width: "100%" }}
                    src={`data:${imgPromoPreview.type};base64,${imgPromoPreview.imgData}`}
                  />
                </Modal>
              </Item>
            </Col>
          </Row>
          <Row className="float-right">
            <Button type="primary" htmlType="submit" loading={loadingBtn} onClick={onClickLoading}>
              Confirmar
            </Button>
          </Row>
        </>
      )}
    </Form>
  );
};

export default SubidaImagenForm;
