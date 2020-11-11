module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: "http://167.172.136.197.xip.io",
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "b970f073b950b708cd0a175eda0bf609"),
    },
  },
});
