const express = require("express");
const app = express();
const morgan = require("morgan");
const promotionRoutes = require("./routes/api/promotion");
const auth = require("./routes/api/auth");
const errorHandler = require("./helpers/error-handler");
const jwt = require("./helpers/jwt");

//settings
app.set("json spaces", 2);

//JWT auth to secure the api
app.use(jwt());

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "100mb", parameterLimit: 500000 }));

//routes
app.use("/api", promotionRoutes);
app.use("/api", auth);

//global error handler
app.use(errorHandler);

module.exports = app;
