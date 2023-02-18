const knex = require("../db/connection");

function list() {
  return knex("users").select("*");
}

function read(username) {
  return knex("users").select("*").where({ username }).first();
}

module.exports = {
  list,
  read,
};
