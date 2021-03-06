module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: process.env.STRAPI_URL || "http://localhost:1337",
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "b970f073b950b708cd0a175eda0bf609"),
    },
  },
});
