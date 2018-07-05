'use strict';

/**
 * Bookmark.js controller
 *
 * @description: A set of functions called "actions" for managing `Bookmark`.
 */

module.exports = {

  /**
   * Retrieve bookmark records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.bookmark.fetchAll(ctx.query);
  },

  /**
   * Retrieve a bookmark record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.bookmark.fetch(ctx.params);
  },

  /**
   * Create a/an bookmark record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.bookmark.add(ctx.request.body);
  },

  /**
   * Update a/an bookmark record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.bookmark.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an bookmark record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.bookmark.remove(ctx.params);
  }
};
