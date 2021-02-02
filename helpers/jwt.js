const expressjwt = require("express-jwt");
const { secret } = require("../config");

module.exports = jwt = () =>
  expressjwt({ secret, algorithms: ["HS256"] }).unless({
    path: [
      "/api/autenticar", //ruta que debe ignorar JWT.
    ],
  });
