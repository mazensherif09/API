module.exports = {
  //start enpoints for users
  presale: async (ctx) => {
    try {
      let { user } = ctx.state;
      let globale = await strapi.service("api::presale.presale").globelInfo();
      const [fisrtIndex, secindex] = globale?.components || [];
      const balance = await strapi
        .service("api::presale.presale")
        .finduserBalance(user);
      const wallet = await strapi
        .service("api::presale.presale")
        .finduserWallet(user);
      const bonus = await strapi
        .service("api::presale.presale")
        .finduserBonus(user);

      const networks = await strapi
        .service("api::presale.presale")
        .findNetWorks();
      const data = {
        user: {
          id: user?.uuid,
          username: user?.username,
          email: user?.email,
          mobile: user?.mobile,
          confirmed: user?.confirmed,
          createdAt: user?.createdAt,
          DOB: user?.DOB,
          ref: user?.ref,
          nationality: user?.nationality,
        },
        balance,
        globaleInfo: {
          ...(fisrtIndex || {}),
          ...(secindex || {}),
        },
        wallet,
        bonus,
        networks,
      };

      return ctx.send(data);
    } catch (error) {
      console.log("🚀 ~ presale: ~ error:", error);
      return ctx.badRequest();
    }
  },
};
