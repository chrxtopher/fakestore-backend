const users_service = require("./users.service");

async function list(req, res, next) {
  const data = await users_service.list();
  res.json({ data });
}

async function read(req, res, next) {
  const data = res.locals.user;
  res.json({ data });
}

// MIDDLEWARE BELOW //

async function userExists(req, res, next) {
  const username = req.params.username;
  const user = await users_service.read(username);

  if (user) {
    res.locals.user = user;
    return next();
  } else {
    return next({
      status: 404,
      message: "User does not exist.",
    });
  }
}

module.exports = {
  list,
  read: [userExists, read],
};
