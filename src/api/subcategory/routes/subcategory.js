module.exports = {
  routes: [
    {
      method: "GET",
      path: "/api/category/:slug/subcategories",
      handler: "subcategory.getSubCategories",
    },
  ],
};
