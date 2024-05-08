module.exports = {
  getSubCategories: async (ctx) => {
    try {
      const SubCategories = await strapi.entityService.findMany(
        "api::subcategory.subcategory",
        {
          filters: {
            categories: { slug: ctx?.request?.params?.slug },
          },
          start: 0,
          limit: 25,
        }
      );
      const colors = await strapi.entityService.findMany("api::color.color", {
        start: 0,
        limit: 25,
      });
      if (!SubCategories) return ctx.notFound();
      return ctx.send({ SubCategories, colors });
    } catch (error) {
      console.log("🚀 ~ getSubCategories: ~ error:", error);
      return ctx.badRequest(error);
    }
  },
};
