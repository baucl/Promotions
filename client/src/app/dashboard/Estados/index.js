import React, { useEffect, useState } from "react";
import {
  Table,
  Drawer,
  Form,
  Input,
  DatePicker,
  Select,
  message,
  Empty,
} from "antd";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import {
  assign_a_new_hotsale_banner,
  change_hotsale_banner,
  delete_promotion_by_id,
  get_all_promotions,
  put_promotion_data,
  save_action_success,
  save_all_promotions,
  save_beneficios_info,
  save_confirmacion_info,
  save_detalles_info,
  save_general_info,
  save_hot_sale_info,
  save_subida_imagen_info,
} from "../../../actions/promotion";
import {
  getIdFromTable,
  handleDeletePromotion,
  findHotSale,
  EditType,
} from "../../../helpers/Estados";
import { assignSameHotSaleAlert } from "../../../helpers/Estados/assignHotSaleEdit";
import FormularioEdicion from "../../../components/Promociones/Edit";
import ModalVisible from "../../../components/Estados/ModalVisible";
import ModalDelete from "../../../components/Estados/ModalDelete";
import ModalHotSale from "../../../components/Estados/ModalHotSale";
import Acciones from "../../../components/Estados/Acciones";
import VisibilidadDias from "../../../components/Estados/VisibilidadDias";
import DiasExpiracion from "../../../components/Estados/Expiracion";
import Negocio from "../../../components/Estados/Negocio";

