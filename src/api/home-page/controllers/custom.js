module.exports = {
  //start enpoints for users
  homePage: async (ctx) => {
    try {
      const data = await strapi.entityService.findMany(
        "api::home-page.home-page",
        {
          // @ts-ignore
          populate: "deep",
        }
        );

      return ctx.send({ data });
    } catch (error) {
      return ctx.badRequest();
    }
  },
};
