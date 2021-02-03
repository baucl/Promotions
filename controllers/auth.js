const ldap = require("ldapjs");
const config = require("../config");
const jwt = require("jsonwebtoken");
const { Base64 } = require("js-base64");
const { url, port, domain } = config.configLDAP;
const { secret, expirationDateJwt } = config;

const authenticacion = (req, res) => {
  try {
    const { sso, password } = req.body;
    var ssoDecode = Base64.decode(sso),
      passwordDecode = Base64.decode(password),
      responseAd = null;

    const clientLdap = ldap.createClient({
      url: `${url}:${port}`,
    });

    Array.isArray(domain) &&
      domain.map((domainData) => {
        responseAd = searchAuthAd(
          clientLdap,
          domainData,
          ssoDecode,
          passwordDecode
        );
        if (responseAd.success) {
          return responseAd;
        } else {
          return searchAuthAd(
            clientLdap,
            domainData,
            ssoDecode,
            passwordDecode
          );
        }
      });
  } catch (error) {
    res.send({
      value: null,
      success: false,
      error: {
        error: error,
        message: "No se ha podido establecer la conexion al Active Directory",
      },
    });
  }
};

const searchAuthAd = (clientLdap, domain, sso, pass) => {
  var response = {
    value: {
      message: "",
      token: "",
      expiration: "",
    },
    success: false,
    error: {
      error: "",
      message: "",
    },
  };

  //conexión AD
  clientLdap.bind(`${domain}${sso}`, pass, (error, result) => {
    if (result !== null && error === null) {
      const token = jwt.sign({ check: true }, secret, {
        expiresIn: "12h",
      });

      response.value.message = "Usuario Autenticado";
      response.value.token = token;
      response.value.expiration = expirationDateJwt;
      response.success = true;
    } else if (error) {
      //desconexión AD
      clientLdap.unbind(() => {
        if (error.code === "ENOTFOUND") {
          response.error.error = error;
          response.error.message =
            "VPN: No se ha podido establecer conexi\u00F3n.";
          response.value = null;
          response.success = false;
        } else {
          response.value = null;
          response.success = false;
          response.error.error = error;
          response.error.message = "Credenciales incorrectas";
        }
      });
    }
  });
  return response;
};

module.exports = { authenticacion };
