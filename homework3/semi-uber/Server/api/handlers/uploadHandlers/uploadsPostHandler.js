const errorHandler = require("../error.handler");
const { User } = require("../../Schemas/user.schema");
const success = require("../../utilits/successResponse");
const { USER_LOGS } = require("../../../data/usersData.json");
const { uploader: cloud } = require("../../utilits/cloudinarySetUp");
const fs = require("fs");

const uploadPostHandler = async (req, res) => {
  const userID = req.headers["userid"];
  const { tempFilePath: filePath } = req.files.avatar;

  cloud
    .upload(filePath)
    .then(result =>
      User.findOneAndUpdate(
        { _id: userID },
        { avatar: result.url },
        { new: true }
      )
    )
    .then(user => {
      res.json(success(USER_LOGS.AVATAR, { avatar: user.avatar }));
    })
    .catch(error => errorHandler(error.message, res));
};

module.exports = uploadPostHandler;
