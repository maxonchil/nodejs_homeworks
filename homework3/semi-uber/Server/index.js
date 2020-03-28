const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const registrationRouter = require("./api/routes/registration.router");
const userRouter = require("./api/routes/user.router");
const loginRouter = require("./api/routes/login.router");


const writeLog = require("./api/middlewars/writeLog");
const { port: serverPort } = config.get("webServer");
const { protocol, host, port, name } = config.get("dataBase");
const dbURL = `${protocol}://${host}:${port}/${name}`;

mongoose.connect(dbURL, {
  useNewUrlParser: true
});

app.use(cors());

app.use(express.json());

app.get("/", writeLog);

app.use("/registration", registrationRouter);

app.use("/login", loginRouter);

app.use("/user", userRouter);

app.listen(serverPort, () => {
  console.log("Now listen on port ", serverPort);
});
