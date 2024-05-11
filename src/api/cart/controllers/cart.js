const removeFieldFromArray = require("../services/cart");
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
        item.product.id
      );
      if (!Newproduct) return ctx.badRequest("Product not found");
      const newItem = userCart?.items?.find((val) => {
        return val.product.id === item.product.id;
      });
      if (newItem) {
        newItem.QTY = +item?.QTY === 0 ? 1 : +item?.QTY;
      } else {
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
      return ctx.send({
        data: newCart.items,
      });
    } catch (error) {
      return ctx.badRequest(error);
    }
  },
  removeItemFromCart: async (ctx) => {
    try {
      const { user } = ctx.state;
      const { item } = ctx.request.body;
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
        return val.product.id !== item.product.id;
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
                  },
                },
              },
            },
          },
        }
      );
      return ctx.send({
        data: newCart.items,
      });
    } catch (error) {
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
      console.log("step 2");
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
      console.log("step 3");
      return ctx.send({
        data: [],
      });
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
        populate: {
          items: {
            populate: {
              product: {
                populate: {
                  images: {
                    select: ["url", "id"],
                  },
                  poster: {
                    select: ["url", "id"],
                  },
                },
              },
            },
          },
        },
      });
      if (!cart) {
        cart = await strapi.entityService.create("api::cart.cart", {
          data: {
            user: user?.id,
            items,
          },
          populate: {
            items: {
              populate: {
                product: {
                  populate: {
                    images: {
                      fields: ["url", "id"],
                    },
                  },
                },
              },
            },
          },
        });
      } else {
        const compareObjects = (obj1, obj2) => {
          return obj1.product?.id === obj2.product?.id;
        }; // for compare spafic field in object
        let newI = [...items, ...cart.items].filter(
          (obj, index, arr) =>
            arr.findIndex((innerObj) => compareObjects(innerObj, obj)) === index
        ); // for handle marge items and handle duplicate items
        removeFieldFromArray(newI, "id"); // for handle remove id from array but id of items not id of products !
        // because id of items make conflict with database table
        cart = await strapi.entityService.update("api::cart.cart", cart?.id, {
          data: {
            items: newI,
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
      return ctx.send({
        data: cart.items,
      });
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
        populate: {
          items: {
            populate: {
              product: {
                populate: {
                  images: {
                    select: ["url", "id"],
                  },
                  poster: {
                    select: ["url", "id"],
                  },
                },
              },
            },
          },
        },
      });
      if (!cart) ctx.send({ data: [] });
      return ctx.send({
        data: cart.items,
      });
    } catch (error) {
      return ctx.badRequest(error);
    }
  },
};
