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
/*
server {
    listen 80; # Listen on port 80 (or your desired port)
    server_name 45.133.178.90; 

    location / {
        proxy_pass http://127.0.0.1:1337; 
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        try_files $uri $uri/ =404;
    }
}



*/