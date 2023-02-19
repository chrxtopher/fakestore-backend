const knex = require("../db/connection");

function create(user) {
  return knex("users")
    .insert(user)
    .returning("*")
    .then((records) => records[0]);
}

function list() {
  return knex("users").select("*");
}

function read(username) {
  return knex("users").select("*").where({ username }).first();
}

function destroy(username) {
  return knex("users").where({ username }).del();
}

module.exports = {
  create,
  list,
  read,
  delete: destroy,
};
