module.exports = {
  routes: [
    {
      method: "GET",
      path: "/presale",
      handler: "presale.presale",
      config: {
        middlewares: ["api::presale.auth"],
      },
    },
    {
      method: "POST",
      path: "/createorder",
      handler: "createorder.creatrorder",
      config: {
        middlewares: ["api::presale.auth"],
      },
    },
    {
      method: "GET",
      path: "/collectBonus/:id",
      handler: "collectbonus.collectbonus",
      config: {
        middlewares: ["api::presale.auth"],
      },
    },
    {
      method: "GET",
      path: "/mybalance",
      handler: "presale.mybalance",
      config: {
        middlewares: ["api::presale.auth"],
      },
    },
    {
      method: "GET",
      path: "/myorders",
      handler: "myorder.myorder",
      config: {
        middlewares: ["api::presale.auth"],
      },
    },
    {
      method: "GET",
      path: "/mybonus",
      handler: "mybonus.mybonus",
      config: {
        middlewares: ["api::presale.auth"],
      },
    },
    {
      method: "POST",
      path: "/addWallet",
      handler: "addwallet.addwallet",
      config: {
        middlewares: ["api::presale.auth"],
      },
    },
  ],
};
