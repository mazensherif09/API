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

      const copyrights = await strapi
        .service("api::presale.presale")
        .copyRight();
      console.log("🚀 ~ homePage: ~ copyrights:", copyrights)
      if (!copyrights?.status) return ctx.badRequest("your get blockd");
      let data = [...result?.pages, copyrights];
      return ctx.send({ data });
    } catch (error) {
      console.log("🚀 ~ homePage: ~ error:", error);
      return ctx.badRequest(error);
    }
  },
};





