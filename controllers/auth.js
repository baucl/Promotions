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

    //conexión AD
    clientLdap.bind(
      `${domain[0]}${ssoDecode}`,
      passwordDecode,
      (error, result) => {
        if (result !== null && error === null) {
          const token = jwt.sign(
            {
              check: true,
            },
            secret,
            {
              expiresIn: "12h",
            }
          );

          res.send({
            value: {
              message: "Usuario Autenticado",
              token: token,
              expiration: expirationDateJwt,
            },
            success: true,
            error: null,
          });
        } else if (error) {
          //desconexión AD
          clientLdap.unbind(() => {
            if (error.code === "ENOTFOUND") {
              res.send({
                value: null,
                success: false,
                error: {
                  error: error,
                  message: "VPN: No se ha podido establecer conexi\u00F3n.",
                },
              });
            } else {
              res.send({
                value: null,
                success: false,
                error: {
                  error: error,
                  message: "Credenciales incorrectas",
                },
              });
            }
          });
        }
      }
    );
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

module.exports = { authenticacion };
