module.exports = ({ env }) => ({
  "strapi-plugin-populate-deep": {
    config: {
      defaultDepth: 10, // Default is 5
    },
  },
  email: {
    provider: "nodemailer",
    providerOptions: {
      auth: {
        user: "mohamedosama10085@gmail.com",
        pass: "qcnjyqmbxgqleiwk",
      },
    },
    settings: {
      defaultFrom: "your-email@gmail.com",
      defaultReplyTo: "your-email@gmail.com",
    },
  },
});
