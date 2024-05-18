const { cartPopulate } = require("../../../utils/handlePopulate");
const {
  removeFieldFromArray,
  handleMerageCartItems,
  handleproductIsAvailable,
} = require("../services/cart");
module.exports = {
  addItemToCartAPI: async (ctx) => {
    try {
      const { user } = ctx.state;
      const { item } = ctx.request.body; // [{ QTY: 1 ,product:1}]
      // step 1: get user cart
      const userCart = await strapi.db.query("api::cart.cart").findOne({
        where: { user: user.id },
        populate: {
          items: {
            populate: {
              product: {
                fields: ["stock"],
              },
            },
          },
        },
      });
      if (!userCart) return ctx.badRequest("Cart not found");
      // step 2 : check if new item is already in cart or not and check QTY
      const Newproduct = await strapi.entityService.findOne(
        "api::product.product",
        item?.product?.id
      );
      if (!Newproduct) return ctx.badRequest("Product not found");
      const newItem = userCart?.items?.find((val) => {
        return val?.product?.id === item?.product?.id;
      });
      if (newItem) {
        newItem.QTY =
          +item?.QTY === 0 || !item?.QTY ? newItem?.QTY + 1 : +item?.QTY || 1;
      } else {
        item.QTY = 1;
        userCart.items.push(item);
      }
      // step 4 : update user cart
      const newCart = await strapi.entityService.update(
        "api::cart.cart",
        userCart.id,
        {
          data: {
            items: userCart.items,
          },
          populate: cartPopulate(),
        }
      );
      return ctx.send(newCart?.items);
    } catch (error) {
      return ctx.badRequest(error);
    }
  },
  removeItemFromCart: async (ctx) => {
    try {
      const { user } = ctx.state;
      const { id } = ctx.request.body;
      const userCart = await strapi.db.query("api::cart.cart").findOne({
        where: { user: user.id },
        populate: {
          items: {
            populate: {
              product: {
                select: ["id"],
              },
            },
          },
        },
      });

      userCart.items = userCart.items.filter((val) => {
        return val?.id !== id;
      });
      const newCart = await strapi.entityService.update(
        "api::cart.cart",
        userCart.id,
        {
          data: {
            items: userCart.items,
          },
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
        }
      );
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for 1 seconds
      return ctx.send(newCart?.items);
    } catch (error) {
      console.log("🚀 ~ removeItemFromCart: ~ error:", error);
      return ctx.badRequest(error);
    }
  },
  clearCart: async (ctx) => {
    try {
      const { user } = ctx.state;
      console.log("step 1");
      const userCart = await strapi.db.query("api::cart.cart").findOne({
        where: { user: user.id },
      });

      if (!userCart) return ctx.badRequest("Cart not found");
      const newCart = await strapi.entityService.update(
        "api::cart.cart",
        userCart.id,
        {
          data: {
            items: [],
          },
        }
      );

      return ctx.send([]);
    } catch (error) {
      return ctx.badRequest(error);
    }
  },
  connectCart: async (ctx) => {
    try {
      const { user } = ctx.state;
      let { items = [] } = ctx.request.body;
      removeFieldFromArray(items, "id"); // for handle remove id from array but id of items not id of products !
      let cart = await strapi.db.query("api::cart.cart").findOne({
        where: { user: user?.id },
        populate: cartPopulate(),
      });
      if (!cart) {
        cart = await strapi.entityService.create("api::cart.cart", {
          data: {
            user: user?.id,
            items,
          },
          populate: cartPopulate(),
        });
      } else {
        let loaclItems = await handleproductIsAvailable(items);
        let allItems = handleMerageCartItems(loaclItems, cart?.items);
        cart = await strapi.entityService.update("api::cart.cart", cart?.id, {
          data: {
            items: allItems,
          },
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
      }
      return ctx.send(cart?.items);
    } catch (error) {
      console.log("🚀 ~ connectCart: ~ error:", error);
      return ctx.badRequest(error);
    }
  },
  refetchCart: async (ctx) => {
    try {
      const { user } = ctx.state;
      let cart = await strapi.db.query("api::cart.cart").findOne({
        where: { user: user.id },
        populate: cartPopulate(),
      });
      if (!cart) ctx.send([]);
      return ctx.send(cart?.items);
    } catch (error) {
      return ctx.badRequest(error);
    }
  },
};
