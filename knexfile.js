require("dotenv").config();
const { DEV_DATABASE_URL } = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: DEV_DATABASE_URL,
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
