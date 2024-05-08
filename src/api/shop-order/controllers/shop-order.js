module.exports = {
  //start enpoints for users
  makeorder: async (ctx) => {
    try {
      const { user } = ctx.state;
      // step 1: get user cart
      const userCart = await strapi.db.query("api::cart.cart").findOne({
        where: { user: user.id },
        populate: {
          items: {
            populate: {
              product: {
                fields: ["stock"],
              },
            },
          },
        },
      });
      if (!userCart) return ctx.badRequest("Cart not found");

      const order = await strapi.entityService.create(
        "api::shop-order.shop-order",
        {
          ...userCart,
          status: "pending",
          total: 10.3,
        }
      );

      return ctx.send("yes");
    } catch (error) {
      return ctx.badRequest(error);
    }
  },
};
