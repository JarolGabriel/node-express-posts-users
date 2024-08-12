const createError = require("http-errors");

const userCases = require("../usecases/user.usecase");

const jwt = require("../lib/jwt");

async function auth(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      throw createError(401, "Token is required in authorization header");
    }

    const payload = jwt.verify(token);

    const user = await userCases.getById(payload.id);

    req.user = user;

    next();
  } catch (error) {
    res.status(error.status || 401);
    res.json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = auth;
