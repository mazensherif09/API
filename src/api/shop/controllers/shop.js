module.exports = {
  shopPage: async (ctx) => {
    try {
      const shop = await strapi.entityService.findMany("api::shop.shop", {
        populate: {
          landing_slider: {
            fields: ["url"],
          },
          category_section: {
            populate: {
              categories: {
                populate: {
                  image: {
                    fields: ["url", "id"],
                  },
                },
                filters: {
                  publishedAt: {$notNull: true},
                },
              },
            },
            filters: {
              publish: true,
            },
          },
          sales_section: {
            populate: {
              salescards: {
                populate: {
                  icon: {
                    fields: ["url", "id"],
                  },
                },
              },
            },
            filters: {
              publish: true,
            },
          },
        },
      });
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
        ...shop,
        newIn,
        sliderCards,
      };
      return ctx.send( data );
    } catch (error) {
      console.log(error);
      return ctx.badRequest(error);
    }
  },
};
