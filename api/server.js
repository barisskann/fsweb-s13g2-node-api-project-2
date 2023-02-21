// implement your server here
// require your posts router and connect it here
const express = require("express");
const post = require("./posts/posts-router");
const router = express.Router();
router.get("/api/posts", post.getPost);
router.get("/api/posts/:id", post.findPost);
router.post("/api/posts", post.addPost);
router.put("/api/posts/:id", post.changePost);
router.delete("/api/posts/:id", post.deletePost);
router.get("/api/posts/:id/comments", post.getComment);

module.exports = router;
