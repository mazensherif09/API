const { Createvalidation } = require("../../services/validation/validation");
const { LoginVal } = require("./schemas/SignInVal");
const { userSchema } = require("./schemas/userschema");
const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.JWT_SECRET;
module.exports = (plugin) => {
  /*******************************  CUSTOM CONTROLERS  ********************************/
  plugin.controllers.user.updateMe = async (ctx) => {
    // 1 vaildate data
    try {
      const { email, username, mobile } = ctx.request.body;
      const { user } = ctx.state;
      const { error } = await Createvalidation(userSchema, ctx.request.body);
      if (error) {
        return ctx.badRequest(error.details[0].message);
      }
      if (email || username) {
        // 2 check unique feilds
        const checkFeilds = await strapi
          .query("plugin::users-permissions.user")
          .findMany({
            where: {
              $or: [
                {
                  username: username,
                  id: { $not: user.id },
                },
                {
                  email: email,
                  id: { $not: user.id },
                },
              ],
            },
          });
        if (!!checkFeilds.length) {
          let errormsg = [];
          checkFeilds.map((val) => {
            if (val.username === username) {
              errormsg.push("username");
            }
            if (val.email === email) {
              errormsg.push("email");
            }
          });
          // @ts-ignore
          errormsg =
            errormsg.toString().replace(/,/g, " and ") + " alraedy uses";
          return ctx.badRequest(errormsg);
        }
      }
      let data = {
        email,
        username,
        mobile,
      };

      // 4 update data if all things is alright
      await strapi
        .query("plugin::users-permissions.user")
        .update({
          where: { id: user.id },
          data,
        })
        .then((res) => {
          return (ctx.response.status = 200);
        });
    } catch (error) {
      console.log("🚀 ~ plugin.controllers.user.updateMe= ~ error:", error);
      return ctx.badRequest(error);
    }
  };
  plugin.controllers.user.signIn = async (ctx) => {
    // 1 vaildate data
    try {
      const { password, identifier } = ctx.request.body;
      const { error } = await Createvalidation(LoginVal, ctx.request.body);
      if (error) {
        return ctx.badRequest(error.details[0].message);
      }
      const user = await strapi
        .query("plugin::users-permissions.user")
        .findOne({
          where: {
            $or: [
              {
                username: identifier,
              },
              {
                email: identifier,
              },
            ],
          },
        });
      if (!user) {
        return ctx.badRequest("user not found");
      }
      const isMatch = await strapi.plugins[
        "users-permissions"
      ].services.user.validatePassword(password, user.password);
      if (!isMatch) {
        return ctx.badRequest("email or password is incorrect");
      }

      const data = {
        sessionResetPassword: Date.now(),
      };
      await strapi.query("plugin::users-permissions.user").update({
        where: { id: user.id },
        data: { ...data },
      });
      const token = jwt.sign({ id: user.id }, SECRETKEY, {
        expiresIn: "30d",
      });
      return ctx.send({
        status: 200,
        message: "log in successfully",
        jwt: token,
      });
    } catch (error) {
      return ctx.badRequest(error);
    }
  };
  /*******************************  CUSTOM ROUTES  ********************************/
  plugin.routes["content-api"].routes.push({
    method: "PUT",
    path: "/user/me",
    handler: "user.updateMe",
    config: {
      prefix: "",
      policies: [],
    },
  });
  plugin.routes["content-api"].routes.push({
    method: "POST",
    path: "/auth/sign-in",
    handler: "user.signIn",
    config: {
      prefix: "",
      policies: [],
    },
  });
  return plugin;
};
