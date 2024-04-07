
module.exports = {
    //start enpoints for users
    getMyCart: async (ctx) => {
      try {
      
        const cart  = await strapi.entityService.findMany('api::cart.cart')
        return ctx.send({
            cart
        })
      } catch (error) {
        console.log("🚀 ~ getMyCart: ~ error:", error);
      }
    },
  };