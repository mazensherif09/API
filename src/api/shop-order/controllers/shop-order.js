const { handlePage } = require("../../../utils/handleQuery");

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
      let isAnyProductOutOfStaock = userCart?.items?.find(
        (item) => item?.product?.stock < item.QTY || !item?.product?.id
      );
      if (isAnyProductOutOfStaock)
        return ctx.badRequest("out of stock", {
          message: "not avilblie",
          success: false,
          cart: userCart?.items,
        });
      // 3 calculate the total order
      let totalOrder = userCart?.items?.map((item) => {
        return item.product.price * item.QTY;
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
        strapi.entityService.update("api::product.product", item.product.id, {
          data: {
            stock: item.product.stock - item.QTY,
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
  findMany: async (ctx) => {
    try {
      //1- get all the records
      const { user } = ctx.state;
      let { page } = ctx.request.query;
      if (!page) page = 1;

      //2- get orders related to the current user
      let orders = await strapi.entityService.findPage(
        "api::shop-order.shop-order",
        {
          page: +page,
          pageSize: 20,
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
          filters: {
            user: user?.id,
          },
          sort: { createdAt: "desc" },
        }
      );

      //3- check if there are any orders
      if (!orders) {
        return ctx.send({
          message: "No orders found yet",
        });
      }

      return ctx.send(orders);
    } catch (error) {
      return ctx.badRequest();
    }
  },
  findOne: async (ctx) => {
    try {
      const { user } = ctx.state;
      let { id } = ctx.request.params;
      let order = await strapi.db.query("api::shop-order.shop-order").findOne({
        where: { orderID:id, user: user?.id },
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
      if (!order) return ctx.send({ message: "No order found" });
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for 1 seconds
      return ctx.send(order);
    } catch (error) {
      return ctx.badRequest();
    }
  },
};
