const handlePrice = (min = 0, max = 10000000000000) => {
  const minPrice = typeof +min === "number" ? +min : 0;
  const maxPrice = typeof +max === "number" ? +max : 10000000000000;
  if (minPrice > maxPrice) {
    return;
  }
  if (minPrice === maxPrice) {
    return {
      price: { $eq: minPrice },
    };
  }
  if (minPrice === 0 && maxPrice === 10000000000000) {
    return;
  }

  return {
    price: { $between: [minPrice, maxPrice] },
  };
};

module.exports = {
  handlePrice,
};
