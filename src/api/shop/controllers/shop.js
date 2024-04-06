module.exports = {
  //start enpoints for users
  shopPage: async (ctx) => {
    try {
      const slider = await strapi.entityService.findMany("api::shop.shop", {
        // @ts-ignore
        populate: true,
      });
      const newIn = await strapi.entityService.findMany("api::new-in.new-in", {
        // @ts-ignore
        populate: true,
      });
      const sliderCards = await strapi.entityService.findMany(
        "api::product.product",
        {
          // @ts-ignore
          populate: true,
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
    }
  },
};
