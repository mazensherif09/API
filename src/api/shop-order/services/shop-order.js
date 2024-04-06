'use strict';

/**
 * shop-order service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::shop-order.shop-order');
