const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const { Load, loadSchemaValidation } = require("../Schemas/load.schema");
const log4js = require("log4js");
const logger = log4js.getLogger();
const errorHandler = require("../handlers/error.handler");

router.post("/", writeLog, (req, res) => {
  const { id, dimensions, payload } = req.body;
  const load = new Load({
    created_by: id,
    logs: [{ message: "Created load", time: new Date().getTime() }],
    assigned_to: "Not assigned",
    status: "New",
    state: "Created",
    dimensions,
    payload
  });

  load.save().then(() => {
    logger.info("New load was added");
    res.json({
      success: true,
      data: load,
      error: null
    });
  });
});

router.delete("/delete", (req, res) => {
  const loadID = req.headers["load"];
  Load.findByIdAndRemove(loadID)
    .then(() => logger.info("Load was successfully deleted"))
    .then(() =>
      res.json({
        success: true,
        data: null,
        error: null
      })
    )
    .catch(error => errorHandler(error.message, res));
});

module.exports = router;
