/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists("users", (table) => {
    table.increments("user_id").primary().notNullable();
    table.string("username").unique().notNullable();
    table.string("password").notNullable();
    table.string("first_name");
    table.string("last_name");
    table.specificType("wishlist", "INT[]");
    table.specificType("cart", "INT[]");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
