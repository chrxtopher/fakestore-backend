const users_service = require("./users.service");

async function list(req, res, next) {
  const data = await users_service.list();
  res.json({ data });
}

async function read(req, res, next) {
  const data = res.locals.user;
  res.json({ data });
}

async function create(req, res, next) {
  users_service
    .create(req.body)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
}

// MIDDLEWARE BELOW //

function validateUsername(req, res, next) {
  if (req.body.username.length < 4 || req.body.username.length > 20) {
    return next({
      status: 404,
      message: "Username must be between 4 - 20 characters",
    });
  } else if (req.body.username.indexOf(" ") >= 0) {
    return next({
      status: 404,
      message: "Username cannot contain spaces",
    });
  } else {
    return next();
  }
}

function validatePassword(req, res, next) {
  if (req.body.password.length < 4 || req.body.password.length > 20) {
    return next({
      status: 404,
      message: "Password must be between 4 - 20 characters",
    });
  } else if (req.body.password.indexOf(" ") >= 0) {
    return next({
      status: 404,
      message: "Password cannot contain spaces",
    });
  } else {
    return next();
  }
}

function validateFullName(req, res, next) {
  if (
    req.body.first_name.indexOf(" ") >= 0 ||
    req.body.last_name.indexOf(" ") >= 0
  ) {
    return next({
      status: 404,
      message: "First & last name cannot contain spaces.",
    });
  } else {
    return next();
  }
}

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
  create: [validateUsername, validatePassword, validateFullName, create],
  list,
  read: [userExists, read],
};
