module.exports = {
  routes: [
    {
      method: "GET",
      path: "/homepage",
      handler: "home-page.homePage",
    },
    {
      method: "GET",
      path: "/boundary",
      handler: "home-page.boundary",
      config: {
        middlewares: ["api::home-page.warning"],
      },
    },
  ],
};
