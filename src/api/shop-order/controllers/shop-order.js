module.exports = {
  //start enpoints for users
  create: async (ctx) => {
    try {
      const { user } = ctx.state;
      // step 1:1 get user cart
      const userCart = await strapi.db.query("api::cart.cart").findOne({
        where: { user: user.id },
        populate: {
          items: {
            populate: {
              product: {
                populate: {
                  images: {
                    fields: ["url", "id"],
                  },
                  poster: {
                    fields: ["url", "id"],
                  },
                },
              },
            },
          },
        },
      });
      // 1:2  handle error cases
      if (!userCart || !userCart?.items?.length)
        return ctx.badRequest("Cart is emty");
      // 2  handle check qty for products in cart
      let errorProducts = [];
      userCart?.items?.map((item) => {
        let isAvilblie = item?.product?.stock >= item?.QTY;
        if (!isAvilblie) errorProducts = [...errorProducts, item];
      });

      let checker = userCart?.items.find(
        (item) => item?.product?.stock < item?.QTY
      );
      if (checker)
        return ctx.badRequest("out of stock", {
          cart: userCart?.items,
        });
      // 3 calculate the total order
      let totalOrder = userCart?.items?.map((item) => {
        return item?.product?.price * item?.QTY;
      }); // handle calc qty
      totalOrder = totalOrder?.reduce((a, b) => a + b, 0); // calc final total
      // 4 create order
      const order = await strapi.entityService.create(
        "api::shop-order.shop-order",
        {
          data: {
            user: user?.id,
            items: userCart?.items,
            total: totalOrder,
          },
        }
      );
      // 5 update user cart
      const newCart = await strapi.entityService.update(
        "api::cart.cart",
        userCart.id,
        {
          data: {
            items: [],
          },
        }
      );
      // 6 subtract qty from products
      userCart?.items?.map((item) => {
        strapi.entityService.update("api::product.product", item?.product?.id, {
          data: {
            stock: item?.product?.stock - item?.QTY,
          },
        });
      });
      return ctx.send({
        message: "success",
      });
    } catch (error) {
      return ctx.badRequest(error);
    }
  },
};
