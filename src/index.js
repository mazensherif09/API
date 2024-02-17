"use strict";
const uuid = require("uuid");
module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ["plugin::users-permissions.user"],
      //   async afterCreate(event) {
      //     await strapi.service('plugin::users-permissions.user').sendConfirmationEmail(
      //       event.result
      //     );
      //   },

      beforeCreate(event) {
        event.params.data.uuid = uuid.v4();
      },
    });
  },
};
