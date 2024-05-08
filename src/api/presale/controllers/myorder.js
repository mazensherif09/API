const { handlePage } = require("../../../utils/handleQuery");

module.exports = {
  //start enpoints for users
  myorder: async (ctx) => {
    try {
      const { user } = ctx.state;

      const orders = await strapi
        .service("api::presale.presale")
        .finduserOrder(user, handlePage(ctx?.request?.query?.page));

      return ctx.send(orders);
    } catch (error) {
      return ctx.badRequest();
    }
  },
};
