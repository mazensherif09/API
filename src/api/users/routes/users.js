module.exports = {
  routes: [
    {
      method: "POST",
      path: "/user/forget-password",
      handler: "users.forgetPassword",
    },
    {
      method: "PATCH",
      path: "/user/reset-password",
      handler: "users.resetPassword",
    },
  ],
};
