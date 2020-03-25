const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");

const writeLog = require("./api/middlewars/writeLog");
const { port: serverPort } = config.get("webServer");
const { protocol, host, port, name } = config.get("dataBase");
const dbURL = `${protocol}://${host}:${port}/${name}`;


mongoose.connect(dbURL, {
  useNewUrlParser: true
});

const User = mongoose.model(
  "User",
  mongoose.Schema({ username: String, password: String })
);

app.use(express.json());

app.use("../api", express.static("api"));

app.get("/", writeLog, (req, res) => {
  User.find({}).then(user => res.json(user));
});

app.listen(serverPort, () => {
  console.log("Now listen on port ", serverPort);
});
