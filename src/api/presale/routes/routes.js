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
  ],
};
