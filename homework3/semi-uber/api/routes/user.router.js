const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const userGetHandler = require("../handlers/userHandlers/userGetHandler");
const changePasswordHandler = require("../handlers/userHandlers/changePasswordHandler");
const deleteAccoutHandler = require("../handlers/userHandlers/deleteAccoutHandler");
const resetPasswordHandler = require("../handlers/userHandlers/resetPasswordHandler");
const uploadAvatarHandler = require("../handlers/userHandlers/uploadsAvatarHandler");
const addEmailHandler = require("../handlers/userHandlers/addEmailHandler");
const tokenAuth = require("../middlewars/tokenAuth");

router.get("/:id", writeLog, tokenAuth, userGetHandler);
/**
 * @api {get} /:id Get user data
 * @apiName GetUserData
 * @apiGroup User
 *
 *
 * @apiParam {String}  Authorization JWT Token
 *
 *
 * @apiExample {Obect} authorization header example:
 *{
 * "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe"
 *}
 *
 * @apiSuccess (200) {Object} SuccessResponce  User data
 *
 * @apiSuccessExample {Object} Success-response:
 * HTTP/1.1 200 OK
 * {
 * success: true,
 * status: 200,
 * data : {
 *  username :"Maxonchil",
 *  email:"maxonchil@gmail.com",
 *  role:"shipper",
 *  customData:{loads:[]},
 *  avatar:null
 * },
 * error: null
 * }
 * @apiError {Object} Error
 *
 * @apiErrorExample {Object} Error-Response:
 *     HTTP/1.1 400 Not Found
 * {
 *      success: false,
 *      data: null,
 *      error: { status: 400, message: "Some error message" }
 * }
 */

router.patch(
  "/:id/change-password",
  writeLog,
  tokenAuth,
  changePasswordHandler
);
/**
 * @api {patch} /:id/change-password Change user password
 * @apiName ChangePassword
 * @apiGroup User
 *
 * @apiParam {Object} Password New user password
 * @apiParam {String} Authorization JWT Token
 *
 * @apiExample {Object} NewPassword payload example:
 *  { curentPassword:"alahamora&&2&", newPassword:"someNewPass7@@799)_"}
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
 * data : null,
 * error: null
 * }
 * @apiError {Object} Error
 *
 * @apiErrorExample {Object} Error-Response:
 *     HTTP/1.1 400 Not Found
 * {
 *      success: false,
 *      data: null,
 *      error: { status: 400, message: "Can not update user password" }
 * }
 */

router.delete("/delete", writeLog, tokenAuth, deleteAccoutHandler);
/**
 * @api {delete} /delete Delete user account and all user's data
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiParam {String} Authorization JWT Token
 *
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
 * data : { message: "User data was deleted!"},
 * error: null
 * }
 * @apiError {Object} Error
 *
 * @apiErrorExample {Object} Error-Response:
 *     HTTP/1.1 400 Not Found
 * {
 *      success: false,
 *      data: null,
 *      error: { status: 400, message: "Can not delete user data!" }
 * }
 */

router.patch("/:id/reset-password", writeLog, tokenAuth, resetPasswordHandler);
/**
 * @api {patch} /:id/reset-password Generate new password and send it to user's email
 * @apiName ResetPassword
 * @apiGroup User
 *
 * @apiParam {String} Authorization JWT Token
 *
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
 * data :null,
 * error: null
 * }
 * @apiError {Object} Error User has no email etc.
 *
 * @apiErrorExample {Object} Error-Response:
 *     HTTP/1.1 400 Not Found
 * {
 *      success: false,
 *      data: null,
 *      error: { status: 400, message: "Can not reset user password"}
 * }
 */

router.put("/:id/upload", writeLog, tokenAuth, uploadAvatarHandler);
/**
 * @api {put} /:id/upload Upload user's avatar
 * @apiName UploadAvatar
 * @apiGroup User
 *
 * @apiParam {Object} File File Object
 * @apiParam {String} Authorization JWT Token
 *
 * @apiExample {Object} Avatar payload example:
 *  { avatar:
 *           { name: '0F30DF89-0EEB-4DE4-B9AA-9E4C97C70A9C.jpg',
 *            data: <Buffer >,
 *             size: 2066488,
 *             encoding: '7bit',
 *             tempFilePath:
 *             '/home/max/nodejs_homeworks/homework3/semi-uber/Server/tmp/tmp-1-1586368688356',
 *             truncated: false,
 *             mimetype: 'image/jpeg',
 *             md5: '057d7a96764dbbd5e4ba57510fc4419e',
 *             mv: [Function: mv] }
 *          }
 *
 * @apiExample {Obect} authorization header example:
 *{
 * "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe"
 *}
 *
 * @apiSuccess (200) {Object} SuccessResponce  Avatar URL
 *
 * @apiSuccessExample {Object} Success-response:
 * HTTP/1.1 200 OK
 * {
 * success: true,
 * status: 200,
 * data : { avatar: "http://res.cloudinary.com/dcktfttao/image/upload/v1586365521/fsst3r1zcnjvptfvehqo.jpg"},
 * error: null
 * }
 * @apiError {Object} Error
 *
 * @apiErrorExample {Object} Error-Response:
 *     HTTP/1.1 400 Not Found
 * {
 *      success: false,
 *      data: null,
 *      error: { status: 400, message: "Some error message" }
 * }
 */

router.put("/:id/add-email", writeLog, tokenAuth, addEmailHandler);
/**
 * @api {put} /:id/add-email Add email
 * @apiName AddEmail
 * @apiGroup User
 *
 * @apiParam {Object} Email User's email
 * @apiParam {String} Authorization JWT Token
 *
 * @apiExample {Object} Example payload example:
 *  { email:"alahamora@gmail.com"}
 * @apiExample {Obect} Example authorization header example:
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
 * data : null,
 * error: null
 * }
 * @apiError {Object} Error
 *
 * @apiErrorExample {Object} Error-Response:
 *     HTTP/1.1 400 Not Found
 * {
 *      success: false,
 *      data: null,
 *      error: { status: 400, message: "Some error message" }
 * }
 */

module.exports = router;
