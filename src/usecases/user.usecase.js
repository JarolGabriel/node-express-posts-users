const createError = require("http-errors");

const encryption = require("../lib/encryption");
const jwt = require("../lib/jwt");

const User = require("../models/user.model");

//Para otorgar un nuevo JWT cada que es llamado

async function login(userData) {
  const user = await User.findOne({ email: userData.email }).select(
    "+password"
  );

  if (!user) {
    throw createError(401, "invalid credential");
  }

  const isValidPassword = encryption.compare(userData.password, user.password);

  if (!isValidPassword) {
    throw createError(401, "invalid credential");
  }

  const token = jwt.sign({ id: user._id });

  return token;
}

// Función para registrar un nuevo usuario

async function signUp(userData) {
  const { name, email, password, profilePic } = userData;

  if (!name || !email || !password) {
    throw createError(400, "Name, email, and password are required");
  }

  const userFound = await User.findOne({ email: userData.email });

  if (userFound) {
    throw createError(400, "user already exists");
  }

  if (userData.password.length < 6) {
    throw createError(400, "password must be at least 6 character");
  }

  const passwordEncrypt = encryption.encrypt(userData.password);

  userData.password = passwordEncrypt;

  const newUser = await User.create(userData);

  return newUser;
}

//Para obtener la información de un usuario por id

async function getById(userId) {
  if (!userId) {
    throw createError("User ID is required");
  }
  const userDataId = await User.findById(userId);

  if (!userDataId) {
    throw createError(404, "User not found");
  }

  return userDataId;
}

module.exports = {
  login,
  signUp,
  getById,
};
