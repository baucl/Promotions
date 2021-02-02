import moment from "moment";
const objPromotion = (allPromotion, generalInfo, subidaImagenInfo) => ({
  id: (
    allPromotion !== null &&
    Array.isArray(allPromotion.value) &&
    parseInt(allPromotion.value[allPromotion.value.length - 1].id) + 1
  ).toString(),
  Name: generalInfo.Name,
  Negocio: generalInfo.Negocio.toUpperCase(),
  Description: generalInfo.Description,
  CreationDate: moment(new Date()).format(),
  DateFrom: generalInfo.fechaIF.inicio,
  ExpirationDate: generalInfo.fechaIF.expiracion,
  Legal: generalInfo.Legal,
  Visible: generalInfo.Visible,
  Order: 3,
  HotSale: {
    Title: generalInfo.Name,
    Text: generalInfo.Description,
    Align: "Bottom",
    Priority: 3,
    Image: {
      MimeType: subidaImagenInfo.type,
      Embedded: true,
      Payload: subidaImagenInfo.imgData,
    },
  },
  Benefits: {
    Title: generalInfo.Name,
    Text: generalInfo.Description,
    Align: "Bottom",
    Image: {
      MimeType: subidaImagenInfo.type,
      Embedded: true,
      Payload: subidaImagenInfo.imgData,
    },
  },
  Details: {
    BackColor: null,
    ForeColor: null,
    Title: generalInfo.Name,
    Text: generalInfo.Description,
    Align: "Bottom",
    Image: {
      MimeType: subidaImagenInfo.type,
      Embedded: true,
      Payload: subidaImagenInfo.imgData,
    },
    Actions: [],
  },
  ProductCodes: null,
  Schedules: [
    {
      ScheduleType: "W",
      Enabled: false,
      TimeFrom: "00:00",
      DurationMins: 0,
      Days: generalInfo.Days,
    },
  ],
});

export { objPromotion };
