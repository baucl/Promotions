const assignSameHotSaleAlert = (allPromotion, record, negocioParam) => {
  let isEqualsNegocio = false;
  let negocioResult = null;
  Array.isArray(allPromotion.value) &&
    allPromotion.value.map((data) => {
      if (
        record.id === data.id &&
        record.Negocio !== negocioParam &&
        data.Schedules[0].Enabled &&
        Date.parse(data.ExpirationDate) > Date.parse(new Date()) &&
        Date.parse(data.DateFrom) < Date.parse(new Date())
      ) {
        isEqualsNegocio = true;
        switch (negocioParam) {
          case "IU":
            negocioResult = "IUD\u00DA";
            break;
          case "WM":
            negocioResult = "Walmart";
            break;
          default:
            negocioResult = "IUD\u00DA";
            break;
        }
      }
    });
  return { isEqualsNegocio, negocioResult };
};

export { assignSameHotSaleAlert };
