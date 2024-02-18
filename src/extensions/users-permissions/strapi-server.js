// src/extensions/users-permissions/strapi-server.js
// this route is only allowed for authenticated users

module.exports = (plugin) => {
  /*******************************  CUSTOM CONTROLERS  ********************************/
  plugin.controllers.user.updateMe = async (ctx) => {
    // 1 vaildate data
    const { email, username, mobile } = ctx.request.body;
    const { user } = ctx.state;

    if (!email && !username && !mobile) {
      return ctx.badRequest("can not update same data");
    }

    if (email || username) {
      if (
        email &&
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      ) {
        return ctx.badRequest("email <");
      }
      if (username?.length < 5) {
        return ctx.badRequest("username <");
      }
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
        errormsg = errormsg.toString().replace(/,/g, " and ") + " araedy exist";
        return ctx.badRequest(errormsg);
      }
    }
    // 3 sentize data
    const data = {
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
