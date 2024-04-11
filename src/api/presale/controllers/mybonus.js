module.exports = {
  //start enpoints for users
  mybonus: async (ctx) => {
    try {
      const { user } = ctx.state;
      let { page } = ctx.request.query;
      if (!page) page = 1;

      let bonus = await strapi
        .service("api::presale.presale")
        .finduserBonus(user, page);
      bonus.results = bonus.results.map((val) => {
        return {
          id: val.id,
          mts_bonus: val?.mts_bonus,
          owner_order: val?.owner_order?.username,
        };
      });
    
      return ctx.send(bonus);
    } catch (error) {
      return ctx.badRequest();
    }
  },
};
