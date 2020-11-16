module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      try {
        const cartProto = await strapi.models.cart.forge({
          user: data.id,
        });
        const cart = await cartProto.save();
        const favoritesProto = await strapi.models.favorite.forge({
          user: data.id,
        });
        const favoritesList = await favoritesProto.save();

        data.cart = cart.id;
        data.favorites = favoritesList.id;
      } catch (err) {
        console.log(err);
      }
    },
    async afterDelete(result) {
      try {
        const cart = await strapi.models.cart
          .where("id", result.cart.id)
          .fetch();
        const favorites = await strapi.models.favorite
          .where("id", result.favorites.id)
          .fetch();
        if (cart) cart.destroy();
        if (favorites) favorites.destroy();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
