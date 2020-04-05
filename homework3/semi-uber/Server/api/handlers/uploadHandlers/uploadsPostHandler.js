const errorHandler = require("../error.handler");
const { User } = require("../../Schemas/user.schema");
const success = require("../../utilits/successResponse");
const { USER_LOGS } = require("../../../data/usersData.json");
const { uploader: cloud } = require("../../utilits/cloudinarySetUp");
const rimraf = require("rimraf");
const checkForEdit = require("../../utilits/checkForEdit");
const { USER_ID } = require("../../../data/headers.json");

const uploadPostHandler = async (req, res) => {
  const userID = req.headers[USER_ID];
  const { tempFilePath: filePath } = req.files.avatar;

  const editCheck = await checkForEdit(userID);

  if (!editCheck) {
    return errorHandler(USER_LOGS.ERROR_EDIT, res);
  }

  cloud
    .upload(filePath)
    .then((result) =>
      User.findOneAndUpdate(
        { _id: userID },
        { avatar: result.url },
        { new: true }
      )
    )
    .then((user) => {
      rimraf.sync("tmp");
      res.json(success(USER_LOGS.AVATAR, { avatar: user.avatar }));
    })
    .catch((error) => errorHandler(error.message, res));
};

module.exports = uploadPostHandler;
