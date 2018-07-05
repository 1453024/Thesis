'use strict';

/**
 * Notification.js controller
 *
 * @description: A set of functions called "actions" for managing `Notification`.
 */

module.exports = {

  /**
   * Retrieve notification records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.notification.fetchAll(ctx.query);
  },

  /**
   * Retrieve a notification record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.notification.fetch(ctx.params);
  },

  /**
   * Create a/an notification record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.notification.add(ctx.request.body);
  },

  /**
   * Update a/an notification record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.notification.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an notification record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.notification.remove(ctx.params);
  }
};
