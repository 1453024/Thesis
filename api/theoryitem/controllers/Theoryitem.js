'use strict';

/**
 * Theoryitem.js controller
 *
 * @description: A set of functions called "actions" for managing `Theoryitem`.
 */

module.exports = {

  /**
   * Retrieve theoryitem records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.theoryitem.fetchAll(ctx.query);
  },

  /**
   * Retrieve a theoryitem record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.theoryitem.fetch(ctx.params);
  },

  /**
   * Create a/an theoryitem record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.theoryitem.add(ctx.request.body);
  },

  /**
   * Update a/an theoryitem record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.theoryitem.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an theoryitem record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.theoryitem.remove(ctx.params);
  }
};
