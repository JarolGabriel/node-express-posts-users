const express = require("express");
const createError = require("http-errors");
const auth = require("../middleware/auth");
const postCase = require("../usecases/post.usecase");
const upload = require("../uploads/multerUpload");

const router = express.Router();

//Crear un Nuevo Post (POST /posts)

router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const postData = req.body;
    const userId = req.user._id;

    if (req.file) {
      postData.image = req.file.path; // Guardar la ruta del archivo en el objeto postData
    }

    const newPost = await postCase.create(postData, userId);

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: { newPost },
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

//Listar Todos los Posts (GET /posts)

router.get("/", async (req, res) => {
  try {
    const searchQuery = req.query.search;
    const post = await postCase.getAll(searchQuery);

    res.json({
      success: true,
      message: "All Post",
      data: { post },
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

// Obtener un Post por ID (GET /posts/:id)
router.get("/:id", async (req, res) => {
  try {
    const postId = req.params.id; // Obtén el ID del post desde los parámetros de la solicitud
    const post = await postCase.getById(postId); // Llama a la función adecuada en tu usecase

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.json({
      success: true,
      message: "Post retrieved successfully",
      data: { post },
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

//Actualizar un Post (PATCH /posts/

router.patch("/:id", auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const updateData = req.body;
    const userId = req.user._id;

    const updatePost = await postCase.updatePost(postId, updateData, userId);

    res.json({
      success: true,
      message: "All Post",
      data: { updatePost },
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

//Eliminar un Post (DELETE /posts/)

router.delete("/:id", auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id.toString();

    console.log("Deleting Post ID:", postId);
    console.log("Authenticated User ID:", userId);

    const result = await postCase.deletePost(userId, postId);

    res.json({
      success: true,
      message: result.message,
      data: { result },
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
