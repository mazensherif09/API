module.exports = {
  //start enpoints for users
  myorder: async (ctx) => {
    try {
      const { user } = ctx.state;
      let { page } = ctx.request.query;
      if (!page) page = 1;

      const orders = await strapi
        .service("api::presale.presale")
        .finduserOrder(user, page);
     
      return orders;
    } catch (error) {
      return ctx.badRequest();
    }
  },
};
