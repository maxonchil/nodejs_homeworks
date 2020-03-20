const express = require("express");
const app = express();
const usersRouter = require("./routers/api/users");
const authToken = require("./routers/middlewars/authToken");

app.use(express.json());

app.use("/users", usersRouter);

app.get("/vip", authToken, (req, res) => {
  res.status(200).json({ access: "provided" });
});

app.get("/", (req, res) => {
  res.send("Server is working");
});
app.listen(3030);
