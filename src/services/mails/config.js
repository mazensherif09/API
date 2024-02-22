const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mohamedosama10085@gmail.com",
    pass: "qcnjyqmbxgqleiwk",
  },
});
module.exports = { transporter };
