module.exports = {
    routes: [
      {
        method: "POST",
        path: "/shop/orders",
        handler: "shop-order.create",
        
      },
      {
        method: "GET",
        path: "/shop/orders",
        handler: "shop-order.findMany",
        
      },
    ],
  };
  