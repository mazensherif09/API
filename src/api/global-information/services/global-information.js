'use strict';

/**
 * global-information service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::global-information.global-information');
