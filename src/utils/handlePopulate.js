const cartPopulate = () => {
  return {
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
  };
};
module.exports = {
  cartPopulate,
};
