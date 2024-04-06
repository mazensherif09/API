// @ts-nocheck
module.exports = {
  //start enpoints for users
  homePage: async (ctx) => {
    try {
      const result = await strapi.entityService.findMany(
        "api::home-page.home-page",
        {
          // @ts-ignore
          populate: "deep",
        }
      );

      const copyrights = await (await strapi.service("api::presale.presale").copyRight()) || {};
      if (!copyrights?.status) return ctx.badRequest("your get blockd");
      let data = [copyrights];
      if (result) data = [...result?.pages, copyrights];
      return ctx.send({ data });
    } catch (error) {
      return ctx.badRequest(error);
    }
  },
};
