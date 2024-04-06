'use strict';

/**
 * warn router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::warn.warn');
