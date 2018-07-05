'use strict';

/**
 * Userconfirmation.js controller
 *
 * @description: A set of functions called "actions" for managing `Userconfirmation`.
 */

module.exports = {

  /**
   * Retrieve userconfirmation records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.userconfirmation.fetchAll(ctx.query);
  },

  /**
   * Retrieve a userconfirmation record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.userconfirmation.fetch(ctx.params);
  },

  /**
   * Create a/an userconfirmation record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.userconfirmation.add(ctx.request.body);
  },

  /**
   * Update a/an userconfirmation record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.userconfirmation.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an userconfirmation record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.userconfirmation.remove(ctx.params);
  }
};
