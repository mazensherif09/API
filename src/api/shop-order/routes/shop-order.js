module.exports = {
    routes: [
      {
        method: "POST",
        path: "/makeorder",
        handler: "shop-order.makeorder",
        // config: {
        //   middlewares: ["api::presale.auth"],
        // },
      },
    ],
  };
  