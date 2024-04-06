'use strict';

/**
 * warn service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::warn.warn');
