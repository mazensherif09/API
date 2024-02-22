const { Createvalidation } = require("../../../services/validation/validation");
const { createFromVal } = require("./schema");

module.exports = {
  createForm: async (ctx) => {
    try {
      const { first_name, subject, last_name, email, mobile, message } =
        ctx.request.body;
      const { error } = await Createvalidation(createFromVal, ctx.request.body);
      if (error) {
        console.log("🚀 ~ createForm: ~ error:", error);
        return ctx.badRequest(error.details[0].message);
      }
      const data = { first_name, subject, last_name, email, mobile, message };
      await strapi.entityService.create(
        "api::contact-us-from.contact-us-from",
        {
          data: {
            ...data,
          },
        }
      );
      return ctx.send("Done");
    } catch (error) {
      return ctx.badRequest(error);
    }
  },
};
