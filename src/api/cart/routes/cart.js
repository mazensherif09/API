module.exports = {
  routes: [
    {
      method: "POST",
      path: "/carts",
      handler: "cart.refetchMyCart",
    },
    {
      method: "DELETE",
      path: "/carts",
      handler: "cart.refetchCart",
    },
  ],
};
