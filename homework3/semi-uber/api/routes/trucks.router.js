const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const addTruckHandler = require("../handlers/trucksHandlers/addTruckHandler");
const assignTruckHandler = require("../handlers/trucksHandlers/assignTruckHandler");
const trucksDeleteHandler = require("../handlers/trucksHandlers/trucksDeleteHandler");
const trucksPutHandler = require("../handlers/trucksHandlers/trucksPutHandler");
const getTrucksHandler = require("../handlers/trucksHandlers/getTrucksHandler");
const tokenAuth = require("../middlewars/tokenAuth");

router.get("/", writeLog, tokenAuth, getTrucksHandler);

router.post("/", writeLog, tokenAuth, addTruckHandler);

router.patch("/:id/assign", writeLog, tokenAuth, assignTruckHandler);

router.delete("/:id/delete", writeLog, tokenAuth, trucksDeleteHandler);
/**
 * @api {delete} /:id/delete Delete truck
 * @apiName deleteTruck
 * @apiGroup Truck
 *
 * @apiParam {Object} Authorization JWT Token
 *
 * @apiExample {Obect} authorization header example: 
 *{
 * "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe"
 *}
 *
 * @apiSuccess (200) {Object} SuccessResponce Default
 *
 * @apiSuccessExample {Object} Success-response:
 * HTTP/1.1 200 OK
 * {
 * success: true,
 * status:200,
 * data:null,
 * error: null
 * }
 * @apiError {Object} Error Truck is in status OL
 *
 * @apiErrorExample {Object} Error-Response:
 *     HTTP/1.1 400 Not Found
 * {
 *      success: false,
 *      data: null,
 *      error: { status: 400, message: "Delete error! Can not delete this truck!"}
 * }
 */

router.put("/:id/update", writeLog, tokenAuth, trucksPutHandler);
/**
 * @api {put} /:id/update Update truck name
 * @apiName UpdateTruck
 * @apiGroup Truck
 *
 * @apiParam {Object} TruckName New truck name
 * @apiParam {String} Authorization JWT Token
 *
 * @apiExample {Object} New payload example:
 *  { updatedName:"alahamora"}
 * @apiExample {Obect} authorization header example:
 *{
 * "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe"
 *}
 *
 * @apiSuccess (200) {Object} SuccessResponce  Default
 *
 * @apiSuccessExample {Object} Success-response:
 * HTTP/1.1 200 OK
 * {
 * success: true,
 * status: 200,
 * data : { message: "Truck was updated!"},
 * error: null
 * }
 * @apiError {Object} Error
 *
 * @apiErrorExample {Object} Error-Response:
 *     HTTP/1.1 400 Not Found
 * {
 *      success: false,
 *      data: null,
 *      error: { status: 400, message: "Edit trucks info is not posible now!" }
 * }
 */

module.exports = router;
