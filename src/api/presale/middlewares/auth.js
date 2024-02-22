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
      const { user } = ctx.state;
      let [schema, token] = ctx?.request?.header?.authorization?.split(" ");
      const decoded = await jwt.verify(token, SECRETKEY);
      const checker = +decoded?.iat * 1000 + 1000 < +user.sessionResetPassword;
      console.log("🚀 ~ return ~ checker:", checker)
      if (+user.sessionResetPassword && checker)
        return ctx.badRequest("invaild token");
      await next();
    } catch (error) {
      return ctx.badRequest("invaild token");
    }
  };
};
