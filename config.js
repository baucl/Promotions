const moment = require("moment");

const configAzureCosmosDb = {
  endpoint: "",
  key:
    "",
  databaseId: "",
  containerId: "",
  query: "SELECT * from c",
};

const configLDAP = {
  url: "",
  port: "",
  options: {
    filter: ``,
    scope: "",
    attributes: ["memberOf", "displayName", "name"],
  },
  domain: ["\\"],
};

const expirateJwt = new Date();
const expirationDateJwt = moment(
  expirateJwt.setHours(expirateJwt.getHours() + 12 /* expire in (hours)*/)
).format();

const secret = "";

module.exports = {
  configAzureCosmosDb,
  configLDAP,
  secret,
  expirationDateJwt,
};
