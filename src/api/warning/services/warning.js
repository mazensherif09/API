module.exports = {
  async hasWarnning() {
    const result = await strapi.entityService.findMany("api::warning.warning");

    return result.publishedAt ? result : false;
  },
};
