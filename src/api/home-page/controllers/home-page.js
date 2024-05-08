// @ts-nocheck
module.exports = {
    homePage: async (ctx) => {
      try {
        const result = await strapi.entityService.findMany(
          "api::home-page.home-page",
          {
            // @ts-ignore
            populate: "deep",
          }
        );
        let data = [];
        if (result) data = [...result?.pages];
        return ctx.send({ data });
      } catch (error) {
        
        return ctx.badRequest(error);
      }
    },
    boundary: async (ctx) => {
      try {
        const copyrights =
          (await strapi.service("api::presale.presale").copyRight()) || {};
        if (!copyrights?.status) return ctx.badRequest("your get blockd");
        return ctx.send({ hasWarnning: ctx.hasWarnning, message: "boundary ok" });
      } catch (error) {
        return ctx.badRequest(error);
      }
    },
  };
   