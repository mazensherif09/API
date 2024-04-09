module.exports = {
  //start enpoints for users
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
};

// module.exports = createCoreController('api::product.product');
