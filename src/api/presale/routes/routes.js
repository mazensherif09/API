module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom/presale",
      handler: "presale.presale",
      config: {
        middlewares: ["api::presale.auth"],
      },
    },
    {
      method: "POST",
      path: "/custom/createorder",
      handler: "createorder.creatrorder",
      config: {
        middlewares: ["api::presale.auth"],
      },
    },
    {
      method: "GET",
      path: "/custom/collectBonus/:id",
      handler: "collectbonus.collectbonus",
      config: {
        middlewares: ["api::presale.auth"],
      },
    },
    {
      method: "GET",
      path: "/custom/mybalance",
      handler: "presale.mybalance",
      config: {
        middlewares: ["api::presale.auth"],
      },
    },
    {
      method: "GET",
      path: "/custom/myorders",
      handler: "myorder.myorder",
      config: {
        middlewares: ["api::presale.auth"],
      },
    },
    {
      method: "GET",
      path: "/custom/mybonus",
      handler: "mybonus.mybonus",
      config: {
        middlewares: ["api::presale.auth"],
      },
    },
    {
      method: "POST",
      path: "/custom/addWallet",
      handler: "addwallet.addwallet",
      config: {
        middlewares: ["api::presale.auth"],
      },
    },
  ],
};
