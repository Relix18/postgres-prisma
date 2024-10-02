import { Router } from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  searchPost,
  updatePost,
} from "../Controller/postController.js";

const router = Router();

router.get("/post", getPosts);
router.get("/post/search", searchPost);
router.get("/post/:id", getPost);
router.post("/post", createPost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

export default router;
