const express = require("express");
const app = express();

const loginRouter = require("./api/routes/login");
const usersRouter = require("./api/routes/users");

app.set("view engine", "ejs");

app.use(express.static("api"));

app.use(express.json());

app.use("/login", loginRouter);

app.use("/user", usersRouter);

app.get("/", (req, res) => {
  res
    .status(200)
    .render("index", { home: true, login: false, loginError: false });
});

app.listen(3030);
