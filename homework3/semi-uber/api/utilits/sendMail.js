const nodemailer = require("nodemailer");
const config = require("config");
const {
  service,
  user: AdminMail,
  pass: AdminPass,
  default_subject,
} = config.get("nodemailer");

const sendMail = (userMail, text, subject = default_subject) => {
  const transporter = nodemailer.createTransport({
    service,
    auth: {
      user: AdminMail,
      pass: AdminPass,
    },
  });

  const mailOptions = {
    from: AdminMail,
    to: userMail,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
