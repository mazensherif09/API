module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom/homepage",
      handler: "custom.homePage",
    },
    {
      method: "GET",
      path: "/boundary",
      handler: "custom.boundary",
      config: {
        middlewares: ["api::home-page.warning"],
      },
    },
  ],
};
