"use strict";

const { default: createStrapi } = require("strapi");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    afterCreate: async (result, data) => {
      const cart = await strapi.models.cart
        .where("id", result.user.cart)
        .fetch();
      cart.set("items", []);
      cart.save();
    },
  },
};
