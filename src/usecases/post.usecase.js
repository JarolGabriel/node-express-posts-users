const createError = require("http-errors");

const Post = require("../models/post.model");

//Para crear un nuevo post, el post creado será asignado al usuario que llamó este endpoint

async function create(postData, userId) {
  postData.author = userId;
  const post = await Post.create(postData);
  return post;
}

//- Debe soportar el filtrado por titulo usando un query param llamado `search` No requiere autorización

async function getAll(searchQuery) {
  let query = {};

  if (searchQuery) {
    query.title = { $regex: searchQuery, $options: "i" };
  }

  const post = await Post.find(query);
  return post;
}

/**Para permitir actualizar un post

- No se debe permitir cambiar el usuario de un post

Requiere autorización */

async function updatePost(postId, updateData, userId) {
  const post = await Post.findById(postId);

  if (!post) {
    throw createError(404, "Post not found");
  }

  if (post.author.toString() !== userId.toString()) {
    throw createError(403, "Not authorization to update this post");
  }

  delete updateData.author;

  const updatePost = Post.findByIdAndUpdate(
    postId,
    { $set: updateData },
    { new: true }
  );

  return updatePost;
}

/**Para permitir borrar un post

- Solo el usuario dueño del post debe ser capaz de ejecutar esta acción

Requiere autorización */

async function deletePost(userId, postId) {
  console.log("Trying to find Post with ID:", postId);
  const post = await Post.findById(postId);
  console.log("post", post);

  if (!post) {
    throw createError(404, "Post not found");
  }

  if (post.author.toString() !== userId) {
    console.log("User not authorized to delete this post");
    throw createError(403, "Not authorization to delete this post");
  }

  await Post.findByIdAndDelete(postId);

  return { message: "Post deleted successfully" };
}

module.exports = {
  create,
  getAll,
  deletePost,
  updatePost,
};
