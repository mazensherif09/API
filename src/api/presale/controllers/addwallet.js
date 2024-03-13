const { Createvalidation } = require("../../../services/validation/validation");
const { walletSchema } = require("../schemas/walletschema");

module.exports = {
  //start enpoints for users
  addwallet: async (ctx) => {
    try {
      const { user } = ctx.state;
      const { network, address } = ctx.request.body;
      //1-validate data
      const { error } = await Createvalidation(walletSchema, ctx.request.body);
      if (error) {
        return ctx.badRequest(error.details[0].message);
      }
      //2-get user Wallet
      const userWallet = await strapi
        .service("api::presale.presale")
        .finduserWallet(user);
      //3-if user have wallet update new value
      if (userWallet) {
        const data = await strapi.entityService.update(
          "api::wallet.wallet",
          userWallet.id,
          {
            data: { network, address },
            populate: ["network"],
          }
        );
        return ctx.send(data);
      }
      //4-else create new wallet
      //if you want to take this step to the service finduserwallet go and do it
      const data = { network, address, user: user?.id };
      const wallet = await strapi.entityService.create("api::wallet.wallet", {
        data: {
          ...data,
        },
        populate: ["network"],
      });

      return ctx.send(wallet);
    } catch (error) {
      return ctx.badRequest(error);
    }
  },
};
