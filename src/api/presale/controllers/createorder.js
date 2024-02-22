const { Createvalidation } = require("../../../services/validation/validation");
const { orderSchema } = require("../schemas/createOrder");

module.exports = {
  //start enpoints for users
  creatrorder: async (ctx) => {
    try {
      const { user } = ctx.state;
      const { Qty, network, address } = ctx.request.body;

      const { error } = await Createvalidation(orderSchema, ctx.request.body);
      if (error) {
        return ctx.badRequest(error.details[0].message);
      }
      const globaleinfo = await strapi
        .service("api::presale.presale")
        .globelInfo();
      //validat mts
      const price = +Qty * (globaleinfo?.mts_USD || 0.06);
      const data = {
        Qty,
        network,
        address,
        customer: user?.id,
        price,
      };
      const order = await strapi.entityService.create(
        "api::mts-user-order.mts-user-order",
        {
          data: {
            ...data,
          },
        }
      );
      await strapi
        .service("api::presale.presale")
        .createBonus({ order, user, globel: globaleinfo });

      return ctx.send(order);
    } catch (error) {
      return ctx.badRequest(error);
    }
  },
};
