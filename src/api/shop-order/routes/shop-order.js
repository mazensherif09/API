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
      {
        method: "GET",
        path: "/shop/orders/:id",
        handler: "shop-order.findOne",
        
      },
    ],
  };
  