'use strict';

/**
 * Lesson.js controller
 *
 * @description: A set of functions called "actions" for managing `Lesson`.
 */

module.exports = {

  /**
   * Retrieve lesson records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.lesson.fetchAll(ctx.query);
  },

  /**
    * Count lesson records.
    *
    * @return {Number}
    */

  count: async (ctx) => {
    return strapi.services.lesson.count(ctx.query);
  },

  /**
   * Retrieve a lesson record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.lesson.fetch(ctx.params);
  },

  /**
   * Create a/an lesson record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.lesson.add(ctx.request.body);
  },

  /**
   * Update a/an lesson record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.lesson.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an lesson record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.lesson.remove(ctx.params);
  }
};
