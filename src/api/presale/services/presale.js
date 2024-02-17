module.exports = {
  async finduserBalance(ctx) {
    let balance = await strapi.db
      .query("api::user-token-balance.user-token-balance")
      .findOne({
        where: { user: ctx.id },
      });
    if (!balance) {
      balance = await strapi.entityService.create(
        "api::user-token-balance.user-token-balance",
        {
          data: {
            user: ctx.id,
          },
        }
      );
    }
    return balance;
  },
  async finduserWallet(ctx) {
    let wallet = await strapi.db.query("api::wallet.wallet").findOne({
      where: { user: ctx.id },
    });

    return wallet;
  },
  async finduserBonus(ctx) {
    let bonus = await strapi.db.query("api::bonus.bonus").findMany({
      where: {
        will_take_bonus: ctx.id,
        isCollected: false,
        order: { approve: true },
      },
    });

    return bonus;
  },
  async findNetWorks() {
    let networks = await strapi.db.query("api::network.network").findMany();

    return networks;
  },
  async globelInfo() {
    const globale = await strapi.entityService.findMany(
      "api::global-information.global-information",
      {
        // @ts-ignore
        populate: "deep",
      }
    );
    return globale;
  },
  async createBonus({ order, user, globel }) {
    console.log(user.ref);
    const userWillTakeBonus = await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({
        where: { uuid: user.ref },
      });
    if (!userWillTakeBonus) return null;

    const mts_bonus = 10;
    const data = {
      order: order.id,
      will_take_bonus: userWillTakeBonus.id,
      owner_order: user.id,
    };

    const bonus = await strapi.entityService.create("api::bonus.bonus", {
      data: {
        ...data,
      },
    });
    return bonus;
  },
};
