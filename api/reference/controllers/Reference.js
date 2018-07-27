'use strict';

/**
 * Reference.js controller
 *
 * @description: A set of functions called "actions" for managing `Reference`.
 */

module.exports = {

  /**
   * Retrieve reference records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.reference.fetchAll(ctx.query);
  },

  /**
   * Retrieve a reference record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.reference.fetch(ctx.params);
  },

  /**
   * Create a/an reference record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.reference.add(ctx.request.body);
  },

  /**
   * Update a/an reference record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.reference.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an reference record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.reference.remove(ctx.params);
  }
};
