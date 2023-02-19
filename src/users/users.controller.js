const users_service = require("./users.service");

async function create(req, res, next) {
  try {
    const data = await users_service.create(req.body);
    res.status(201).json({ data });
  } catch (error) {
    next({
      status: 409,
      message: error.detail,
    });
  }
}

async function list(req, res, next) {
  try {
    const data = await users_service.list();
    res.json({ data });
  } catch (error) {
    next({
      status: 409,
      message: error.detail,
    });
  }
}

async function read(req, res, next) {
  const data = res.locals.user;
  try {
    res.json({ data });
  } catch (error) {
    next({
      status: 409,
      message: error.detail,
    });
  }
}

async function destroy(req, res, next) {
  const { user } = res.locals;
  try {
    await users_service.delete(user.username);
    res.sendStatus(204);
  } catch (error) {
    next({
      status: 409,
      message: error.detail,
    });
  }
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
  if (req.body.password.length < 8) {
    return next({
      status: 404,
      message: "Password must be atleast 8 characters",
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
  delete: [userExists, destroy],
};
