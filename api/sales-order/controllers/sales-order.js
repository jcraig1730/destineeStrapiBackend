"use strict";
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const calculateTotal = (items, shipping = 0) => {
  const subtotal = items.reduce((total, item) => {
    return total + item.quantity * item.item.price;
  }, 0);
  const tax = subtotal * 0.0825;
  return Number((tax + subtotal + shipping).toFixed(2)) * 100;
};

module.exports = {
  createPaymentIntent: async ({ request, response }) => {
    try {
      const { items, shipping, total } = request.body;
      const calculatedTotal = calculateTotal(items, shipping);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculatedTotal,
        currency: "usd",
      });
      response.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err) {
      console.log(err);
      response.send({ err: true });
    }
  },
};
