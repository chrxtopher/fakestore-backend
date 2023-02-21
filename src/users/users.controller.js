const users_service = require("./users.service");

async function create(req, res, next) {
  try {
    const data = await users_service.create(req.body);
    res.status(201).json({ data });
  } catch (error) {
    if (error.detail.includes("already exists")) {
      next({
        status: 409,
        message: "That username is already taken",
      });
    } else {
      next({
        status: 409,
        message: error.detail,
      });
    }
  }
}

async function list(req, res, next) {
  try {
    const users = await users_service.list();
    res.json({ users });
  } catch (error) {
    next({
      status: 409,
      message: error.detail,
    });
  }
}

async function read(req, res, next) {
  const user = res.locals.user;
  try {
    res.json({ user });
  } catch (error) {
    next({
      status: 409,
      message: error.detail,
    });
  }
}

async function readLoginCredentials(req, res, next) {
  const credentials = {
    username: res.locals.user.username,
    password: res.locals.user.password,
  };
  try {
    res.json({ credentials });
  } catch (error) {
    next({
      status: 409,
      message: error.detail,
    });
  }
}

async function update(req, res, next) {
  const updatedUser = {
    ...req.body,
    user_id: res.locals.user.user_id,
  };

  try {
    const data = await users_service.update(updatedUser);
    res.json({ data });
  } catch (error) {
    if (error.detail.includes("already exists")) {
      next({
        status: 409,
        message: "That username is already taken",
      });
    } else {
      next({
        status: 409,
        message: error.detail,
      });
    }
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
  if (!req.body.username) {
    return next({
      status: 404,
      message: "Please enter a username",
    });
  } else if (req.body.username.length < 4 || req.body.username.length > 20) {
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
  if (!req.body.password) {
    return next({
      status: 404,
      message: "Please enter a password",
    });
  } else if (req.body.password.length < 8) {
    return next({
      status: 404,
      message: "Password must be at least 8 characters",
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
  if (!req.body.first_name) {
    return next({
      status: 404,
      message: "Please enter your first name",
    });
  } else if (
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
  readLoginCredentials: [userExists, readLoginCredentials],
  update: [
    userExists,
    validateUsername,
    validatePassword,
    validateFullName,
    update,
  ],
  delete: [userExists, destroy],
};
