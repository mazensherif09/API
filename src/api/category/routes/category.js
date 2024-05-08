module.exports = {
  routes: [
    {
      method: "GET",
      path: "/categories",
      handler: "category.getCategories",
    },
  ],
};
