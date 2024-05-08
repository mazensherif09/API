module.exports = {
  getCategories: async (ctx) => {
    try {
      const categories = await strapi.entityService.findMany(
        "api::category.category",
        {
          populate: {
            image: {
              fields: ["url", "id"],
            },
          },
          start: 0,
          limit: 25,
        }
      );
      return ctx.send(categories);
    } catch (error) {
      return ctx.badRequest(error);
    }
  },
};
