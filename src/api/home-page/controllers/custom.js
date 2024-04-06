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

      console.log();
      const copyrights =
        (await strapi.service("api::presale.presale").copyRight()) || {};
      if (!copyrights?.status) return ctx.badRequest("your get blockd");
      let data = [copyrights];
      if (result) data = [...result?.pages, copyrights];
      if (ctx.hasWarnning) data = [...data, ctx.hasWarnning];
      return ctx.send({ data });
    } catch (error) {
      console.log("🚀 ~ homePage: ~ error:", error);
      return ctx.badRequest(error);
    }
  },
};
