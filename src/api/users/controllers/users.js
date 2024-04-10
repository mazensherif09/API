const {
  foegetPasswordEmail,
} = require("../../../services/mails/emails/foegetPasswordEmail");
const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.JWT_SECRET;
module.exports = {
  // send email to [OTP] reset pasword
  forgetPassword: async (ctx) => {
    try {
      const { email } = ctx.request.body;

      const OTP = Math.floor(100000 + Math.random() * 900000); // to generate random pin code 6 digits
      const data = {
        OTP,
        sessionResetPassword: new Date().getTime() + 15 * 60000,
      };
      const user = await strapi.query("plugin::users-permissions.user").update({
        where: { email },
        data,
      });
      if (!user) return ctx.badRequest("user not found");

      const senderemail = await foegetPasswordEmail({ OTP, email });
      if (!senderemail) return ctx.badRequest(" cannot send email to OTP");
      let hashEmail = "";
      const atIndex = email.indexOf("@");
      const firstTwoChars = email.substring(0, 2);
      const domainPart = email.substring(atIndex);
      const maskedChars = "*".repeat(atIndex - 2);
      hashEmail = firstTwoChars + maskedChars.substring(0, 4) + domainPart;

      return ctx.send({
        status: 200,
        message: `email sent to ${hashEmail}`,
      });
    } catch (error) {
      console.log("🚀 ~ forgetPassword: ~ error:", error)
      return ctx.badRequest(error);
    }
  },
  // reset password if pin code is valid and session is valid
  resetPassword: async (ctx) => {
    try {
      const { OTP, password, email } = ctx.request.body;

      const user = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { email } });
      if (!user) return ctx.badRequest("user not found");
      if (!user?.sessionResetPassword)
        return ctx.badRequest("session not found try again later ");
      if (+user?.sessionResetPassword < Date.now())
        return ctx.badRequest("session  expired...");
      if (!OTP || +OTP !== +user.OTP) return ctx.badRequest("OTP is wrong ");
      const updatedUser = await strapi.plugins[
        "users-permissions"
      ].services.user.edit(user.id, {
        password: password,
        sessionResetPassword: Date.now(),
      });
      if (updatedUser) {
        const token = jwt.sign({ id: user.id }, SECRETKEY, {
          expiresIn: "30d",
        });
        return ctx.send({
          status: 200,
          message: "password changed",
          jwt: token,
        });
      }
    } catch (error) {
      return ctx.badRequest(error);
    }
  },
};
