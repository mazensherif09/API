const {
  convertCommaSeparatedValues,
  handleMultiQuery,
  handlePage,
  handleSingleQuery,
} = require("../../../utils/handleQuery");
const { handlePrice } = require("../services/product");

module.exports = {
  findOne: async (ctx) => {
    try {
      const { slug } = ctx.request.params;
      if (!slug) return ctx.badRequest();

      let product = await strapi.db.query("api::product.product").findOne({
        where: { slug },
        populate: {
          images: {
            select: ["url", "id"],
          },
          poster: {
            select: ["url", "id"],
          },
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay for 2 seconds
      if (!product) return ctx.notFound();
      return ctx.send(product);
    } catch (error) {
      return ctx.badRequest();
    }
  },
  findMany: async (ctx) => {
    try {
      const query = convertCommaSeparatedValues({ ...ctx?.request?.query }, [
        "page",
      ]);
      const filters = {
        ...handleSingleQuery("category", "slug", "$eq", query.category),
        ...handleMultiQuery("subcategory", "slug", query.subcategories),
        ...handleMultiQuery("color", "color", query?.color),
        ...handlePrice(query?.minprice, query?.maxprice),
      };
      let products = await strapi.entityService.findPage(
        "api::product.product",
        {
          page: handlePage(ctx?.request?.query?.page),
          pageSize: 15,
          populate: {
            images: {
              fields: ["url", "id"],
            },
            poster: {
              fields: ["url", "id"],
            },
            category: true,
            subcategory: true,
          },
          // @ts-ignore
          filters,
        }
      );
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for 1 seconds
      return ctx.send(products);
    } catch (error) {
      console.log("🚀 ~ findMany: ~ error:", error);
      return ctx.badRequest();
    }
  },
};
