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
  ],
};