const Estados = () => {
  let nameEdit = null;
  let dateFromEdit = null;
  let expirationDateEdit = null;
  let negocioEdit = null;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { Item } = Form;
  const { Option } = Select;
  const [editingKey, setEditingKey] = useState(null);
  const { allPromotion, actionSuccess } = useSelector(
    ({ promotions }) => promotions
  );
  const daySchedules = new Date().getDay();
  const [promotionData, setPromotionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalHotSale, setShowModalHotSale] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);
  const [confirmLoadingHotSale, setConfirmLoadingHotSale] = useState(false);
  const [dataPut, setDataPut] = useState(null);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [textActionModal, setTextActionModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [recordTableEdit, setRecordTableEdit] = useState(null);
  const [isAssignANewHotSale, setIsAssignANewHotSale] = useState(false);
  const [assignANewHotSaleData, setAssignANewHotSaleData] = useState(null);
  const [hideColumnsEditPartial, setHideColumnsEditPartial] = useState(false);
  const [imgHotSaleChange, setImgHotSaleChange] = useState({
    imgDisable: null,
    imgEnable: null,
  });

  useEffect(() => {
    setLoading(true);
    if (allPromotion !== null && Array.isArray(allPromotion.value)) {
      allPromotion.value.map((item) => {
        item["key"] = item.id;
      });
      setPromotionData(allPromotion.value);
      dispatch(save_action_success(false));
      setLoading(false);
    }
    if (actionSuccess) {
      dispatch(save_all_promotions(null));
      dispatch(get_all_promotions());
      dispatch(save_subida_imagen_info(null));
      setLoading(true);
      setConfirmLoading(false);
      setShowModal(false);
      setConfirmLoadingDelete(false);
      setShowModalDelete(false);
      setShowModalHotSale(false);
      setConfirmLoadingHotSale(false);
      setShowDrawer(false);
      message.success("Se realizo exitosamente la acci\u00F3n");
    }
  }, [allPromotion, actionSuccess, daySchedules]);

  const getIdFromTableHelper = (e) => {
    setShowModal(true);
    var result = getIdFromTable(e, allPromotion);
    if (result !== null) {
      setTextActionModal(result.visible);
      setDataPut(result.dataResult);
    }
  };

  const handleOkModal = () => {
    setConfirmLoading(true);
    if (dataPut !== null) {
      if (dataPut.Visible) {
        dataPut["Visible"] = false;
      } else {
        dataPut["Visible"] = true;
      }
      dispatch(put_promotion_data(dataPut));
    }
  };

  const handleOkModalDelete = () => {
    setConfirmLoadingDelete(true);
    dispatch(delete_promotion_by_id(deleteId));
  };

  const handleOkModalHotSale = () => {
    setConfirmLoadingHotSale(true);
    if (isAssignANewHotSale && assignANewHotSaleData !== null) {
      dispatch(assign_a_new_hotsale_banner(assignANewHotSaleData));
    } else {
      dispatch(change_hotsale_banner(imgHotSaleChange));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setConfirmLoading(false);
  };

  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
  };

  const handleCloseModalHotSale = () => {
    setShowModalHotSale(false);
  };

  const handleEditPromotionHelper = (_, record) => {
    setShowDrawer(true);
    setDataUpdate(record);
  };

  const handleDeletePromotionHelper = (e) => {
    setShowModalDelete(true);
    var result = handleDeletePromotion(e, allPromotion);
    setDeleteId(result.id);
    setDataPut(result.promotionData);
  };

  const handleOnCloseDrawer = () => {
    setShowDrawer(false);
    dispatch(save_general_info(null));
    dispatch(save_hot_sale_info(null));
    dispatch(save_beneficios_info(null));
    dispatch(save_detalles_info(null));
    dispatch(save_subida_imagen_info(null));
    dispatch(save_confirmacion_info(null));
  };

  const changeHotSaleModal = (e, data) => {
    let result = findHotSale(data, allPromotion);
    try {
      if (result.hotSaleDisable === null && result.hotSaleEnable === null) {
        message.warning(
          `La promoci\u00F3n debe estar visible para poder mostrar dentro del "HOT SALE"`
        );
        return;
      }
      if (
        result !== null &&
        result.hotSaleDisable !== null &&
        result.hotSaleEnable !== null &&
        result.hotSaleDisable.id !== result.hotSaleEnable.id
      ) {
        if (
          result.hotSaleDisable.HotSale !== "" &&
          result.hotSaleDisable.HotSale !== null &&
          result.hotSaleEnable.HotSale !== "" &&
          result.hotSaleEnable.HotSale !== null
        ) {
          setShowModalHotSale(true);
          setImgHotSaleChange({
            imgDisable: result.hotSaleDisable,
            imgEnable: result.hotSaleEnable,
          });
          setIsAssignANewHotSale(false);

          //vuelve a los valores iniciales de la "AssignANewHotSale" de hotsale.
          setIsAssignANewHotSale(false);
          setAssignANewHotSaleData(null);
        } else {
          message.info(
            `Actualmente la promoci\u00F3n, con el ID ${result.hotSaleDisable.id} no tiene habilitado el "HOT SALE"`
          );
        }
      } else {
        if (
          result.hotSaleDisable !== null &&
          result.hotSaleDisable.Schedules[0].Enabled
        ) {
          message.info(
            `El banner con el ID ${result.hotSaleDisable.id} ya se encuentra visible en "HOT SALE"`
          );
        } else {
          if (
            result.hotSaleDisable === null &&
            result.hotSaleEnable !== null &&
            result.hotSaleEnable.Schedules[0].Enabled === false
          ) {
            setShowModalHotSale(true);
            setIsAssignANewHotSale(true);
            setAssignANewHotSaleData(result.hotSaleEnable);
          }
        }
      }
    } catch (error) {
      message.error("No se pudo realizar la seguiente acci\u00F3n");
    }
  };

  const cancel = () => {
    setEditingKey(null);
    setHideColumnsEditPartial(false);
  };

  const save = async (id) => {
    try {
      const newData = [...promotionData];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        item.Negocio = negocioEdit !== null ? negocioEdit : item.Negocio;
        item.ExpirationDate =
          expirationDateEdit !== null
            ? expirationDateEdit
            : item.ExpirationDate;
        item.DateFrom = dateFromEdit !== null ? dateFromEdit : item.DateFrom;
        item.Name = nameEdit !== null ? nameEdit : item.Name;

        setLoading(true);
        dispatch(put_promotion_data(item));
        setEditingKey(null);
        setHideColumnsEditPartial(false);
      } else {
        setEditingKey(null);
      }
    } catch (errInfo) {
      message.error("No se pudo completar la acci\u00F3n correctamente");
    }
  };

  const isEditing = (record) => record.id === editingKey;

  const edit = (e, record) => {
    form.setFieldsValue({
      Name: "",
      Negocio: "",
      DateFrom: "",
      ExpirationDate: "",
      ...record,
    });
    setEditingKey(record.id);
    setRecordTableEdit(record);
    setHideColumnsEditPartial(true);
  };

  const NegocioName = (negocio) => {
    let negocioSelectText = null;
    if (negocio !== null) {
      switch (negocio.Negocio.toUpperCase()) {
        case "WM":
          negocioSelectText = "Walmart";
          break;
        default:
          negocioSelectText = "IUD\u00DA";
          break;
      }
    }
    return negocioSelectText;
  };

  const changeNewValueEditItem = (e, newDate, dataIndex, record) => {
    let isEqualsNegocio = false;
    let negocio = null;
    if (e.currentTarget !== undefined) {
      if (e.currentTarget.id === "Name") {
        nameEdit = e.target.value;
      }
    } else if (e === "IU" || e === "WM") {
      const { isEqualsNegocio, negocioResult } = assignSameHotSaleAlert(allPromotion, record, e);
      if (isEqualsNegocio) {
        message.warning(`No se puede asignar mas de un "HOT SALE" para el negocio ${negocioResult}`);
        return;

      } else {
        negocioEdit = e;
      }
    } else if (newDate !== undefined && dataIndex === "DateFrom") {
      dateFromEdit = moment(newDate).format();
    } else if (newDate !== undefined && dataIndex === "ExpirationDate") {
      expirationDateEdit = moment(newDate).format();
    }
    return;
  };

  const inputNodeView = (dataIndex) => {
    switch (dataIndex) {
      case "Name":
        return (
          <Input
            defaultValue={
              recordTableEdit !== null ? recordTableEdit.Name : null
            }
          />
        );
      case "DateFrom":
        return (
          <DatePicker
            showTime
            defaultValue={moment(
              recordTableEdit !== null ? recordTableEdit.DateFrom : new Date(),
              "YYYY-MM-DD hh:mm:ss"
            )}
          />
        );
      case "ExpirationDate":
        return (
          <DatePicker
            showTime
            defaultValue={moment(
              recordTableEdit !== null
                ? recordTableEdit.ExpirationDate
                : new Date(),
              "YYYY-MM-DD hh:mm:ss"
            )}
          />
        );
      case "Negocio":
        return (
          <Select
            placeholder="Seleccione"
            defaultValue={NegocioName(recordTableEdit)}
          >
            <Option value="WM">Walmart</Option>
            <Option value="IU">IUD&Uacute;</Option>
          </Select>
        );
    }
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Item
            name={dataIndex}
            getValueFromEvent={(e, newDate) =>
              changeNewValueEditItem(e, newDate, dataIndex, record)
            }
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNodeView(dataIndex)}
          </Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "1",
      className: "text-center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "T\u00EDtulo",
      dataIndex: "Name",
      key: "2",
      className: "text-center",
      editable: true,
    },
    {
      title: "Negocio",
      dataIndex: "Negocio",
      key: "4",
      className: "text-center",
      render: (text) => <Negocio text={text} />,
      editable: true,
    },
    {
      title: "Inicio",
      dataIndex: "DateFrom",
      inputType: "date",
      key: "5",
      className: "text-center",
      render: (date) => {
        return (
          <span>{moment(new Date(date)).format("YYYY/MM/DD HH:mm:ss")}</span>
        );
      },
      editable: true,
    },
    {
      title: "Expiraci\u00F3n",
      dataIndex: "ExpirationDate",
      inputType: "date",
      key: "6",
      className: "text-center",
      render: (date) => {
        return (
          <span>{moment(new Date(date)).format("YYYY/MM/DD HH:mm:ss")}</span>
        );
      },
      editable: true,
    },
    {
      title: "Estado",
      key: "7",
      dataIndex: "ExpirationDate",
      className: "text-center",
      render: (date) => <DiasExpiracion date={date} />,
    },
    {
      title: "HOT SALE (D\u00EDas)",
      dataIndex: [],
      key: "8",
      className: `${
        hideColumnsEditPartial ? "invisible collapse" : "text-center"
      }`,
      width: 230,
      render: (_, record) => <VisibilidadDias record={record} />,
    },
    {
      title: "Acciones",
      dataIndex: [],
      key: "9",
      className: "text-center",
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <Acciones
            record={record}
            getIdFromTableHelper={getIdFromTableHelper}
            changeHotSaleModal={changeHotSaleModal}
            save={save}
            cancel={cancel}
            edit={edit}
            editable={editable}
            handleEditPromotionHelper={handleEditPromotionHelper}
            handleDeletePromotionHelper={handleDeletePromotionHelper}
          />
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: EditType(col.dataIndex),
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="ant-form ant-form-vertical ant-form-hide-required-mark bg-white m-4 shadow">
      <Table
        locale={{
          emptyText: (
            <Empty
              description={<div className="font-weight-bold">SIN DATOS</div>}
            />
          ),
        }}
        form={form}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        expandable={{
          expandedRowRender: (record, col, row, isExpand) => (
            <div>{record.Legal}</div>
          ),
        }}
        rowClassName="editable-row"
        loading={loading}
        columns={mergedColumns}
        pagination={{ pageSize: 10, className: "p-4 float-right" }}
        dataSource={promotionData}
      />
      <ModalVisible
        dataPut={dataPut}
        showModal={showModal}
        handleOkModal={handleOkModal}
        confirmLoading={confirmLoading}
        handleCloseModal={handleCloseModal}
        textActionModal={textActionModal}
      />
      <ModalDelete
        dataPut={dataPut}
        showModalDelete={showModalDelete}
        handleOkModalDelete={handleOkModalDelete}
        confirmLoadingDelete={confirmLoadingDelete}
        handleCloseModalDelete={handleCloseModalDelete}
      />
      <ModalHotSale
        showModalHotSale={showModalHotSale}
        handleOkModalHotSale={handleOkModalHotSale}
        confirmLoadingHotSale={confirmLoadingHotSale}
        handleCloseModalHotSale={handleCloseModalHotSale}
        imgHotSaleChange={imgHotSaleChange}
        isAssignANewHotSale={isAssignANewHotSale}
        assignANewHotSaleData={assignANewHotSaleData}
      />
      <Drawer
        title="Edici&oacute;n"
        width={"70%"}
        onClose={handleOnCloseDrawer}
        visible={showDrawer}
      >
        {showDrawer && (
          <FormularioEdicion
            dataUpdate={dataUpdate}
            handleOnCloseDrawer={handleOnCloseDrawer}
          />
        )}
      </Drawer>
    </div>
  );
};

export default Estados;
