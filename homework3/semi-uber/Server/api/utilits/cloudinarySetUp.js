const config = require("config");
const { cloud_name, api_key, api_secret } = config.get("cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret
});

module.exports = cloudinary;
