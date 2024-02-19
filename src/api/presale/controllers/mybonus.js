module.exports = {
    //start enpoints for users
    mybonus: async (ctx) => {
      try {
        const { user } = ctx.state;
        let { page } = ctx.request.query;
        if (!page) page = 1;
  
        const bonus = await strapi
          .service("api::presale.presale")
          .finduserBonus(user, page);

        return bonus;
      } catch (error) {
        return ctx.badRequest();
      }
    },
  };
  