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

function readLoginCredentials(username) {
  return knex("users")
    .select(["username", "password"])
    .where({ username })
    .first();
}

function update(updatedUser) {
  return knex("users")
    .select("*")
    .where({ user_id: updatedUser.user_id })
    .update(updatedUser, "*");
}

function destroy(username) {
  return knex("users").where({ username }).del();
}

module.exports = {
  create,
  list,
  read,
  readLoginCredentials,
  update,
  delete: destroy,
};
