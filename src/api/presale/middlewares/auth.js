// @ts-nocheck
"use strict";
const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.JWT_SECRET;
/**
 * `auth` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    try {
      // const copyrights = await strapi
      //   .service("api::presale.presale")
      //   .copyRight();
      // console.log("🚀 ~ return ~ copyrights:", copyrights);
      // if (copyrights?.status) return ctx.badRequest("invaild token");
      const { user } = ctx.state;
      let [schema, token] = ctx?.request?.header?.authorization?.split(" ");
      const decoded = await jwt.verify(token, SECRETKEY);
      const checker = +decoded?.iat * 1000 + 5000 < +user?.sessionResetPassword;
      if (+user?.sessionResetPassword && checker)
        return ctx.badRequest("invaild token");
      return await next();
    } catch (error) {
      return ctx.badRequest("invaild token");
    }
  };
};
