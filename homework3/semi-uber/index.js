const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");

const authRouter = require("./api/routes/auth.router");
const userRouter = require("./api/routes/user.router");
const loadsRouter = require("./api/routes/loads.router");
const trucksRouter = require("./api/routes/trucks.router"); 

const fileUpload = require("express-fileupload");
const log4js = require("log4js");
const logger = log4js.getLogger();

const writeLog = require("./api/middlewars/writeLog");
const { port: serverPort } = config.get("webServer");
const { protocol, host, port, name } = config.get("dataBase");
const dbURL = `${protocol}://${host}:${port}/${name}`;

try {
  mongoose.connect(dbURL, {
    useNewUrlParser: true,
  });
} catch (error) {
  return logger.error(error.message);
}

app.use(cors(), express.json(), fileUpload({ useTempFiles: true }));

app.get("/", writeLog);

app.use("/api/auth", authRouter);

app.use("/api/loads", loadsRouter);

app.use("/api/trucks", trucksRouter);

app.use("/api/user", userRouter);

app.listen(serverPort, () => {
  console.log("Now listen on port ", serverPort);
});
