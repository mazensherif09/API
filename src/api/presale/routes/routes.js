module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom/presale",
      handler: "presale.presale",
    },
    {
      method: "POST",
      path: "/custom/createorder",
      handler: "createorder.creatrorder",
    },
    {
      method: "GET",
      path: "/custom/collectBonus/:id",
      handler: "collectbonus.collectbonus",
    },
    {
      method: "GET",
      path: "/custom/mybalance",
      handler: "presale.mybalance",
    },
    {
      method: "GET",
      path: "/custom/myorders",
      handler: "myorder.myorder",
    },
    {
      method: "GET",
      path: "/custom/mybonus",
      handler: "mybonus.mybonus",
    },
    {
      method: "POST",
      path: "/custom/addWallet",
      handler: "addwallet.addwallet",
    },
  ],
};
