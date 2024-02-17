'use strict';

/**
 * user-token-balance service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-token-balance.user-token-balance');
