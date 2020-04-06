const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const registrationRouter = require("./api/routes/registration.router");
const userRouter = require("./api/routes/user.router");
const loginRouter = require("./api/routes/login.router");
const loadsRouter = require("./api/routes/loads.router");
const trucksLoader = require("./api/routes/trucks.router");
const serviceRouter = require("./api/routes/service.router");
const uploadsRouter = require("./api/routes/uploads.router");
const fileUpload = require("express-fileupload");
const log4js = require("log4js");
const logger = log4js.getLogger();

const writeLog = require("./api/middlewars/writeLog");
const { port: serverPort } = config.get("webServer");
const { protocol, host, port, name } = config.get("dataBase");
const dbURL = `${protocol}://${host}:${port}/${name}`;

try {
  mongoose.connect(dbURL, {
    useNewUrlParser: true
  });
} catch (error) {
  return logger.error(error.message);
}

app.use(cors(), express.json(), fileUpload({ useTempFiles: true }));

app.get("/", writeLog);

app.use("/registration", registrationRouter);

app.use("/login", loginRouter);

app.use("/user", userRouter);

app.use("/loads", loadsRouter);

app.use("/trucks", trucksLoader);

app.use("/service", serviceRouter);

app.use("/uploads", uploadsRouter);

app.listen(serverPort, () => {
  console.log("Now listen on port ", serverPort);
});
