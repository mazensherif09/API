module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom/homepage",
      handler: "custom.homePage",
      config: {
        middlewares: ["api::home-page.warning"],
      },
    },
    {
      method: "GET",
      path: "/boundary",
      handler: "custom.boundary",
    },
  ],
};
