const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const loadsDeleteHandler = require("../handlers/loadsHandlers/loadsDeleteHandler");
const addLoadHandler = require("../handlers/loadsHandlers/addLoadHandler");
const updateLoadHandler = require("../handlers/loadsHandlers/updateLoadHandler");
const changeLoadState = require("../handlers/loadsHandlers/changeLoadState");
const getLoadsHandler = require("../handlers/loadsHandlers/getLoadsHandler");
const tokenAuth = require("../middlewars/tokenAuth");
const postLoadHandler = require("../handlers/loadsHandlers/postLoadHandler");

router.get("/", writeLog, tokenAuth, getLoadsHandler);

router.post("/", writeLog, tokenAuth, addLoadHandler);

router.patch("/:id/state", writeLog, tokenAuth, changeLoadState);

router.patch("/:id/post", writeLog, tokenAuth, postLoadHandler);

router.patch("/:id/update", writeLog, tokenAuth, updateLoadHandler);
/**
 * @api {patch} /:id/update Update load
 * @apiName UpdateLoad
 * @apiGroup Load
 *
 * @apiParam {Object} LoadData New load data for update
 * @apiParam {Object} Authorization JWT Token
 *
 * @apiExample {Object} payload example:
 *  { "payload": 100, "dimensions": {length: 100, width: 100, height: 100} }
 * @apiExample {Obect} authorization header example:
 *{
 * "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe"
 *}
 *
 * @apiSuccess (200) {Object} SuccessResponce  New load data
 *
 * @apiSuccessExample {Object} Success-response:
 * HTTP/1.1 200 OK
 * {
 * success: true,
 * status: 200,
 * data : {message:"Load updated!"},
 * error: null
 * }
 * @apiError {Object} Error 
 *
 * @apiErrorExample {Object} Error-Response:
 *     HTTP/1.1 400 Not Found
 * {
 *      success: false,
 *      data: null,
 *      error: { status: 400, message: "Edit error! Can not edit this load!" }
 * }
 */

router.delete("/:id/delete", writeLog, tokenAuth, loadsDeleteHandler);
/**
 * @api {delete} /:id/delete Delete load
 * @apiName deleteLoad
 * @apiGroup Load
 *
 * @apiParam {Object} Authorization JWT Token
 *
 * @apiExample {Obect}  authorization header example:
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
 * @apiError {Object} Error Load already assigned
 *
 * @apiErrorExample {Object} Error-Response:
 *     HTTP/1.1 400 Not Found
 * {
 *      success: false,
 *      data: null,
 *      error: { status: 400, message: "Delete error! Can not delete this load!"}
 * }
 */

module.exports = router;
