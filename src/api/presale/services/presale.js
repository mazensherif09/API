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
  async finduserBonus(user, page) {
    let bonus = await strapi.entityService.findPage("api::bonus.bonus", {
      page: +page,
      pageSize: 10,
      filters: {
        will_take_bonus: user.id,
        isCollected: false,
      },
      sort: { createdAt: "desc" },
    });

    return bonus;
  },
  async findNetWorks() {
    let networks = await strapi.db.query("api::network.network").findMany();

    return networks;
  },
  async globelInfo() {
    const globaleInfo = await strapi.entityService.findMany(
      "api::global-information.global-information",
      {
        // @ts-ignore
        populate: "deep",
      }
    );
    // @ts-ignore
    const [fisrtIndex, secindex] = globaleInfo?.components || [];
    return {
      ...(fisrtIndex || {}),
      ...(secindex || {}),
    };
  },
  async createBonus({ order, user, globel }) {
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
      mts_bonus,
    };

    const bonus = await strapi.entityService.create("api::bonus.bonus", {
      data: {
        ...data,
      },
    });
    return bonus;
  },
  async findbounes(id) {
    const bonus = await strapi.entityService.findOne("api::bonus.bonus", id, {
      populate: ["will_take_bonus"],
    });
    return bonus;
  },
  async collectBonus(id) {
    const bonus = await strapi.entityService.update("api::bonus.bonus", id, {
      data: { isCollected: true },
    });
    return bonus;
  },
  async finduserOrder(user, page) {
    let orders = await strapi.entityService.findPage(
      "api::mts-user-order.mts-user-order",
      {
        page: +page,
        pageSize: 10,
        filters: { customer: user.id },
        sort: { createdAt: "desc" },
      }
    );

    return orders;
  },
};
