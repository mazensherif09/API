module.exports = {
  findOne: async (ctx) => {
    try {
      const slug = ctx.request.params?.slug;
      if (!slug) return ctx.badRequest();

      let product = await strapi.db.query("api::product.product").findOne({
        where: { slug },
        populate: {
          images: {
            select: ["url",'id'],
          },
          poster: {
            select: ["url",'id'],
          },
        },
      });
      if (!product) return ctx.notFound();
      return ctx.send(product);
    } catch (error) {
      return ctx.badRequest();
    }
  },
  //start enpoints for users
  findMany: async (ctx) => {
    try {
      let { page } = ctx.request.query;
      if (!page) page = 1;
      let products = await strapi.entityService.findPage("api::product.product" ,{
        page: +page,
        pageSize: 10,
        populate: {
          images: {
            fields: ["url",'id'],
          },
          poster: {
            fields: ["url",'id'],
          },
        },
      });
      if (!products) return ctx.notFound();
      return ctx.send(products);
    } catch (error) {
      return ctx.badRequest();
    }
  },
};

// module.exports = createCoreController('api::product.product');
