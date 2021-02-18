const EditValuesForm = (dataUpdate, generalInfo, imgData) => {

  dataUpdate["DateFrom"] = generalInfo.fechaIF.inicio;
  dataUpdate["ExpirationDate"] = generalInfo.fechaIF.expiracion;
  dataUpdate["Legal"] = generalInfo.Legal;
  dataUpdate["Negocio"] = generalInfo.Negocio;
  dataUpdate["Visible"] = generalInfo.Visible;
  dataUpdate["Name"] = generalInfo.Name;
  dataUpdate["Description"] = generalInfo.Description;

  dataUpdate.Benefits !== null &&
    (dataUpdate.Benefits = {
      Title: generalInfo.Name,
      Text: generalInfo.Description,
      Actions: dataUpdate.Benefits.Actions,
      Align: dataUpdate.Benefits.Align,
      BackColor: dataUpdate.Benefits.BackColor,
      ForeColor: dataUpdate.Benefits.ForeColor,
      Image: {
        Embedded: dataUpdate.Benefits.Image.Embedded,
        MimeType: imgData.type,
        Payload: imgData.imgData,
      },
    });

  dataUpdate.Details !== null &&
    (dataUpdate.Details = {
      Title: generalInfo.Name,
      Text: generalInfo.Description,
      Actions: dataUpdate.Details.Actions,
      Align: dataUpdate.Details.Align,
      BackColor: dataUpdate.Details.BackColor,
      ForeColor: dataUpdate.Details.ForeColor,
      Image: {
        Embedded: dataUpdate.Details.Image.Embedded,
        MimeType: imgData.type,
        Payload: imgData.imgData,
      },
    });

  dataUpdate.HotSale !== null &&
    (dataUpdate.HotSale = {
      Title: generalInfo.Name,
      Text: generalInfo.Description,
      Actions: dataUpdate.HotSale.Actions,
      Align: dataUpdate.HotSale.Align,
      BackColor: dataUpdate.HotSale.BackColor,
      ForeColor: dataUpdate.HotSale.ForeColor,
      Image: {
        Embedded: dataUpdate.HotSale.Image.Embedded,
        MimeType: imgData.type,
        Payload: imgData.imgData,
      },
    });

  dataUpdate.Schedules !== null &&
    dataUpdate.Schedules.length > 0 &&
    (dataUpdate.Schedules = [
      {
        Days: generalInfo.Days,
        DurationMins: dataUpdate.Schedules[0].DurationMins,
        Enabled: dataUpdate.Schedules[0].Enabled,
        ScheduleType: dataUpdate.Schedules[0].ScheduleType,
        TimeFrom: dataUpdate.Schedules[0].TimeFrom,
      },
    ]);
    return dataUpdate;
};

export { EditValuesForm };
