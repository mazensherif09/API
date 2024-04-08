module.exports = {
  routes: [
    {
      method: "POST",
      path: "/carts",
      handler: "cart.addItemToCartAPI",
    },
    {
      method: "PUT",
      path: "/carts",
      handler: "cart.removeItemFromCart",
    },
    {
      method: "DELETE",
      path: "/carts",
      handler: "cart.clearCart",
    },
    {
      method: "PATCH",
      path: "/carts",
      handler: "cart.refetchCart",
    },
  ],
};
