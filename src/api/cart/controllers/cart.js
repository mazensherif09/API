const product = require("../../product/routes/product");

module.exports = {
  addItemToCartAPI: async (ctx) => {
    try {
      const { user } = ctx.state;
      const { cart } = ctx.request.body; // [{ QTY: 1 ,product:1}]
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
      // step 2 : check if new item is already in cart or not and check QTY
      const Newproduct = await strapi.entityService.findOne(
        "api::product.product",
        cart.product
      );
      if (!Newproduct || Newproduct.stock < cart.qty) {
        return ctx.badRequest("Out of stock or not found");
      }

      const newItem = userCart.items.find((item) => {
        return item.product.id === cart.product;
      });
      if (newItem) {
        userCart.QTY += cart.qty;
      } else {
        userCart.items.push(cart);
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
                      fields: ["url"],
                    },
                  },
                },
              },
            },
          },
        }
      );
      return ctx.send({
        cart: newCart,
      });
    } catch (error) {
      return ctx.badRequest(error);
    }
  },
  removeItemFromCart: async (ctx) => {
    const { user } = ctx.state;
    const { product } = ctx.request.body;
    const userCart = await strapi.db.query("api::cart.cart").findOne({
      where: { user: user.id },
      populate: {
        items: {
          populate: {
            product: {
              fields: ["id"],
            },
          },
        },
      },
    });
    const item = userCart.items.find((item) => {
      return item.product.id === product;
    });

    userCart.items = userCart.items.filter((item) => {
      return item.product.id !== product;
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
                    fields: ["url"],
                  },
                },
              },
            },
          },
        },
      }
    );
    return ctx.send({
      cart: newCart,
    });
  },
  clearCart: async (ctx) => {
    const { user } = ctx.state;
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
    return ctx.send({
      cart: [],
    });
  },
  refetchMyCart: async (ctx) => {
    try {
      const { user } = ctx.state;
      const { items } = ctx.request.body;
      let cart = await strapi.db.query("api::cart.cart").findOne({
        where: { user: user.id },
        populate: {
          items: {
            populate: {
              product: {
                populate: {
                  images: {
                    fields: ["url"],
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
            user: user.id,
            items,
          },
          populate: {
            items: {
              populate: {
                product: {
                  populate: {
                    images: {
                      fields: ["url"],
                    },
                  },
                },
              },
            },
          },
        });
      } else {
        const newItems = cart.items.map((val) => {
          const item = items.find((val2) => val2.id === val.id);

          if (item) {
            return {
              ...val,
              QTY: item.QTY,
            };
          } else {
            return val;
          }
        });
        cart = await strapi.entityService.update("api::cart.cart", cart.id, {
          data: {
            items: newItems,
          },
          populate: {
            items: {
              populate: {
                product: {
                  populate: {
                    images: {
                      fields: ["url"],
                    },
                  },
                },
              },
            },
          },
        });
      }
      return ctx.send({
        cart,
      });
    } catch (error) {
      console.log("🚀 ~ getMyCart: ~ error:", error);
    }
  },
};
