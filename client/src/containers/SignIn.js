import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Nprogress from "nprogress";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { loginImageBase64 } from "../helpers/SignIn/signInImageBase64";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import { Base64 } from "js-base64";
import { save_auth_success, send_credentials } from "../actions/auth";

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: "Url(./Web-Exportada-04.svg)",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#fff0",
    width: "auto",
    height: "auto",
    marginBottom: "0px",
    borderRadius: "0%",
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "rgb(82, 71, 162)",
  },
  load: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const SignIn = (props) => {
  //styles
  const classes = useStyles();

  //hooks, var & handles
  const CHARACTER_MIN = 5;
  var endpoint_save = null;
  var getInfoUser = null;
  const TOKEN_KEY = "tr"; //tokenRequest
  const ENDPOINT = "ep"; //endPoint
  const SSO_SV = "sk"; //ssoKey
  const EXPIRES = "ex"; //expires
  const USER = "us"; //user
  const CODE = "cd"; //code
  const NAME_URL = "nu"; //NameUrl
  const USER_DISPLAY = "ud"; //user display
  const BASE64_DISPLAY = Base64.encode(USER_DISPLAY);
  const BASE64_SSO_SV = Base64.encode(SSO_SV);
  const BASE64_ENDPOINT = Base64.encode(ENDPOINT);
  const BASE64_TOKEN_KEY = Base64.encode(TOKEN_KEY);
  const BASE64_EXPIRES = Base64.encode(EXPIRES);
  const BASE64_USER = Base64.encode(USER);
  const BASE64_CODE = Base64.encode(CODE);
  const localCheck = localStorage.getItem(BASE64_SSO_SV);
  const localUser = localStorage.getItem(BASE64_USER);
  const localURLSave = localStorage.getItem(BASE64_ENDPOINT);
  const display_name = localStorage.getItem(BASE64_DISPLAY);
  const BASE64_NAME_URL = Base64.encode(NAME_URL);
  const [checked, setChecked] = useState(false);
  const [btnEnter, setBtnEnable] = useState(true);
  const [btnEnterSSO, setEnterSSO] = useState(true);
  const [clickLoading, setClickLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [changeUser, setChangeUser] = useState(true);
  const [userPassword, setUserPassword] = useState("");
  const [infoUserLocal, setInfoLocal] = useState("");
  const [userSSO, setUserSSO] = useState("");
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const [messageAuth, setMessageAuth] = useState(null);

  const dispatch = useDispatch();
  const { success, message, data } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (message !== null && !success) {
      setMessageAuth(message);
      setErrorLogin(true);
    } else {
      setClickLoading(false);
    }
  }, [success, message, data]);

  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
    if (!event.target.checked) {
      localStorage.removeItem(BASE64_SSO_SV);
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    hanleInput(event);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const hanleInput = (e) => {
    setUserPassword(e.target.value);
    if (e.target.value.length > CHARACTER_MIN && btnEnterSSO != true) {
      setBtnEnable(false);
    } else if (e.target.value.length > CHARACTER_MIN && infoUserLocal != "") {
      setBtnEnable(false);
    } else {
      setBtnEnable(true);
    }
  };

  const hanleKeyEnter = (event) => {
    if (event.key === "Enter") {
      callApi();
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const hanleInputSSO = (e) => {
    setUserSSO(e.target.value);
    if (e.target.value.length > CHARACTER_MIN) {
      setEnterSSO(false);
    } else {
      setEnterSSO(true);
    }
  };

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright "} &copy;&nbsp;&nbsp;
        <Link color="inherit">IUD&Uacute;</Link> {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  //**Call controller
  function callApi() {
    dispatch(save_auth_success(false));
    setClickLoading(true);
    dispatch(
      send_credentials({
        sso: Base64.encode(userSSO),
        password: Base64.encode(userPassword),
      })
    );
  }

  const hanleChangeUser = () => {
    localStorage.removeItem(BASE64_SSO_SV);
    localStorage.removeItem(BASE64_ENDPOINT);
    localStorage.removeItem(BASE64_CODE);
    localStorage.removeItem(BASE64_NAME_URL);
    localStorage.removeItem(BASE64_TOKEN_KEY);
    localStorage.removeItem(BASE64_EXPIRES);
    localStorage.removeItem(BASE64_USER);
  };

  return (
    <Fragment>
      {clickLoading && <LinearProgress />}
      <Grid container component="main">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={`${classes.paper}`}>
            <div className="animated fast fadeIn">
              <Avatar className={classes.avatar}>
                <img src={`data:image/jpeg;base64,${loginImageBase64}`} />
              </Avatar>
            </div>
            <div className="text-center">
              <div style={{ fontSize: "25px" }}>IUD&Uacute;</div>
              <div style={{ fontSize: "13px" }} className="text-muted">
                Promociones
              </div>
            </div>
            <div className={classes.form} noValidate>
              {infoUserLocal == "" && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="SSO"
                  autoFocus
                  autoComplete="off"
                  onKeyPress={hanleKeyEnter}
                  onChange={hanleInputSSO}
                />
              )}
              <FormControl fullWidth>
                <InputLabel
                  autoComplete={"off"}
                  required
                  htmlFor="standard-adornment-password"
                >
                  Contrase&ntilde;a
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  margin="normal"
                  autoComplete="off"
                  label="Contrase&ntilde;a"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onKeyPress={hanleKeyEnter}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {errorLogin && <Alert severity="error">{messageAuth}</Alert>}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="small"
                disabled={btnEnter}
                className={classes.submit}
                onClick={() => {
                  callApi();
                }}
              >
                Iniciar Sesion
              </Button>
              <Box mt={5}>
                <Copyright />
              </Box>
            </div>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default SignIn;
