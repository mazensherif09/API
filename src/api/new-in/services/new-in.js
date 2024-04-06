'use strict';

/**
 * new-in service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::new-in.new-in');
