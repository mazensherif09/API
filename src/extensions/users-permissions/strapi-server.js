const { Createvalidation } = require("../../services/validation");
const { userSchema } = require("./userschema");

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
      // 4 update data if all things is alright
      await strapi
        .query("plugin::users-permissions.user")
        .update({
          where: { id: user.id },
          data: {
            email,
            username,
            mobile,
          },
        })
        .then((res) => {
          return (ctx.response.status = 200);
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
  return plugin;
};
