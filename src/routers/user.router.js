const express = require("express");
const createError = require("http-errors");

const userCase = require("../usecases/user.usecase");

const router = express.Router();

// Ruta para registrar un nuevo usuario

router.post("/register", async (req, res) => {
  try {
    const userData = req.body;
    const user = await userCase.signUp(userData);

    res.json({
      success: true,
      message: "User registered",
      data: { user },
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

// Ruta para obtener un usuario por ID

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userCase.getById(id);

    if (!user) {
      throw createError(404, "user not found");
    }

    res.json({
      success: true,
      message: "User by id",
      data: { user },
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

// Ruta para login

router.post("/auth/login", async (req, res) => {
  try {
    const userData = req.body;
    const token = await userCase.login(userData);

    res.json({
      success: true,
      message: "User logged in",
      data: { token },
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
