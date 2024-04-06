// @ts-nocheck
"use strict";
/**
 * `warning` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    try {
      // console.log("🚀 ~ return ~ hasWarnning:", hasWarnning)
      // const hasWarnning = await strapi
      //   .service("api::api::warn.warn")
      //   .hasWarnning();
      //   if (hasWarnning) {
      //     if (new Date(hasWarnning?.startAt) < new Date()) {
      //       return ctx.badRequest({
      //         message: "server has updates",
      //         title: hasWarnning?.title,
      //         description: hasWarnning?.description,
      //         startAt: hasWarnning?.startAt,
      //         maybetaken: hasWarnning?.maybetaken,
      //       });
      //     } else {
      //       ctx.hasWarnning = {
      //         name: "warning",
      //         message: "server has updates",
      //         title: hasWarnning?.title,
      //         description: hasWarnning?.description,
      //         startAt: hasWarnning?.startAt,
      //         maybetaken: hasWarnning?.maybetaken,
      //       };
      //     }
      //   }
        return next();
    } catch (error) {
      return ctx.badRequest("invaild token");
    }
  };
};
