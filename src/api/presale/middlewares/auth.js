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
      console.log("🚀 ~ ip ~ ", ctx.ip)
      const { user } = ctx.state;
      let [schema, token] = ctx?.request?.header?.authorization?.split(" ");
      const decoded = await jwt.verify(token, SECRETKEY);
      const checker =
        +user?.sessionResetPassword &&
        +decoded?.iat * 1000 + 5000 < +user?.sessionResetPassword;
      if (checker) return ctx.badRequest("invaild token");
      return await next();
    } catch (error) {
      return ctx.badRequest("invaild token");
    }
  };
};
