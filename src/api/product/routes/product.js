module.exports = {
    routes: [
      {
        method: "GET",
        path: "/product/:slug",
        handler: "product.findOne",
      },
      {
        method: "GET",
        path: "/products",
        handler: "product.findMany",
      },
    ],
  };
  
