module.exports = {
  shopPage: async (ctx) => {
    try {
      const shop = await strapi.entityService.findMany("api::shop.shop", {
        populate: {
          landing: {
            populate: {
              poster: {
                fields: ["url"],
              },
            },
          },
          top_categories: {
            populate: {
              products: {
                populate: {
                  images: {
                    fields: ["url"],
                  },
                  poster: {
                    fields: ["url"],
                  },
                },
                start: 0,
                limit: 20,
              },
            },
          },
        },
      });

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
        ...shop,
        sliderCards,
      };
      return ctx.send(data);
    } catch (error) {
      console.log(error);
      return ctx.badRequest(error);
    }
  },
};
