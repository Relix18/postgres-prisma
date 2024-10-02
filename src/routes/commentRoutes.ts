import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComment,
  getComments,
  updateComment,
} from "../Controller/commentController.js";

const router = Router();

router.get("/comment", getComments);
router.get("/comment/:id", getComment);
router.post("/comment", createComment);
router.put("/comment/:id", updateComment);
router.delete("/comment/:id", deleteComment);

export default router;
