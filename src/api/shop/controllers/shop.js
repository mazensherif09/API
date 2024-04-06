module.exports = {
  //start enpoints for users
  shopPage: async (ctx) => {
    try {
      const slider = await strapi.entityService.findMany("api::shop.shop");
      const newIn = await strapi.entityService.findMany("api::new-in.new-in");
      const sliderCards = await strapi.entityService.findMany(
        "api::product.product",
        {
          populate: {
            images: {
              fields: ["url"],
            },
            poster: {
              fields: ["url"],
            },
            category: true,
            subcategory: true,
          },
        }
      );
      const data = {
        slider,
        newIn,
        sliderCards,
      };
      return ctx.send({ data });
    } catch (error) {
      console.log(error);
      return ctx.badRequest(error);
    }
  },
};
