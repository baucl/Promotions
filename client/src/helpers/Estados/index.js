const getIdFromTable = (e, allPromotion) => {
  let visible = false;
  let dataResult = null;
  if (allPromotion !== null && allPromotion.value.length > 0) {
    allPromotion.value.map((data) => {
      if (data.id === e.currentTarget.value) {
        visible = data.Visible;
        dataResult = data;
        return;
      }
    });
  }
  return { visible, dataResult };
};

const handleEditPromotion = (e, allPromotion) => {
  let dataResult = null;
  if (allPromotion !== null && allPromotion.value.length > 0) {
    allPromotion.value.map((data) => {
      if (data.id === e.currentTarget.value) {
        dataResult = data;
        return;
      }
    });
  }
  return dataResult;
};

const handleDeletePromotion = (e, allPromotion) => {
  let id = null;
  let promotionData = null;
  if (allPromotion !== null && allPromotion.value.length > 0) {
    allPromotion.value.map((data) => {
      if (data.id === e.currentTarget.value) {
        id = data.id;
        if (data.Benefits !== null && data.Benefits.Image !== null) {
          promotionData = data;
        }
        promotionData = data;
        return;
      }
    });
  }
  return { id, promotionData };
};

const findHotSale = (data, allPromotion) => {
  let hotSaleDisable = null;
  let hotSaleEnable = null;

  if (
    data !== null &&
    allPromotion !== null &&
    allPromotion.value.length > 0 &&
    data.Visible
  ) {
    allPromotion.value.map((item) => {
      if (
        item.Visible &&
        Date.parse(item.ExpirationDate) > new Date().getTime() &&
        item.Schedules != null &&
        item.Schedules[0].Enabled &&
        item.Negocio === data.Negocio
      ) {
        hotSaleDisable = item;
      }

      if (item.id === data.id) {
        hotSaleEnable = item;
      }
    });
  }

  return { hotSaleDisable, hotSaleEnable };
};

const EditType = (inputType) => {
  var type = null;
  switch (inputType) {
    case "Name":
      type = "text";
      break;
    case "DateFrom":
      type = "date";
      break;
    case "ExpirationDate":
      type = "date";
      break;
    default:
      type = "text";
      break;
  }
  return type;
};

export {
  getIdFromTable,
  handleEditPromotion,
  handleDeletePromotion,
  findHotSale,
  EditType,
};
