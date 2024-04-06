const { confirmationLayout } = require("../templets/resetPasswrod");

const { transporter } = require("../config");

const foegetPasswordEmail = async ({ email, OTP }) => {
  const info = await transporter.sendMail({
    from: '"aplha company" <alphacompnay@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Verfiy Your Email", // Subject line
    html: confirmationLayout({ OTP }).toString(), // html body
  });
  return info;
};
module.exports = { foegetPasswordEmail };
