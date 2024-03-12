module.exports = {
  //start enpoints for users
  collectbonus: async (ctx) => {
    try {
      const { user } = ctx.state;
      const id = ctx.request.params.id;
      if (!id) return ctx.badRequest();

      const checkbonus = await strapi
        .service("api::presale.presale")
        .findbounes(id);
      console.log("🚀 ~ collectbonus: ~ checkbonus:", checkbonus);

      if (!checkbonus) return ctx.badRequest();

      if (checkbonus?.will_take_bonus.id !== user.id) return ctx.badRequest();

      if (checkbonus?.isCollected) return ctx.badRequest();
      if (checkbonus?.order?.state !== "transfer completed") return ctx.badRequest();
      const bonus = await strapi
        .service("api::presale.presale")
        .collectBonus(id);

      const balance = await strapi
        .service("api::presale.presale")
        .finduserBalance(user);

      let QtyBonus = balance?.token_balance + bonus?.mts_bonus;
      await strapi.entityService.update(
        "api::user-token-balance.user-token-balance",
        balance.id,
        {
          data: { token_balance: QtyBonus },
        }
      );
      return ctx.send("done");
    } catch (error) {
      return ctx.badRequest();
    }
  },
};
