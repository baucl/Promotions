const moment = require("moment");

const configAzureCosmosDb = {
  endpoint: "https://cordialfinanciera.documents.azure.com:443/",
  key:
    "uVAbhzTAM1ZnOw5ALF4d2OKvilXVTe8TkPuAzbrlGQ7yTH4VhL4mGoCryOdr7wJZszE3PRFQyrBHCpMGNVPRLw==",
  databaseId: "walmart",
  containerId: "promotion",
  query: "SELECT * from c",
};

const configLDAP = {
  url: "ldap://CFHQ004VW0001.cfcorp.ad",
  port: 389,
  options: {
    filter: `(&(objectClass=user)(sAMAccountName={{0}}))`,
    scope: "sub",
    attributes: ["memberOf", "displayName", "name"],
  },
  domain: ["cfcorp\\"],
};

const expirateJwt = new Date();
const expirationDateJwt = moment(
  expirateJwt.setHours(expirateJwt.getHours() + 12 /* expire in (hours)*/)
).format();

const secret = "promotioniudu";

module.exports = {
  configAzureCosmosDb,
  configLDAP,
  secret,
  expirationDateJwt,
};