const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const { Load, loadSchemaValidation } = require("../Schemas/load.schema");

router.post("/", (req, res) => {
  const { dimensions, payload } = req.bodyloadData;
  const { id } = req.params;
  const load = new Load({
    created_by: id,
    logs: [{ message: "Created load", time: new Date().getTime() }],
    asignet_to: "",
    status: "New",
    state: "",
    dimensions,
    payload
  });
});

module.exports = router;
