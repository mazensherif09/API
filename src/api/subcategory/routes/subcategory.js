module.exports = {
  routes: [
    {
      method: "GET",
      path: "/category/:slug/subcategories",
      handler: "subcategory.getSubCategories",
    },
  ],
};
